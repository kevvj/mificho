<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $table = 'compra';
    public $timestamps = false;
    protected $primaryKey = 'id_compra';
    protected $fillable = ['total', 'fecha', 'id_usuario'];
}