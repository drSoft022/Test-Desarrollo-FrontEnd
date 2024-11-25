<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadoController;
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
});
