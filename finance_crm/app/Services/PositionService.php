<?php

namespace App\Services;

use App\Repositories\PositionRepository;
use App\Models\Position;

class PositionService extends BaseService
{
    public function __construct(PositionRepository $repository)
    {
        parent::__construct($repository);
    }

    public function getPositionsByPortfolio($portfolioId)
    {
        return $this->repository->findByPortfolio($portfolioId);
    }

    public function getPositionsByType($portfolioId, $type)
    {
        return $this->repository->findByPortfolioAndType($portfolioId, $type);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = auth()->id();
        $data['last_updated'] = now();
        return parent::createNewRecord($data);
    }

    public function getPortfolioSummary($portfolioId)
    {
        $positions = $this->getPositionsByPortfolio($portfolioId);
        
        $summary = [
            'cash' => 0,
            'stocks' => [],
            'margin' => 0,
            'total_value' => 0,
        ];
        
        foreach ($positions as $position) {
            switch ($position->position_type) {
                case 'cash':
                    $summary['cash'] = $position->quantity;
                    break;
                case 'margin':
                    $summary['margin'] = $position->quantity;
                    break;
                case 'stock':
                    $summary['stocks'][] = [
                        'product' => $position->product,
                        'quantity' => $position->quantity,
                        'avg_price' => $position->avg_price,
                        'market_value' => $position->market_value,
                    ];
                    break;
            }
            $summary['total_value'] += $position->market_value;
        }
        
        return $summary;
    }
}