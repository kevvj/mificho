<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DetalleCompra;

class Compra extends Model
{
    protected $table = 'compra';
    public $timestamps = false;
    protected $primaryKey = 'id_compra';
    protected $fillable = ['total', 'fecha', 'id_usuario'];

    public function detalleCompra()
    {
        return $this->hasMany(DetalleCompra::class, 'id_compra');
    }
}