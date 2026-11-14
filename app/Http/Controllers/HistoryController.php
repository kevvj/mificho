<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $history = Compra::with(['detalleCompra.ficho', 'cafeteria'])
            ->where('id_usuario', $request->user()->id_usuario) // solo su propio historial
            ->orderBy('fecha', 'desc')
            ->get();

        return response()->json($history, 200);
    }
    public function recentSales(Request $request)
    {
        try {
            $offset = $request->query('offset', 0);

            $sales = Compra::with(['usuario', 'cafeteria'])
                ->orderBy('fecha', 'desc')
                ->skip($offset)
                ->take(5)
                ->get()
                ->map(function ($compra) {
                    return [
                        'id_compra' => $compra->id_compra,
                        'nombre' => $compra->usuario->nombre ?? 'Desconocido',
                        'correo' => $compra->usuario->correo ?? '-',
                        'cafeteria' => $compra->cafeteria->nombre ?? 'Desconocida',
                        'fecha' => $compra->fecha,
                        'total' => $compra->total,
                    ];
                });

            return response()->json($sales, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function allSales(Request $request)
    {
        try {
            $offset = $request->query('offset', 0);

            $sales = Compra::with(['usuario', 'cafeteria'])
                ->orderBy('fecha', 'desc')
                ->skip($offset)
                ->take(10)
                ->get()
                ->map(function ($compra) {
                    return [
                        'id_compra' => $compra->id_compra,
                        'nombre' => $compra->usuario->nombre ?? 'Desconocido',
                        'correo' => $compra->usuario->correo ?? '-',
                        'cafeteria' => $compra->cafeteria->nombre ?? 'Desconocida',
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