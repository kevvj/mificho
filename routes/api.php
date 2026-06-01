<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CoffeStoreController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\FichoController;


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

Route::post('/insertPay', [PurchaseController::class, 'store']);

Route::post('/history', [HistoryController::class, 'index']);

Route::post('/updateUser', [UserController::class, 'update']);

Route::post('/findUser', [UserController::class, 'find']);

Route::get('/recentSales', [HistoryController::class, 'recentSales']);

Route::get('/allSales', [HistoryController::class, 'allSales']);

Route::post('/invalidateOld', [FichoController::class, 'invalidateOld']);

Route::get('/fichos', [FichoController::class, 'index']);

Route::get('/allPurchases', [PurchaseController::class, 'allPurchases']);

Route::post('/updateTicket', [FichoController::class, 'updateStatus']);

