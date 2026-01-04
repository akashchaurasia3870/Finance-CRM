<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Accounts extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'account_no',
        'name',
        'email',
        'phone',
        'address',
        'balance',
        'status',
        'client_id',
        'created_by',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function portfolios()
    {
        return $this->hasMany(Portfolio::class, 'account_id');
    }

    public function transactions()
    {
        return $this->hasManyThrough(Transaction::class, Portfolio::class, 'account_id', 'portfolio_id');
    }
}