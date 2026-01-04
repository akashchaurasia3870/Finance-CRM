<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payroll extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'payroll_cycle_id',
        'pay_period',
        'period_start',
        'period_end',
        'pay_date',
        'gross_salary',
        'total_earnings',
        'total_deductions',
        'net_salary',
        'working_days',
        'present_days',
        'leave_days',
        'lop_days',
        'status',
        'generated_at',
        'approved_by',
        'approved_at',
        'paid_at',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'period_start' => 'date',
            'period_end' => 'date',
            'pay_date' => 'date',
            'gross_salary' => 'decimal:2',
            'total_earnings' => 'decimal:2',
            'total_deductions' => 'decimal:2',
            'net_salary' => 'decimal:2',
            'generated_at' => 'datetime',
            'approved_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payrollCycle()
    {
        return $this->belongsTo(PayrollCycle::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function earnings()
    {
        return $this->hasMany(PayrollEarning::class);
    }

    public function deductions()
    {
        return $this->hasMany(PayrollDeduction::class);
    }

    public function payslip()
    {
        return $this->hasOne(Payslip::class);
    }
}