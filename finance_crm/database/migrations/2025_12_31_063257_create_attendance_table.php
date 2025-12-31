<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->date('attendance_date');

            $table->time('check_in_time')->nullable();
            $table->time('check_out_time')->nullable();
            $table->decimal('work_hours', 5, 2)->nullable();

            $table->enum('status', [
                'present',
                'absent',
                'half_day',
                'leave'
            ])->default('absent');

            $table->enum('source', [
                'biometric',
                'manual',
                'mobile',
                'system'
            ])->default('system');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['user_id', 'attendance_date']);
            $table->index(['user_id']);
            $table->index('attendance_date');
        });

        Schema::create('leaves', function (Blueprint $table) {
            $table->id()->primary();

            $table->id('user_id');
            $table->date('leave_date_from');
            $table->date('leave_date_to');

            $table->enum('leave_type', [
                'sick',
                'casual',
                'paid',
                'unpaid'
            ]);

            $table->enum('status', [
                'pending',
                'approved',
                'rejected'
            ])->default('pending');

            $table->text('reason')->nullable();
            $table->id('approved_by');
            $table->id('rejected_by');
            $table->text('rejection_reason')->nullable();
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index(['user_id']);
            $table->index('leave_date');
        });

        
        Schema::create('holidays', function (Blueprint $table) {
            $table->id()->primary();

            $table->date('holiday_date');
            $table->string('name');

            $table->timestamps();
            $table->unique('holiday_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('holidays');
        Schema::dropIfExists('leaves');
        Schema::dropIfExists('attendance');
    }
};
