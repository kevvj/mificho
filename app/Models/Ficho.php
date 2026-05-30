<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ficho extends Model
{
    protected $table = 'ficho';
    public $timestamps = false;
    protected $primaryKey = 'id_ficho';
    protected $fillable = ['precio', 'estado', 'fecha_creación'];

    
}
