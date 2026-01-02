<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurveyAnswer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'response_id',
        'question_id',
        'answer',
        'created_by',
    ];

    public function response()
    {
        return $this->belongsTo(SurveyResponse::class, 'response_id');
    }

    public function question()
    {
        return $this->belongsTo(SurveyQuestion::class, 'question_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}