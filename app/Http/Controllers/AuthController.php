<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = Usuario::where('correo', $request->email)->first();

        if (!$user || !$this->claveCorrecta($user, (string) $request->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('web')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }

    // Acepta claves con hash. Si la cuenta aún tiene la clave en texto plano
    // (usuarios viejos), la acepta una vez y la guarda con hash.
    private function claveCorrecta(Usuario $user, string $clave): bool
    {
        $guardada = (string) $user->contrasena;

        if (Hash::isHashed($guardada)) {
            return Hash::check($clave, $guardada);
        }

        if (hash_equals($guardada, $clave)) {
            $user->contrasena = Hash::make($clave);
            $user->save();
            return true;
        }

        return false;
    }
}
