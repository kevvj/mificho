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
    public function recentSales()
    {
        try {
            $sales = Compra::with(['usuario', 'cafeteria'])
                ->orderBy('fecha', 'desc')
                ->take(5)
                ->get()
                ->map(function ($compra) {
                    return [
                        'id_compra' => $compra->id_compra,
                        'nombre' => $compra->usuario->nombre,
                        'correo' => $compra->usuario->correo,
                        'cafeteria' => $compra->cafeteria->nombre,
                        'fecha' => $compra->fecha,
                        'total' => $compra->total,
                    ];
                });

            return response()->json($sales, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}