<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cafeteria;

class CoffeStoreController extends Controller
{
    public function store(Request $request)
    {
        try {
            Cafeteria::create([
                'nombre' => $request->name,
                'ubicacion' => $request->location,
            ]);

            return response()->json(['message' => 'Cafeteria creada'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        try {
            Cafeteria::where('id_cafeteria', $request->id)->delete();
            return response()->json(['message' => 'Eliminado'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $coffe = Cafeteria::all();
            return response()->json($coffe, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}