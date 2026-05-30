<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;

class HistoryController extends Controller
{
    public function index(Request $request)
{
    $history = Compra::with(['detalleCompra.ficho', 'cafeteria'])
        ->where('id_usuario', (int) $request->user_id)
        ->get();

    return response()->json($history, 200);
}
}