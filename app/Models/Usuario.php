<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'usuario';
    public $timestamps = false;
    protected $primaryKey = 'id_usuario';
    protected $fillable = ['nombre', 'correo', 'tipo_usuario', 'contrasena'];
    protected $hidden = ['contrasena'];

    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    // vendedor y validador manejan el panel
    public function esPersonal(): bool
    {
        return in_array($this->tipo_usuario, ['vendedor', 'validador'], true);
    }
}
