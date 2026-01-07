<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'portfolio_id',
        'position_id',
        'product_id',
        'transaction_type',
        'quantity',
        'price',
        'amount',
        'fees',
        'net_amount',
        'transaction_date',
        'status',
        'reference',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'quantity' => 'decimal:6',
        'price' => 'decimal:2',
        'amount' => 'decimal:2',
        'fees' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'transaction_date' => 'datetime',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class, 'portfolio_id');
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Process transaction and update positions
    public function processTransaction()
    {
        $portfolio = $this->portfolio;
        
        // Find or create position
        $position = $this->findOrCreatePosition();
        
        // Update position based on transaction
        $position->updateFromTransaction($this);
        
        // Update portfolio totals
        $portfolio->updateTotals();
        
        return $this;
    }

    private function findOrCreatePosition()
    {
        $positionType = $this->getPositionType();
        
        return Position::firstOrCreate(
            [
                'portfolio_id' => $this->portfolio_id,
                'product_id' => $this->product_id,
                'position_type' => $positionType,
            ],
            [
                'quantity' => 0,
                'avg_price' => 0,
                'market_value' => 0,
                'created_by' => $this->created_by,
            ]
        );
    }

    private function getPositionType()
    {
        return match($this->transaction_type) {
            'deposit', 'withdraw' => 'cash',
            'margin_use', 'margin_repay' => 'margin',
            'buy', 'sell', 'dividend' => 'stock',
            default => 'stock'
        };
    }
}