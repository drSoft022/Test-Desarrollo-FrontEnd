<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->string("nombres");
            $table->string("Apellidos");
            $table->bigInteger("identificacion");
            $table->bigInteger("telefono");
            $table->unsignedBigInteger('id_ciudad');
            $table->unsignedBigInteger('id_departamento');

            $table->foreign('id_ciudad')->references('id')->on('ciudads')->onDelete('cascade');
            $table->foreign('id_departamento')->references('id')->on('departamentos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
