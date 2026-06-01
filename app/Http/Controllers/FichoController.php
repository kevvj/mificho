<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ficho;

class FichoController extends Controller
{
    public function invalidateOld()
    {
        try {
            $count = Ficho::where('estado', 'Disponible')
                ->whereDate('fecha_creacion', '<', now()->toDateString())
                ->update(['estado' => 'Vencido']);

            return response()->json(['message' => "Se invalidaron $count fichos"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $fichos = Ficho::orderBy('fecha_creacion', 'desc')->get();
            return response()->json($fichos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request)
    {
        try {
            $ticket = Ficho::where('id_ficho', $request->id)->first();
            if (!$ticket)
                return response()->json(['error' => 'Ficho no encontrado'], 404);
            $ticket->estado = $request->status;
            $ticket->save();
            return response()->json(['message' => 'Estado actualizado'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}