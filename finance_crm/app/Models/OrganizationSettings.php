<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizationSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'company_logo',
        'company_address',
        'timezone',
        'business_hours',
        'holidays',
        'fiscal_year_start',
        'working_days',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'company_address' => 'array',
            'business_hours' => 'array',
            'holidays' => 'array',
            'working_days' => 'array',
            'fiscal_year_start' => 'date',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}