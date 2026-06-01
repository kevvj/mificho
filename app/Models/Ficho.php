<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DetalleCompra;

class Ficho extends Model
{
    protected $table = 'ficho';
    public $timestamps = false;
    protected $primaryKey = 'id_ficho';
    protected $fillable = ['precio', 'estado', 'fecha_creacion'];

    public function detalleCompra()
    {
        return $this->hasOne(DetalleCompra::class, 'id_ficho');
    }
}
