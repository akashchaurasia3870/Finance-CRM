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

    public function getPositionsByProduct($productId)
    {
        return $this->repository->findByProduct($productId);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = auth()->id();
        $data['last_updated'] = now();
        return parent::createNewRecord($data);
    }

    public function updatePosition($portfolioId, $productId, $quantity, $price)
    {
        $position = $this->repository->findByPortfolioAndProduct($portfolioId, $productId);
        
        if ($position) {
            $newQuantity = $position->quantity + $quantity;
            $newAvgPrice = (($position->avg_price * $position->quantity) + ($price * $quantity)) / $newQuantity;
            
            return $this->updateRecord($position->id, [
                'quantity' => $newQuantity,
                'avg_price' => $newAvgPrice,
                'market_value' => $newQuantity * $price,
                'last_updated' => now(),
            ]);
        }
        
        return $this->createNewRecord([
            'portfolio_id' => $portfolioId,
            'product_id' => $productId,
            'quantity' => $quantity,
            'avg_price' => $price,
            'market_value' => $quantity * $price,
        ]);
    }
}