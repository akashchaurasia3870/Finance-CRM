<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'portfolio_name',
        'portfolio_no',
        'account_id',
        'client_id',
        'total_value',
        'cash_balance',
        'margin_used',
        'status',
        'created_by',
    ];

    protected $casts = [
        'total_value' => 'decimal:2',
        'cash_balance' => 'decimal:2',
        'margin_used' => 'decimal:2',
    ];

    const PORTFOLIO_TYPES = [
        'cash_portfolio' => ['name' => 'Cash Portfolio', 'number' => '#1001'],
        'stock_portfolio' => ['name' => 'Stock Portfolio', 'number' => '#1002'],
        'bond_portfolio' => ['name' => 'Bond Portfolio', 'number' => '#1003'],
        'mutual_fund_portfolio' => ['name' => 'Mutual Fund Portfolio', 'number' => '#1004'],
        'etf_portfolio' => ['name' => 'ETF Portfolio', 'number' => '#1005'],
        'retirement_portfolio' => ['name' => 'Retirement Portfolio', 'number' => '#1006'],
        'margin_portfolio' => ['name' => 'Margin Portfolio', 'number' => '#1007'],
        'options_portfolio' => ['name' => 'Options Portfolio', 'number' => '#1008'],
        'forex_portfolio' => ['name' => 'Forex Portfolio', 'number' => '#1009'],
        'crypto_portfolio' => ['name' => 'Crypto Portfolio', 'number' => '#1010']
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($portfolio) {
            if (isset(self::PORTFOLIO_TYPES[$portfolio->portfolio_name])) {
                $portfolio->portfolio_no = self::PORTFOLIO_TYPES[$portfolio->portfolio_name]['number'];
            }
        });
    }

    public function account()
    {
        return $this->belongsTo(Accounts::class, 'account_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function securityPositions()
    {
        return $this->hasMany(Position::class, 'portfolio_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'portfolio_id');
    }

    // Calculate total portfolio value from positions
    public function calculateTotalValue()
    {
        return $this->securityPositions()->sum('market_value');
    }

    // Get cash position
    public function getCashPosition()
    {
        return $this->securityPositions()
            ->where('position_type', 'cash')
            ->first();
    }

    // Get margin position
    public function getMarginPosition()
    {
        return $this->securityPositions()
            ->where('position_type', 'margin')
            ->first();
    }

    // Get stock positions
    public function getStockPositions()
    {
        return $this->securityPositions()
            ->where('position_type', 'stock')
            ->with('product')
            ->get();
    }

    // Update portfolio totals from positions
    public function updateTotals()
    {
        $this->total_value = $this->calculateTotalValue();
        
        $cashPosition = $this->getCashPosition();
        $this->cash_balance = $cashPosition ? $cashPosition->quantity : 0;
        
        $marginPosition = $this->getMarginPosition();
        $this->margin_used = $marginPosition ? $marginPosition->quantity : 0;
        
        $this->save();
    }
}