<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UserController extends Controller
{
    public function store(Request $request)
    {
        try {
            Usuario::create([
                'correo' => $request->email,
                'contrasena' => Hash::make($request->password),
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

    public function update(Request $request)
    {
        $user = $request->user(); // solo puede editar su propia cuenta
        $user->nombre = $request->name;
        $user->correo = $request->email;
        $user->save();

        return response()->json(['message' => 'Updated', 'user' => $user], 200);
    }
    public function find(Request $request)
    {
        try {
            $search = $request->input('query');

            $user = is_numeric($search)
                ? Usuario::where('id_usuario', (int) $search)->first()
                : Usuario::where('correo', $search)->first();

            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            return response()->json($user, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}