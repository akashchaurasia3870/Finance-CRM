<?php

namespace App\Services;

use App\Repositories\TransactionRepository;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class TransactionService extends BaseService
{
    public function __construct(TransactionRepository $repository)
    {
        parent::__construct($repository);
    }

    public function getTransactionsByPortfolio($portfolioId)
    {
        return $this->repository->findByPortfolio($portfolioId);
    }

    public function createNewRecord(array $data): object
    {
        return DB::transaction(function () use ($data) {
            $data['created_by'] = auth()->id();
            $data['transaction_date'] = $data['transaction_date'] ?? now();
            
            // Calculate net amount
            $data['net_amount'] = $data['amount'] - ($data['fees'] ?? 0);
            
            // Create transaction
            $transaction = parent::createNewRecord($data);
            
            // Process transaction to update positions and portfolio
            $transaction->processTransaction();
            
            return $transaction;
        });
    }

    public function processStockTransaction($portfolioId, $productId, $type, $quantity, $price, $fees = 0)
    {
        $amount = $quantity * $price;
        
        return $this->createNewRecord([
            'portfolio_id' => $portfolioId,
            'product_id' => $productId,
            'transaction_type' => $type,
            'quantity' => $quantity,
            'price' => $price,
            'amount' => $amount,
            'fees' => $fees,
        ]);
    }

    public function processCashTransaction($portfolioId, $type, $amount)
    {
        return $this->createNewRecord([
            'portfolio_id' => $portfolioId,
            'transaction_type' => $type,
            'amount' => $amount,
        ]);
    }

    public function processMarginTransaction($portfolioId, $type, $amount)
    {
        return $this->createNewRecord([
            'portfolio_id' => $portfolioId,
            'transaction_type' => $type,
            'amount' => $amount,
        ]);
    }
}