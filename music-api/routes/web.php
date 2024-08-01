<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\AlbumController;


Route::get('albums', [AlbumController::class, 'index']);
Route::get('albums/{id}', [AlbumController::class, 'show']);
Route::get('search', [AlbumController::class, 'search']);
Route::post('albums', [AlbumController::class, 'store']);
Route::post('albums/{albumId}/tracks', [AlbumController::class, 'addTrack']);
Route::delete('tracks/{trackId}', [AlbumController::class, 'deleteTrack']);
Route::delete('albums/{id}', [AlbumController::class, 'destroy']);
