<?php

namespace App\Services;

use App\Repositories\TransactionRepository;
use App\Models\Transaction;
use App\Models\Position;
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
            $this->processTransactionFlow($transaction);
            
            return $transaction;
        });
    }

    private function processTransactionFlow(Transaction $transaction)
    {
        $portfolio = $transaction->portfolio;
        
        // Find or create position based on transaction type
        $position = $this->findOrCreatePositionForTransaction($transaction);
        
        // Update position based on transaction
        $this->updatePositionFromTransaction($position, $transaction);
        
        // Update portfolio totals
        $portfolio->updateTotals();
        
        return $transaction;
    }

    private function findOrCreatePositionForTransaction(Transaction $transaction)
    {
        $positionType = $this->getPositionTypeForTransaction($transaction);
        
        // If position_id is provided, use existing position
        if ($transaction->position_id) {
            return Position::find($transaction->position_id);
        }
        
        // Otherwise, find or create position
        return Position::firstOrCreate(
            [
                'portfolio_id' => $transaction->portfolio_id,
                'product_id' => $transaction->product_id,
                'position_type' => $positionType,
            ],
            [
                'quantity' => 0,
                'avg_price' => 0,
                'market_value' => 0,
                'created_by' => $transaction->created_by,
            ]
        );
    }

    private function getPositionTypeForTransaction(Transaction $transaction)
    {
        return match($transaction->transaction_type) {
            'deposit', 'withdraw' => 'cash',
            'margin_use', 'margin_repay' => 'margin',
            'buy', 'sell', 'dividend' => 'stock',
            default => 'stock'
        };
    }

    private function updatePositionFromTransaction(Position $position, Transaction $transaction)
    {
        switch ($transaction->transaction_type) {
            case 'buy':
                $this->processBuyTransaction($position, $transaction);
                break;
            case 'sell':
                $this->processSellTransaction($position, $transaction);
                break;
            case 'deposit':
                $this->processCashDeposit($position, $transaction);
                break;
            case 'withdraw':
                $this->processCashWithdrawal($position, $transaction);
                break;
            case 'margin_use':
                $this->processMarginUse($position, $transaction);
                break;
            case 'margin_repay':
                $this->processMarginRepay($position, $transaction);
                break;
            case 'dividend':
                $this->processDividend($position, $transaction);
                break;
        }
        
        $position->last_updated = now();
        $position->save();
    }

    private function processBuyTransaction(Position $position, Transaction $transaction)
    {
        if ($position->position_type === 'stock') {
            // Calculate new average price
            $totalCost = ($position->quantity * $position->avg_price) + ($transaction->quantity * $transaction->price);
            $position->quantity += $transaction->quantity;
            $position->avg_price = $position->quantity > 0 ? $totalCost / $position->quantity : 0;
            $position->market_value = $position->quantity * $position->avg_price;
        }
    }

    private function processSellTransaction(Position $position, Transaction $transaction)
    {
        if ($position->position_type === 'stock') {
            $position->quantity -= $transaction->quantity;
            if ($position->quantity <= 0) {
                $position->quantity = 0;
                $position->avg_price = 0;
                $position->market_value = 0;
            } else {
                $position->market_value = $position->quantity * $position->avg_price;
            }
        }
    }

    private function processCashDeposit(Position $position, Transaction $transaction)
    {
        if ($position->position_type === 'cash') {
            $position->quantity += $transaction->amount;
            $position->market_value = $position->quantity;
        }
    }

    private function processCashWithdrawal(Position $position, Transaction $transaction)
    {
        if ($position->position_type === 'cash') {
            $position->quantity -= $transaction->amount;
            $position->market_value = $position->quantity;
        }
    }

    private function processMarginUse(Position $position, Transaction $transaction)
    {
        if ($position->position_type === 'margin') {
            $position->quantity += $transaction->amount;
            $position->market_value = $position->quantity;
        }
    }

    private function processMarginRepay(Position $position, Transaction $transaction)
    {
        if ($position->position_type === 'margin') {
            $position->quantity -= $transaction->amount;
            $position->market_value = $position->quantity;
        }
    }

    private function processDividend(Position $position, Transaction $transaction)
    {
        // Dividend typically goes to cash position
        $cashPosition = Position::firstOrCreate(
            [
                'portfolio_id' => $transaction->portfolio_id,
                'product_id' => null,
                'position_type' => 'cash',
            ],
            [
                'quantity' => 0,
                'avg_price' => 1,
                'market_value' => 0,
                'created_by' => $transaction->created_by,
            ]
        );
        
        $cashPosition->quantity += $transaction->amount;
        $cashPosition->market_value = $cashPosition->quantity;
        $cashPosition->save();
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