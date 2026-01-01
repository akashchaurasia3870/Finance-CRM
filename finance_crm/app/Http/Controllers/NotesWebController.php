<?php

namespace App\Http\Controllers;

use App\Services\NotesService;
use App\Services\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotesWebController extends Controller
{
    protected $notesService;
    protected $clientService;

    public function __construct(NotesService $notesService, ClientService $clientService)
    {
        $this->notesService = $notesService;
        $this->clientService = $clientService;
    }

    public function index()
    {
        $notes = collect($this->notesService->getAllRecords())->map(function ($record) {
            $noteModel = $this->notesService->getRecordById($record['id']);
            $noteModel->load(['creator', 'client']);
            return $noteModel->toArray();
        });
        return Inertia::render('Modules/Notes/View', ['notes' => $notes]);
    }

    public function create()
    {
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Notes/New', ['clients' => $clients]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'category' => 'nullable|string|max:255',
                'client_id' => 'nullable|exists:clients,id',
            ]);

            $this->notesService->createNewRecord($request->all());
            return redirect('/notes')->with('success', 'Note created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create note: ' . $e->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $note = $this->notesService->getRecordById($id);
        $note->load(['creator', 'client']);
        return Inertia::render('Modules/Notes/Detail', ['note' => $note]);
    }

    public function edit($id)
    {
        $note = $this->notesService->getRecordById($id);
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Notes/Edit', ['note' => $note, 'clients' => $clients]);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'category' => 'nullable|string|max:255',
                'client_id' => 'nullable|exists:clients,id',
            ]);

            $this->notesService->updateRecord($id, $request->all());
            return redirect('/notes')->with('success', 'Note updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update note: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $this->notesService->deleteRecord($id);
            return redirect('/notes')->with('success', 'Note deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete note: ' . $e->getMessage()]);
        }
    }
}