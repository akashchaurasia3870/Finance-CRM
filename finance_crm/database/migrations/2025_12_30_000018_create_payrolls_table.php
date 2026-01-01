<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /**
         * PAYROLL CYCLES
         */
        Schema::create('payroll_cycles', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->date('start_date');
            $table->date('end_date');
            $table->date('pay_date');
            $table->enum('status', ['open', 'processed', 'paid', 'locked'])->default('open');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('salary_structures', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->date('effective_from');
            $table->decimal('basic', 15, 2);
            $table->decimal('hra', 15, 2)->default(0);
            $table->decimal('allowances', 15, 2)->default(0);
            $table->decimal('gross_salary', 15, 2);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('user_id');
        });

        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('payroll_cycle_id');
            $table->string('pay_period');
            $table->date('period_start');
            $table->date('period_end');
            $table->date('pay_date');
            $table->decimal('gross_salary', 15, 2);
            $table->decimal('total_earnings', 15, 2)->default(0);
            $table->decimal('total_deductions', 15, 2)->default(0);
            $table->decimal('net_salary', 15, 2);
            $table->integer('working_days')->default(0);
            $table->integer('present_days')->default(0);
            $table->integer('leave_days')->default(0);
            $table->integer('lop_days')->default(0);
            $table->enum('status', ['generated', 'approved', 'paid', 'locked'])->default('generated');
            $table->timestamp('generated_at')->nullable();
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->unique(['user_id', 'pay_period']);
            $table->index('user_id');
            $table->index('payroll_cycle_id');
        });

        Schema::create('payroll_earnings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id');
            $table->string('type'); // basic, hra, bonus, overtime
            $table->decimal('amount', 15, 2);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('payroll_id');
        });

        Schema::create('payroll_deductions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id');
            $table->string('type'); // tax, pf, esi, loan
            $table->decimal('amount', 15, 2);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('payroll_id');
        });

        Schema::create('payroll_attendance_summary', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id');
            $table->integer('total_working_days');
            $table->integer('present_days');
            $table->integer('absent_days');
            $table->integer('leave_days');
            $table->integer('lop_days');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('payroll_id');
        });

        Schema::create('payroll_taxes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id');
            $table->string('tax_name');
            $table->decimal('amount', 15, 2);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('payroll_id');
        });

        Schema::create('employee_loans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');

            $table->decimal('total_amount', 15, 2);
            $table->decimal('monthly_deduction', 15, 2);
            $table->decimal('remaining_amount', 15, 2);

            $table->enum('status', ['active', 'closed'])->default('active');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
        });

        Schema::create('loan_deductions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id');
            $table->unsignedBigInteger('loan_id');
            $table->decimal('amount', 15, 2);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('payslips', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id');
            $table->string('payslip_number');
            $table->string('file_path')->nullable();
            $table->timestamp('generated_at');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->unique('payslip_number');
        });

        Schema::create('payroll_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id');
            $table->string('action'); // generated, approved, paid
            $table->unsignedBigInteger('performed_by');
            $table->timestamp('performed_at');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payroll_audit_logs');
        Schema::dropIfExists('payslips');
        Schema::dropIfExists('loan_deductions');
        Schema::dropIfExists('employee_loans');
        Schema::dropIfExists('payroll_taxes');
        Schema::dropIfExists('payroll_attendance_summary');
        Schema::dropIfExists('payroll_deductions');
        Schema::dropIfExists('payroll_earnings');
        Schema::dropIfExists('payrolls');
        Schema::dropIfExists('salary_structures');
        Schema::dropIfExists('payroll_cycles');
    }
};
