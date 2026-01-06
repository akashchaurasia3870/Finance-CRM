<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends BaseController
{
    public function index()
    {
        return response()->json(['message' => 'Transaction API index']);
    }

    public function show($id)
    {
        return response()->json(['message' => 'Transaction API show', 'id' => $id]);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Transaction API store']);
    }

    public function update(Request $request, $id)
    {
        return response()->json(['message' => 'Transaction API update', 'id' => $id]);
    }

    public function destroy($id)
    {
        return response()->json(['message' => 'Transaction API destroy', 'id' => $id]);
    }
}