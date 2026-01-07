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
        'account_type',
        'balance',
        'status',
        'client_id',
        'created_by',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    const ACCOUNT_TYPES = [
        'savings' => 'Savings Account',
        'checking' => 'Checking Account', 
        'investment' => 'Investment Account',
        'retirement' => 'Retirement Account',
        'trading' => 'Trading Account',
        'margin' => 'Margin Account',
        'cash' => 'Cash Account',
        'ira' => 'IRA Account',
        'roth_ira' => 'Roth IRA Account'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($account) {
            if (empty($account->account_no)) {
                $account->account_no = self::generateAccountNumber();
            }
        });
    }

    public static function generateAccountNumber()
    {
        do {
            $accountNo = str_pad(rand(100000000, 999999999), 9, '0', STR_PAD_LEFT);
        } while (self::where('account_no', $accountNo)->exists());
        
        return $accountNo;
    }

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