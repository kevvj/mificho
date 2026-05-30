<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('compra')) {
            Schema::create('compra', function (Blueprint $table) {
                $table->increments('id_compra');
                $table->decimal('total', 10, 0);
                $table->date('fecha');
                $table->unsignedInteger('id_usuario');
                $table->foreign('id_usuario')->references('id_usuario')->on('usuario');
                $table->unsignedInteger('id_cafeteria');
                $table->foreign('id_cafeteria')->references('id_cafeteria')->on('cafeteria');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('compra');
    }
};