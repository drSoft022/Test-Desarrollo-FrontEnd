<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $fillable = ['nombres','Apellidos','identificacion','telefono','id_ciudad','id_departamento'];
}
