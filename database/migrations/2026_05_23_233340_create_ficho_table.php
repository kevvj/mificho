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
        if (!Schema::hasTable('ficho')) {
            Schema::create('ficho', function (Blueprint $table) {
                $table->increments('id_ficho');
                $table->decimal('precio', 10, 0);
                $table->string('estado', 50);
                $table->dateTime('fecha_creacion');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ficho');
    }
};
