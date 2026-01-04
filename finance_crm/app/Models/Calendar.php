<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Calendar extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'start_datetime',
        'end_datetime',
        'type',
        'created_by',
        'location',
        'meeting_link',
        'is_all_day',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'start_datetime' => 'datetime',
            'end_datetime' => 'datetime',
            'is_all_day' => 'boolean',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function participants()
    {
        return $this->hasMany(CalendarParticipant::class, 'calendar_id');
    }

    public function notes()
    {
        return $this->hasMany(CalendarNote::class, 'calendar_id');
    }

    public function reminders()
    {
        return $this->hasMany(CalendarReminder::class, 'calendar_id');
    }

    public function attachments()
    {
        return $this->hasMany(CalendarAttachment::class, 'calendar_id');
    }
}