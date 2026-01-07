<?php

namespace App\Services;

use App\Repositories\SecurityPositionRepository;

class SecurityPositionService extends BaseService
{
    public function __construct(SecurityPositionRepository $repository)
    {
        parent::__construct($repository);
    }

    public function getPositionsByPortfolio($portfolioId)
    {
        return $this->repository->findByPortfolio($portfolioId);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = auth()->id();
        $data['last_updated'] = now();
        $data['market_value'] = $data['quantity'] * ($data['avg_price'] ?? 1);
        return parent::createNewRecord($data);
    }

    public function updateRecord($id, array $data): bool
    {
        $data['last_updated'] = now();
        $data['market_value'] = $data['quantity'] * ($data['avg_price'] ?? 1);
        return parent::updateRecord($id, $data);
    }
}