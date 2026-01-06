<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Position extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'security_positions';

    protected $fillable = [
        'portfolio_id',
        'product_id',
        'position_type',
        'quantity',
        'avg_price',
        'market_value',
        'last_updated',
        'created_by',
    ];

    protected $casts = [
        'quantity' => 'decimal:6',
        'avg_price' => 'decimal:2',
        'market_value' => 'decimal:2',
        'last_updated' => 'datetime',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class, 'portfolio_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Update position based on transaction
    public function updateFromTransaction(Transaction $transaction)
    {
        switch ($transaction->transaction_type) {
            case 'buy':
                $this->addQuantity($transaction->quantity, $transaction->price);
                break;
            case 'sell':
                $this->reduceQuantity($transaction->quantity);
                break;
            case 'deposit':
                if ($this->position_type === 'cash') {
                    $this->quantity += $transaction->amount;
                }
                break;
            case 'withdraw':
                if ($this->position_type === 'cash') {
                    $this->quantity -= $transaction->amount;
                }
                break;
            case 'margin_use':
                if ($this->position_type === 'margin') {
                    $this->quantity += $transaction->amount;
                }
                break;
            case 'margin_repay':
                if ($this->position_type === 'margin') {
                    $this->quantity -= $transaction->amount;
                }
                break;
        }
        
        $this->calculateCurrentValue();
        $this->last_updated = now();
        $this->save();
    }

    private function addQuantity($quantity, $price)
    {
        $totalCost = ($this->quantity * $this->avg_price) + ($quantity * $price);
        $this->quantity += $quantity;
        $this->avg_price = $this->quantity > 0 ? $totalCost / $this->quantity : 0;
    }

    private function reduceQuantity($quantity)
    {
        $this->quantity -= $quantity;
        if ($this->quantity <= 0) {
            $this->quantity = 0;
            $this->avg_price = 0;
        }
    }

    private function calculateCurrentValue()
    {
        if ($this->position_type === 'stock') {
            // In real scenario, get current market price
            $this->market_value = $this->quantity * $this->avg_price;
        } else {
            $this->market_value = $this->quantity;
        }
    }
}