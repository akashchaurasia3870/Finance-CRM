<?php

namespace App\Services;

use App\Repositories\PortfolioRepository;
use App\Models\Portfolio;
use App\Models\Position;

class PortfolioService extends BaseService
{
    public function __construct(PortfolioRepository $repository)
    {
        parent::__construct($repository);
    }

    public function getActivePortfolios()
    {
        return $this->repository->findActivePortfolios();
    }

    public function getPortfoliosByClient($clientId)
    {
        return $this->repository->findByClient($clientId);
    }

    public function findById($id)
    {
        return $this->getRecordById($id);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = auth()->id();
        if (!isset($data['portfolio_no'])) {
            $data['portfolio_no'] = $this->generatePortfolioNumber();
        }
        
        $portfolio = parent::createNewRecord($data);
        
        // Create initial cash position
        $this->createInitialCashPosition($portfolio);
        
        return $portfolio;
    }

    public function getPortfolioSummary($portfolioId)
    {
        $portfolio = $this->findById($portfolioId);
        
        return [
            'portfolio' => $portfolio,
            'total_value' => $portfolio->total_value,
            'cash_balance' => $portfolio->cash_balance,
            'margin_used' => $portfolio->margin_used,
            'stock_positions' => $portfolio->getStockPositions(),
            'recent_transactions' => $portfolio->transactions()->latest()->limit(10)->get(),
        ];
    }

    private function createInitialCashPosition(Portfolio $portfolio)
    {
        Position::create([
            'portfolio_id' => $portfolio->id,
            'product_id' => null,
            'position_type' => 'cash',
            'quantity' => 0,
            'avg_price' => 1,
            'market_value' => 0,
            'created_by' => auth()->id(),
        ]);
    }

    private function generatePortfolioNumber()
    {
        return 'PF' . date('Y') . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
    }
}