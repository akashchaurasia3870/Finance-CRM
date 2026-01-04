<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SecurityPosition extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'security_positions';

    protected $fillable = [
        'portfolio_id',
        'product_id',
        'quantity',
        'avg_price',
        'market_value',
        'last_updated',
        'created_by',
    ];

    protected $casts = [
        'quantity' => 'decimal:6',
        'avg_price' => 'decimal:6',
        'market_value' => 'decimal:6',
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
}