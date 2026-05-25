<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UserController extends Controller
{
    public function store(Request $request)
    {
        try {
            Usuario::create([
                'correo' => $request->email,
                'contrasena' => $request->password,
                'nombre' => $request->name,
                'tipo_usuario' => $request->type,
            ]);

            return response()->json(['message' => 'Usuario creado'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        try {
            Usuario::where('id_usuario', $request->id)->delete();
            return response()->json(['message' => 'Eliminado'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $users = Usuario::all();
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}