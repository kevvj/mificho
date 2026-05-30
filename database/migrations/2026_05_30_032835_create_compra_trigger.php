<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up()
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::unprepared("
                DROP TRIGGER IF EXISTS after_compra_insert ON compra;
                DROP FUNCTION IF EXISTS after_compra_insert();
            ");
            DB::unprepared("
                CREATE OR REPLACE FUNCTION after_compra_insert()
                RETURNS TRIGGER AS \$\$
                BEGIN
                    INSERT INTO ficho (precio, estado, fecha_creacion)
                    VALUES (NEW.total, 'Disponible', NOW());
                    
                    INSERT INTO detalle_compra (id_compra, id_ficho, cantidad)
                    VALUES (NEW.id_compra, currval(pg_get_serial_sequence('ficho', 'id_ficho')), 1);
                    
                    RETURN NEW;
                END;
                \$\$ LANGUAGE plpgsql;

                CREATE TRIGGER after_compra_insert
                AFTER INSERT ON compra
                FOR EACH ROW
                EXECUTE FUNCTION after_compra_insert();
            ");
        } else {
            DB::unprepared("DROP TRIGGER IF EXISTS after_compra_insert");
            DB::unprepared("
                CREATE TRIGGER after_compra_insert
                AFTER INSERT ON compra
                FOR EACH ROW
                BEGIN
                    INSERT INTO ficho (precio, estado, fecha_creacion)
                    VALUES (NEW.total, 'Disponible', NOW());
                    
                    INSERT INTO detalle_compra (id_compra, id_ficho, cantidad)
                    VALUES (NEW.id_compra, LAST_INSERT_ID(), 1);
                END
            ");
        }
    }

    public function down()
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::unprepared("
                DROP TRIGGER IF EXISTS after_compra_insert ON compra;
                DROP FUNCTION IF EXISTS after_compra_insert();
            ");
        } else {
            DB::unprepared("DROP TRIGGER IF EXISTS after_compra_insert");
        }
    }
};