<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\CargoController;
use Inertia\Inertia;

Route::get('/', function () {
    return view('auth/login');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', 
        function () { return Inertia::render('DashContent'); 
    })->name('dashboard');

    Route::get('/empleado', [
        EmpleadoController::class, 'index'
    ])->name('empleado');

    Route::post('/empleado', [
        EmpleadoController::class, 'store'
    ]);

    Route::get('/download', [
        EmpleadoController::class, 'exportToCSV'
    ]);

    Route::put('/empleado/{id}', [
        EmpleadoController::class, 'update'
    ]);

    Route::delete('/destroy/{id}',[
        EmpleadoController::class, 'destroy'
    ]);

    Route::get('/cargo', [
        CargoController::class, 'index'
    ])->name('cargo');

    Route::post('/cargo', [
        CargoController::class, 'store'
    ]);

    Route::put('/cargo/{id}', [
        CargoController::class, 'update'
    ]);

    Route::delete('/destroy/{id}',[
        CargoController::class, 'destroy'
    ]);

    Route::get('/download', [
        CargoController::class, 'exportToCSV'
    ]);
});
