<?php

namespace App\Http\Controllers;

use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleWebController extends Controller
{
    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function index()
    {
        $roles = $this->roleService->getAllRecords();
        return Inertia::render('Modules/Role/View', ['roles' => $roles]);
    }

    public function create()
    {
        return Inertia::render('Modules/Role/New');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string',
            'permissions' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $this->roleService->createNewRecord($request->all());
        return redirect('/role')->with('success', 'Role created successfully');
    }

    public function show($id)
    {
        $role = $this->roleService->getRecordById($id);
        $role->load(['creator', 'users']);
        return Inertia::render('Modules/Role/Detail', ['role' => $role]);
    }

    public function edit($id)
    {
        $role = $this->roleService->getRecordById($id);
        return Inertia::render('Modules/Role/Edit', ['role' => $role]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'description' => 'nullable|string',
            'permissions' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $this->roleService->updateRecord($id, $request->all());
        return redirect('/role')->with('success', 'Role updated successfully');
    }

    public function destroy($id)
    {
        $this->roleService->deleteRecord($id);
        return redirect('/role')->with('success', 'Role deleted successfully');
    }
}