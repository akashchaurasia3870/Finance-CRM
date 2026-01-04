<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeetingNote extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'meeting_id',
        'created_by',
        'notes',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meetings::class, 'meeting_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}