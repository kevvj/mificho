<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CoffeStoreController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);

Route::get('/coffeestores', [CoffeStoreController::class, 'index']);



Route::post('/login', [AuthController::class, 'login']);

Route::post('/insertUser', [UserController::class, 'store']);

Route::delete('/deleteUser', [UserController::class, 'destroy']);

Route::post('/insertCoff', [CoffeStoreController::class, 'store']);

Route::delete('/deleteCoff', [CoffeStoreController::class, 'destroy']);



