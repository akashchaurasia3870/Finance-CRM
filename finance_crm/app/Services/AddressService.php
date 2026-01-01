<?php

namespace App\Services;

use App\Repositories\AddressRepository;
use Illuminate\Support\Facades\Auth;

class AddressService extends BaseService
{
    public function __construct(AddressRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['country'] = $data['country'] ?? 'India';
        $data['type'] = $data['type'] ?? 'current';
        
        return $this->repository->add($data);
    }

    public function getAddressesByUser(int $userId)
    {
        return $this->repository->findByUserId($userId);
    }

    public function getAddressesByType(string $type)
    {
        return $this->repository->findByType($type);
    }
}