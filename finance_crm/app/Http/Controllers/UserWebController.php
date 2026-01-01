<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserWebController extends Controller
{
    protected $userService;
    protected $roleService;

    public function __construct(UserService $userService, RoleService $roleService)
    {
        $this->userService = $userService;
        $this->roleService = $roleService;
    }

    public function index()
    {
        $users = collect($this->userService->getAllRecords())->map(function ($user) {
            $userModel = $this->userService->getRecordById($user['id']);
            $userModel->load('roles');
            return $userModel->toArray();
        });
        return Inertia::render('Modules/User/View', ['users' => $users]);
    }

    public function create()
    {
        $roles = $this->roleService->getActiveRoles();
        return Inertia::render('Modules/User/New', ['roles' => $roles]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'is_active' => 'boolean',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ]);

        $this->userService->createNewRecord($request->all());
        return redirect('/user')->with('success', 'User created successfully');
    }

    public function show($id)
    {
        $user = $this->userService->getRecordById($id);
        $user->load(['creator', 'roles', 'addresses']);
        return Inertia::render('Modules/User/Detail', ['user' => $user]);
    }

    public function edit($id)
    {
        $user = $this->userService->getRecordById($id);
        $user->load('roles');
        $roles = $this->roleService->getActiveRoles();
        return Inertia::render('Modules/User/Edit', ['user' => $user, 'roles' => $roles]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'is_active' => 'boolean',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ]);

        $this->userService->updateRecord($id, $request->all());
        return redirect('/user')->with('success', 'User updated successfully');
    }

    public function destroy($id)
    {
        $this->userService->deleteRecord($id);
        return redirect('/user')->with('success', 'User deleted successfully');
    }
}