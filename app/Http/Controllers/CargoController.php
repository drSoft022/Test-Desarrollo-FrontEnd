<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rol;
use App\Models\Empleado;
use App\Models\Cargo;
use Inertia\Inertia;

class CargoController extends Controller
{
    public function index()
    {
        try{
            $cargos = Cargo::join('rols', 'cargos.rol', "=", 'rols.id')
                            ->join('empleados', 'cargos.empleado', "=", 'empleados.id')
                            ->select('cargos.*', 'empleados.nombres', 'empleados.Apellidos', 'rols.rol')
            ->paginate(7);

            $empleados = Empleado::all();
            $roles = Rol::all();

            return Inertia::render('Cargo', [
                $cargos,
                $empleados,
                $roles
            ]);
        }catch(\Exception $e){
            return Inertia::render('Cargo', [
                'error' => true
            ]);
        }
    }

    public function store(Request $request)
    {
        $cargos = Cargo::join('rols', 'cargos.rol', "=", 'rols.id')
        ->join('empleados', 'cargos.empleado', "=", 'empleados.id')
        ->select('cargos.*', 'empleados.nombres', 'empleados.Apellidos', 'rols.rol')
        ->paginate(7);

        $empleados = Empleado::all();
        $roles = Rol::all();

        try{
            $cargo = new Cargo();

            $request->validate([
            "empleado" => "required|string",
            "area" => "required|string|max:20",
            "cargo" => "required|string|max:20",
            "rol" => "required|string|min:1",
            "jefe" => "required|string|max:40",
            ]);

            $cargo->empleado = $request->input('empleado');
            $cargo->area = $request->input('area');
            $cargo->cargo = $request->input('cargo');
            $cargo->rol = $request->input('rol');
            $cargo->jefe = $request->input('jefe');

            $cargo->save();

            return Inertia::render('Cargo', [
                $cargos,
                $empleados,
                $roles
            ]);

        }catch(\Exception $e){
            return Inertia::render('DashContent');
        }
    }

    public function update(Request $request, string $id)
    {
        $cargos = Cargo::join('rols', 'cargos.rol', "=", 'rols.id')
        ->join('empleados', 'cargos.empleado', "=", 'empleados.id')
        ->select('cargos.*', 'empleados.nombres', 'empleados.Apellidos', 'rols.rol')
        ->paginate(7);

        $empleados = Empleado::all();
        $roles = Rol::all();

        try{
            $cargo = Cargo::findOrFail($id);

            $request->validate([
            "empleado" => "required|integer",
            "area" => "required|string|max:20",
            "cargo" => "required|string|max:20",
            "rol" => "required|integer|min:1",
            "jefe" => "required|string|max:40",
            ]);

            $cargo->update($request->all());

            return Inertia::render('Cargo', [
                $cargos,
                $empleados,
                $roles
            ]);

        }catch(\Exception $e){
            return Inertia::render('DashContent');
        }
    }

    public function destroy(string $id)
    {
        $cargos = Cargo::join('rols', 'cargos.rol', "=", 'rols.id')
        ->join('empleados', 'cargos.empleado', "=", 'empleados.id')
        ->select('cargos.*', 'empleados.nombres', 'empleados.Apellidos', 'rols.rol')
        ->paginate(7);

        $empleados = Empleado::all();
        $roles = Rol::all();

        try{
            $cargo = Cargo::findOrFail($id);

            $cargo->delete();

            return Inertia::render('Cargo', [
                $cargos,
                $empleados,
                $roles
            ]);

        }catch(\Exception $e){
            return Inertia::render('DashContent');
        }
    }

    public function exportToCSV()
    {
        $cargos = Cargo::all();
        
        $csvFileName = 'cargo.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$csvFileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['ID', 'Empleado', 'Area', 'Cargo', 'jefe', 'Fecha de creación'];

        $callback = function() use ($cargos, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($cargos as $car) {
                $row = [
                    $car->id,
                    $car->empleado,
                    $car->area,
                    $car->cargo,
                    $car->jefe,
                    $car->created_at,
                ];

                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
