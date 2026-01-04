<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CalendarNote extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'calendar_id',
        'created_by',
        'note',
    ];

    public function calendar()
    {
        return $this->belongsTo(Calendar::class, 'calendar_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}