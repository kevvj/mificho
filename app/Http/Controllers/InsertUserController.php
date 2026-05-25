<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class InsertUserController extends Controller
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
}