<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecuritySettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'two_factor_enabled',
        'login_attempt_limit',
        'ip_whitelist',
        'ip_blacklist',
        'session_timeout',
        'force_password_change',
        'password_policy',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'two_factor_enabled' => 'boolean',
            'force_password_change' => 'boolean',
            'ip_whitelist' => 'array',
            'ip_blacklist' => 'array',
            'password_policy' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}