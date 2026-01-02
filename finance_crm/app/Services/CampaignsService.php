<?php

namespace App\Services;

use App\Repositories\CampaignsRepository;
use Illuminate\Support\Facades\Auth;

class CampaignsService extends BaseService
{
    public function __construct(CampaignsRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['status'] = $data['status'] ?? 'draft';
        $data['type'] = $data['type'] ?? 'email';
        $data['budget'] = $data['budget'] ?? 0;
        
        $clients = $data['clients'] ?? [];
        unset($data['clients']);
        
        $campaign = $this->repository->add($data);
        
        if (!empty($clients)) {
            $campaign->clients()->attach($clients);
        }
        
        return $campaign;
    }

    public function updateRecord(int $id, array $data): bool
    {
        $clients = $data['clients'] ?? [];
        unset($data['clients']);
        
        $updated = $this->repository->edit($id, $data);
        
        if ($updated) {
            $campaign = $this->repository->find($id);
            $campaign->clients()->sync($clients);
        }
        
        return (bool) $updated;
    }

    public function getCampaignsByStatus($status)
    {
        return $this->repository->findByStatus($status);
    }

    public function getCampaignsByType($type)
    {
        return $this->repository->findByType($type);
    }

    public function getActiveCampaigns()
    {
        return $this->repository->findActiveCampaigns();
    }

    public function getCampaignsByDateRange($startDate, $endDate)
    {
        return $this->repository->findByDateRange($startDate, $endDate);
    }
}