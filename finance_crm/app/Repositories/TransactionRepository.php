<?php

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository extends BaseRepository
{
    public function __construct(Transaction $model)
    {
        parent::__construct($model);
    }

    public function findByPortfolio($portfolioId)
    {
        return $this->model->where('portfolio_id', $portfolioId)
            ->with(['product', 'portfolio'])
            ->orderBy('transaction_date', 'desc')
            ->get();
    }

    public function findByProduct($productId)
    {
        return $this->model->where('product_id', $productId)
            ->with(['portfolio', 'product'])
            ->orderBy('transaction_date', 'desc')
            ->get();
    }

    public function findByStatus($status)
    {
        return $this->model->where('status', $status)
            ->with(['portfolio', 'product'])
            ->orderBy('transaction_date', 'desc')
            ->get();
    }

    public function findByType($type)
    {
        return $this->model->where('transaction_type', $type)
            ->with(['portfolio', 'product'])
            ->orderBy('transaction_date', 'desc')
            ->get();
    }

    public function findByDateRange($startDate, $endDate)
    {
        return $this->model->whereBetween('transaction_date', [$startDate, $endDate])
            ->with(['portfolio', 'product'])
            ->orderBy('transaction_date', 'desc')
            ->get();
    }

    public function getRecentTransactions($limit = 10)
    {
        return $this->model->with(['portfolio', 'product'])
            ->orderBy('transaction_date', 'desc')
            ->limit($limit)
            ->get();
    }
}