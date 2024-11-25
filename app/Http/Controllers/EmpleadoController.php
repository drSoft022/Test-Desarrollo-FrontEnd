<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use App\Models\Ciudad;
use App\Models\Departamento;
use Inertia\Inertia;

class EmpleadoController extends Controller
{
    public function index()
    {
        try{
            $empleados = Empleado::join('ciudads', 'empleados.id_ciudad', "=", 'ciudads.id')
            ->join('departamentos', 'empleados.id_departamento', "=", 'departamentos.id')
            ->select('empleados.*', 'ciudads.ciudad', 'departamentos.departamento')
            ->paginate(7);

            $ciudades = Ciudad::all();
            $departamentos = Departamento::all();

            return Inertia::render('Empleado', [
                $empleados,
                $ciudades,
                $departamentos
            ]);
        }catch(\Exception $e){
            return Inertia::render('Empleado', [
                'error' => true
            ]);
        }
    }

    public function store(Request $request)
    {
        $empleados = Empleado::join('ciudads', 'empleados.id_ciudad', "=", 'ciudads.id')
                                ->join('departamentos', 'empleados.id_departamento', "=", 'departamentos.id')
                                ->select('empleados.*', 'ciudads.ciudad', 'departamentos.departamento')
                                ->paginate(7);
        $ciudades = Ciudad::all();
        $departamentos = Departamento::all();

        try{
            $empleado = new Empleado();

            $request->validate([
                "nombres" => "required|string|min:3|max:70",
                "Apellidos" => "required|string|min:3|max:70",
                "identificacion" => "required|string|min:10|max:10",
                "telefono" => "required|string|min:10|max:10",
                "id_ciudad" => "required|string|max:4",
                "id_departamento" => "required|string|max:4",
            ]);

            $empleado->nombres = $request->input('nombres');
            $empleado->Apellidos = $request->input('Apellidos');
            $empleado->identificacion = $request->input('identificacion');
            $empleado->telefono = $request->input('telefono');
            $empleado->id_ciudad = $request->input('id_ciudad');
            $empleado->id_departamento = $request->input('id_departamento');

            $empleado->save();

            return Inertia::render('Empleado', [
                $empleados,
                $ciudades,
                $departamentos
            ]);

        }catch(\Exception $e){
            return Inertia::render('DashContent');
        }
    }

    public function update(Request $request, string $id)
    {
        $empleados = Empleado::join('ciudads', 'empleados.id_ciudad', "=", 'ciudads.id')
                ->join('departamentos', 'empleados.id_departamento', "=", 'departamentos.id')
                ->select('empleados.*', 'ciudads.ciudad', 'departamentos.departamento')
                ->paginate(7);
        $ciudades = Ciudad::all();
        $departamentos = Departamento::all();
        try{
            $empleado = Empleado::findOrFail($id);

            $request->validate([
                "nombres" => "required|string|min:3|max:70",
                "Apellidos" => "required|string|min:3|max:70",
                "identificacion" => "required|integer|min:1|max:9999999999",
                "telefono" => "required|integer|min:1|max:9999999999",
                "id_ciudad" => "required|integer|max:999",
                "id_departamento" => "integer|integer|max:999",
            ]);

            $empleado->update($request->all());

            return Inertia::render('Empleado', [
                $empleados,
                $ciudades,
                $departamentos
            ]);
        }catch(\Exception $e){
            return Inertia::render('DashContent');
        }
    }

    public function destroy(string $id)
    {
        $empleados = Empleado::join('ciudads', 'empleados.id_ciudad', "=", 'ciudads.id')
                ->join('departamentos', 'empleados.id_departamento', "=", 'departamentos.id')
                ->select('empleados.*', 'ciudads.ciudad', 'departamentos.departamento')
                ->paginate(7);
        $ciudades = Ciudad::all();
        $departamentos = Departamento::all();
        try{
            $empleado = Empleado::findOrFail($id);

            $empleado->delete();

            return Inertia::render('Empleado', [
                $empleados,
                $ciudades,
                $departamentos
            ]);
        }catch(\Exception $e){
            dd($e);
        }
    }

    public function exportToCSV()
    {
        $empleados = Empleado::all();
        
        $csvFileName = 'empleados.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$csvFileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['ID', 'Nombre', 'Apellidos', 'Identificacion', 'Teléfono', 'Fecha de creación'];

        $callback = function() use ($empleados, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($empleados as $emp) {
                $row = [
                    $emp->id,
                    $emp->nombres,
                    $emp->Apellidos,
                    $emp->identificacion,
                    $emp->telefono,
                    $emp->created_at,
                ];

                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
