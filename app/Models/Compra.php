<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DetalleCompra;
use App\Models\Cafeteria;


class Compra extends Model
{
    protected $table = 'compra';
    public $timestamps = false;
    protected $primaryKey = 'id_compra';
    protected $fillable = ['total', 'fecha', 'id_usuario', 'id_cafeteria'];

    public function detalleCompra()
    {
        return $this->hasMany(DetalleCompra::class, 'id_compra');
    }

    public function cafeteria()
{
    return $this->belongsTo(Cafeteria::class, 'id_cafeteria');
}
}