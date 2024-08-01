<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AlbumController extends Controller
{
    //Index 
    public function index()
    {
        $albums = Http::get('http://localhost:1337/api/albums')->json();
        return response()->json($albums);
    }

    //Carregar album e suas musicas.
    public function show($id)
    {
        $album = Http::get("http://localhost:1337/api/albums/{$id}")->json();
        $tracks = Http::get("http://localhost:1337/api/tracks?filters[album][id][\$eq]={$id}")->json();
        return response()->json([
            'album' => $album,
            'tracks' => $tracks,
        ]);
    }

    //Pesquisar albuns e musicas por nome.
    public function search(Request $request)
    {
        $query = $request->query('q');

        $albums = Http::get("http://localhost:1337/api/albums?filters[title][\$containsi]={$query}")->json();
        $tracks = Http::get("http://localhost:1337/api/tracks?filters[title][\$containsi]={$query}")->json();

        return response()->json([
            'albums' => $albums,
            'tracks' => $tracks,
        ]);
    }
    //Adicionar album
    public function store(Request $request)
    {
        $album = Http::post('http://localhost:1337/api/albums', [
            'title' => $request->title,
            'artist' => $request->artist,
        ])->json();

        return response()->json($album);
    }
    
    //Adicionar musica em album
    public function addTrack(Request $request, $albumId)
    {
        $track = Http::post('http://localhost:1337/api/tracks', [
            'title' => $request->title,
            'duration' => $request->duration,
            'album' => $albumId,
        ])->json();

        return response()->json($track);
    }

    //Excluir Musica
    public function deleteTrack($trackId)
    {
        $response = Http::delete("http://localhost:1337/api/tracks/{$trackId}");
        return response()->json($response->json(), $response->status());
    }

    //Excluir Album
    public function destroy($id)
    {
        // Deleta as faixas do álbum primeiro
        $tracks = Http::get("http://localhost:1337/api/tracks?filters[album][id][\$eq]={$id}")->json();
        foreach ($tracks['data'] as $track) {
            Http::delete("http://localhost:1337/api/tracks/{$track['id']}");
        }

        // Deleta o álbum
        $response = Http::delete("http://localhost:1337/api/albums/{$id}");
        return response()->json($response->json(), $response->status());
    }

}


