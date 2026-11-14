<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

// Uso en rutas: ->middleware('rol:vendedor,validador')
class Rol
{
    public function handle(Request $request, Closure $next, string ...$roles)
    {
        if (!in_array($request->user()?->tipo_usuario, $roles, true)) {
            return response()->json(['error' => 'No tienes permiso para esto'], 403);
        }
        return $next($request);
    }
}
