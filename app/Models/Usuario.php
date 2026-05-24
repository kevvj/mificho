<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuario';
    protected $fillable = ['nombre', 'correo', 'tipo_usuario', 'contrasena'];
    protected $hidden = ['contrasena'];
}