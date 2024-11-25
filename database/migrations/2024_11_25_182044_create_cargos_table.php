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
        Schema::create('cargos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("empleado");
            $table->string("area");
            $table->string("cargo");
            $table->unsignedBigInteger("rol");
            $table->string("jefe");
            $table->timestamps();

            $table->foreign('empleado')->references('id')->on('empleados')->onDelete('cascade');
            $table->foreign('rol')->references('id')->on('rols')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargos');
    }
};
