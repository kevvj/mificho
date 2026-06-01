<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ficho;
use App\Models\Validacion;

class ValidacionController extends Controller
{
    public function validate(Request $request)
    {
        try {
            $ticket = Ficho::where('id_ficho', $request->ticket_id)->first();

            if (!$ticket) {
                return response()->json(['error' => 'Ficho no encontrado'], 404);
            }

            if ($ticket->estado !== 'Disponible') {
                return response()->json(['error' => 'Ficho no válido'], 400);
            }

            if (!\Carbon\Carbon::parse($ticket->fecha_creacion)->isToday()) {
                return response()->json(['error' => 'Ficho vencido'], 400);
            }

            $ticket->estado = 'Usado';
            $ticket->save();

            Validacion::create([
                'fecha' => now()->toDateTimeString(),
                'id_ficho' => $ticket->id_ficho,
                'id_cafeteria' => $request->coffee_shop_id,
            ]);

            return response()->json(['message' => 'Ficho validado exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function recentValidations()
    {
        try {
            $validations = Validacion::with(['ficho', 'cafeteria'])
                ->orderBy('fecha', 'desc')
                ->take(5)
                ->get()
                ->map(function ($v) {
                    return [
                        'id_validacion' => $v->id_validacion,
                        'fecha' => $v->fecha,
                        'cafeteria' => $v->cafeteria->nombre ?? 'Desconocida',
                        'id_ficho' => $v->id_ficho,
                    ];
                });

            return response()->json($validations, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}