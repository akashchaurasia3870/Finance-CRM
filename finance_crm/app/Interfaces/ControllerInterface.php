<?php

namespace App\Interfaces;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

interface ControllerInterface
{
    public function index(): JsonResponse;

    public function show(int $id): JsonResponse;

    public function store(Request $request): JsonResponse;

    public function update(Request $request, int $id): JsonResponse;

    public function destroy(int $id): JsonResponse;
}