<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Ficho;
use App\Models\Cafeteria;

class Validacion extends Model
{
    protected $table = 'validacion';
    public $timestamps = false;
    protected $primaryKey = 'id_validacion';
    protected $fillable = ['fecha', 'id_ficho', 'id_cafeteria'];

    public function ficho()
    {
        return $this->belongsTo(Ficho::class, 'id_ficho');
    }

    public function cafeteria()
    {
        return $this->belongsTo(Cafeteria::class, 'id_cafeteria');
    }
}
