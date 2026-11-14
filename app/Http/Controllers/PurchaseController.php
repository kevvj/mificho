<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        try {
            // el estudiante solo compra para sí mismo; el vendedor puede venderle a otro
            $idUsuario = $request->user()->tipo_usuario === 'vendedor'
                ? $request->user_id
                : $request->user()->id_usuario;

            $yaCompro = Compra::where('id_usuario', $idUsuario)
                ->whereDate('fecha', now()->toDateString())
                ->exists();

            if ($yaCompro) {
                return response()->json(['error' => 'Ya compraste un ficho hoy'], 400);
            }

            Compra::create([
                'total' => $request->amount,
                'fecha' => $request->date,
                'id_usuario' => $idUsuario,
                'id_cafeteria' => $request->coffeeShopId,
            ]);

            return response()->json(['message' => 'Compra creada exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $users = Compra::all();
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function allPurchases()
    {
        try {
            $purchases = Compra::orderBy('fecha', 'desc')->get();
            return response()->json($purchases, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}