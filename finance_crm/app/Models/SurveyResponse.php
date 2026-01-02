<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurveyResponse extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'survey_id',
        'user_id',
        'session_id',
        'ip_address',
        'submitted_at',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'submitted_at' => 'datetime',
        ];
    }

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class, 'response_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}