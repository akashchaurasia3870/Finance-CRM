<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Target extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'target_value',
        'achieved_value',
        'start_date',
        'end_date',
        'assigned_to',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'target_value' => 'decimal:2',
            'achieved_value' => 'decimal:2',
            'start_date' => 'date',
            'end_date' => 'date',
            'assigned_to' => 'integer',
            'created_by' => 'integer',
        ];
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getProgressPercentageAttribute()
    {
        if ($this->target_value == 0) return 0;
        return min(100, ($this->achieved_value / $this->target_value) * 100);
    }
}