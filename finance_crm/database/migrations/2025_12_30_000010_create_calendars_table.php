<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calendars', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->enum('type', [
                'meeting',
                'event',
                'reminder',
                'task',
                'note'
            ])->default('event');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->string('location')->nullable();
            $table->string('meeting_link')->nullable();
            $table->boolean('is_all_day')->default(false);
            $table->enum('status', [
                'scheduled',
                'completed',
                'cancelled'
            ])->default('scheduled');
            $table->timestamps();
            $table->softDeletes();
            $table->index('start_datetime');
            $table->index('type');
            $table->index('created_by');
        });

        Schema::create('calendar_participants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('calendar_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('external_email')->nullable();
            $table->enum('role', [
                'owner',
                'editor',
                'viewer'
            ])->default('viewer');
            $table->enum('response', [
                'pending',
                'accepted',
                'declined'
            ])->default('pending');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('calendar_id');
            $table->index('user_id');
        });

        Schema::create('calendar_notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('calendar_id');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->text('note');
            $table->timestamps();
            $table->softDeletes();
            $table->index('calendar_id');
        });

        Schema::create('calendar_reminders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('calendar_id');
            $table->integer('remind_before');
            $table->enum('remind_via', [
                'email',
                'notification',
                'sms'
            ])->default('notification');
            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->softDeletes();
            $table->index('calendar_id');
        });

        Schema::create('calendar_attachments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('calendar_id');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('calendar_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calendar_attachments');
        Schema::dropIfExists('calendar_reminders');
        Schema::dropIfExists('calendar_notes');
        Schema::dropIfExists('calendar_participants');
        Schema::dropIfExists('calendars');
    }
};