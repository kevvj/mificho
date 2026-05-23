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
        if (!Schema::hasTable('validacion')) {
            Schema::create('validacion', function (Blueprint $table) {
                $table->increments('id_validacion');
                $table->date('fecha');
                $table->unsignedInteger('id_ficho');
                $table->foreign('id_ficho')->references('id_ficho')->on('ficho');
                $table->unsignedInteger('id_cafeteria');
                $table->foreign('id_cafeteria')->references('id_cafeteria')->on('cafeteria');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validacion');
    }
};
