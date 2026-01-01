<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tasks extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'assigned_to',
        'created_by',
        'entity_type',
        'entity_id',
        'start_date',
        'due_date',
        'completed_at',
        'priority',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'due_date' => 'date',
            'completed_at' => 'date',
            'assigned_to' => 'integer',
            'created_by' => 'integer',
            'entity_id' => 'integer',
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

    public function entity()
    {
        if ($this->entity_type && $this->entity_id) {
            return $this->morphTo('entity', 'entity_type', 'entity_id');
        }
        return null;
    }
}