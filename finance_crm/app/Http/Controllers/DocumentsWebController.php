<?php

namespace App\Http\Controllers;

use App\Services\DocumentsService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentsWebController extends Controller
{
    protected $documentsService;
    protected $userService;

    public function __construct(DocumentsService $documentsService, UserService $userService)
    {
        $this->documentsService = $documentsService;
        $this->userService = $userService;
    }

    public function index()
    {
        $documents = collect($this->documentsService->getAllRecords())->map(function ($document) {
            $documentModel = $this->documentsService->getRecordById($document['id']);
            $documentModel->load(['creator', 'owner']);
            return $documentModel->toArray();
        });
        return Inertia::render('Modules/Documents/View', ['documents' => $documents]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Documents/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        try {
            // Log the request data for debugging
            \Log::info('Document upload request:', [
                'has_file' => $request->hasFile('file'),
                'all_data' => $request->all(),
                'files' => $request->allFiles()
            ]);

            $request->validate([
                'name' => 'required|string|max:255',
                'file' => 'required|file|max:10240', // 10MB max
                'owned_by' => 'nullable|exists:users,id',
                'description' => 'nullable|string',
                'is_active' => 'nullable|in:true,false,1,0',
            ]);

            $data = $request->except('file');
            
            // Convert is_active string to boolean
            if (isset($data['is_active'])) {
                $data['is_active'] = filter_var($data['is_active'], FILTER_VALIDATE_BOOLEAN);
            }
            
            $document = $this->documentsService->uploadDocument($request->file('file'), $data);
            \Log::info('Document uploaded successfully:', ['document_id' => $document->id]);
            
            return redirect('/documents')->with('success', 'Document uploaded successfully');
        } catch (\Exception $e) {
            \Log::error('Document upload failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->withErrors(['error' => 'Failed to upload document: ' . $e->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $document = $this->documentsService->getRecordById($id);
        $document->load(['creator', 'owner']);
        return Inertia::render('Modules/Documents/Detail', ['document' => $document]);
    }

    public function edit($id)
    {
        $document = $this->documentsService->getRecordById($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Documents/Edit', ['document' => $document, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        // Debug logging
        \Log::info('Document update request:', [
            'id' => $id,
            'all_data' => $request->all(),
            'has_file' => $request->hasFile('file'),
            'name_value' => $request->get('name'),
        ]);

        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'nullable|file|max:10240',
            'owned_by' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'is_active' => 'nullable|in:true,false,1,0',
        ]);

        $data = $request->only(['name', 'owned_by', 'description', 'is_active']);
        
        // Convert is_active to boolean
        if (isset($data['is_active'])) {
            $data['is_active'] = in_array($data['is_active'], ['1', 'true', true], true);
        }

        // If file is uploaded, replace the document
        if ($request->hasFile('file')) {
            $this->documentsService->replaceDocument($id, $request->file('file'), $data);
        } else {
            // Just update metadata
            $this->documentsService->updateRecord($id, $data);
        }
        
        return redirect('/documents')->with('success', 'Document updated successfully');
    }

    public function destroy($id)
    {
        $this->documentsService->deleteDocument($id);
        return redirect('/documents')->with('success', 'Document deleted successfully');
    }
}