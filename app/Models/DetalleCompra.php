<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Ficho;

class DetalleCompra extends Model
{
    protected $table = 'detalle_compra';
    public $timestamps = false;
    protected $primaryKey = 'id_detalle';
    protected $fillable = ['id_compra', 'id_ficho', 'cantidad'];

    public function ficho()
    {
        return $this->belongsTo(Ficho::class, 'id_ficho');
    }
}
