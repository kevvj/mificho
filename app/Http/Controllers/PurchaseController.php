<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        try {
            Compra::create([
                'total' => $request->amount,
                'fecha' => $request->date,
                'id_usuario' => $request->user_id,
            ]);

            return response()->json(['message' => 'Compra creada exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    //todavia no ojo ahi ignora todo esto de abajo

    public function destroy(Request $request)
    {
        try {
            Compra::where('id_usuario', $request->id)->delete();
            return response()->json(['message' => 'Eliminado'], 200);
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
}