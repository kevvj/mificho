<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cafeteria extends Model
{
    protected $table = 'cafeteria';
    public $timestamps = false;
    protected $primaryKey = 'id_cafeteria';
    protected $fillable = ['nombre', 'ubicacion'];
}