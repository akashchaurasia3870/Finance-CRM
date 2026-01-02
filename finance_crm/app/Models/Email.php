<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Email extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'to_email',
        'from_email',
        'cc',
        'bcc',
        'subject',
        'body',
        'email_template_id',
        'campaign_id',
        'status',
        'retry_count',
        'failure_reason',
        'created_by',
        'sent_at',
    ];

    protected function casts(): array
    {
        return [
            'sent_at' => 'datetime',
            'retry_count' => 'integer',
        ];
    }

    public function template()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id');
    }

    public function campaign()
    {
        return $this->belongsTo(Campaigns::class, 'campaign_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}