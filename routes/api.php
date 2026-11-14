<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CoffeStoreController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\FichoController;
use App\Http\Controllers\ValidacionController;

// Públicas
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::get('/coffeestores', [CoffeStoreController::class, 'index']);

// Con sesión (token de /login en el header Authorization: Bearer <token>)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', fn (Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cualquier usuario, sobre sus propios datos
    Route::post('/history', [HistoryController::class, 'index']);
    Route::post('/updateUser', [UserController::class, 'update']);
    Route::post('/insertPay', [PurchaseController::class, 'store'])->middleware('rol:estudiante,vendedor');

    // Vendedor
    Route::middleware('rol:vendedor')->group(function () {
        Route::post('/findUser', [UserController::class, 'find']);
        Route::get('/recentSales', [HistoryController::class, 'recentSales']);
        Route::get('/allSales', [HistoryController::class, 'allSales']);
    });

    // Validador
    Route::middleware('rol:validador')->group(function () {
        Route::post('/validateTicket', [ValidacionController::class, 'validate']);
        Route::get('/recentValidations', [ValidacionController::class, 'recentValidations']);
        Route::get('/allValidations', [ValidacionController::class, 'allValidations']);
    });

    // Panel (vendedor y validador)
    Route::middleware('rol:vendedor,validador')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/insertUser', [UserController::class, 'store']);
        Route::delete('/deleteUser', [UserController::class, 'destroy']);
        Route::post('/insertCoff', [CoffeStoreController::class, 'store']);
        Route::delete('/deleteCoff', [CoffeStoreController::class, 'destroy']);
        Route::get('/fichos', [FichoController::class, 'index']);
        Route::get('/allPurchases', [PurchaseController::class, 'allPurchases']);
        Route::post('/updateTicket', [FichoController::class, 'updateStatus']);
        Route::post('/invalidateOld', [FichoController::class, 'invalidateOld']);
    });
});
