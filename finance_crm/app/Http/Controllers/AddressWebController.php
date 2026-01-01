<?php

namespace App\Http\Controllers;

use App\Services\AddressService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressWebController extends Controller
{
    protected $addressService;
    protected $userService;

    public function __construct(AddressService $addressService, UserService $userService)
    {
        $this->addressService = $addressService;
        $this->userService = $userService;
    }

    public function index()
    {
        $addresses = collect($this->addressService->getAllRecords())->map(function ($address) {
            $addressModel = $this->addressService->getRecordById($address['id']);
            $addressModel->load(['user', 'creator']);
            return $addressModel->toArray();
        });
        return Inertia::render('Modules/Address/View', ['addresses' => $addresses]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Address/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'type' => 'required|string|in:current,permanent,office,billing,shipping',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
        ]);

        $this->addressService->createNewRecord($request->all());
        return redirect('/address')->with('success', 'Address created successfully');
    }

    public function show($id)
    {
        $address = $this->addressService->getRecordById($id);
        $address->load(['user', 'creator']);
        return Inertia::render('Modules/Address/Detail', ['address' => $address]);
    }

    public function edit($id)
    {
        $address = $this->addressService->getRecordById($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Address/Edit', ['address' => $address, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'type' => 'required|string|in:current,permanent,office,billing,shipping',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
        ]);

        $this->addressService->updateRecord($id, $request->all());
        return redirect('/address')->with('success', 'Address updated successfully');
    }

    public function destroy($id)
    {
        $this->addressService->deleteRecord($id);
        return redirect('/address')->with('success', 'Address deleted successfully');
    }
}