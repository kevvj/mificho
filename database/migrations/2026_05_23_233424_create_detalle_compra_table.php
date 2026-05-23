<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('detalle_compra')) {
            Schema::create('detalle_compra', function (Blueprint $table) {
                $table->increments('id_detalle');
                $table->unsignedInteger('id_compra');
                $table->foreign('id_compra')->references('id_compra')->on('compra');
                $table->unsignedInteger('id_ficho');
                $table->foreign('id_ficho')->references('id_ficho')->on('ficho');
                $table->decimal('cantidad', 10, 0);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_compra');
    }
};
