<?php

namespace App\Http\Controllers;

use App\Interfaces\ControllerInterface;
use App\Interfaces\ServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller implements ControllerInterface
{
    protected $service;

    // Inject the Service Interface
    public function __construct(ServiceInterface $service)
    {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        $data = $this->service->getAllRecords();
        return response()->json($data);
    }

    public function show(int $id): JsonResponse
    {
        $record = $this->service->getRecordById($id);
        return $record ? response()->json($record) : response()->json(['error' => 'Not Found'], 404);
    }

    public function store(Request $request): JsonResponse
    {
        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->service->deleteRecord($id);
        return response()->json(['success' => $deleted]);
    }
}