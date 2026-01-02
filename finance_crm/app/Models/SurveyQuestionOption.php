<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurveyQuestionOption extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'question_id',
        'option_text',
        'sort_order',
        'created_by',
    ];

    public function question()
    {
        return $this->belongsTo(SurveyQuestion::class, 'question_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}