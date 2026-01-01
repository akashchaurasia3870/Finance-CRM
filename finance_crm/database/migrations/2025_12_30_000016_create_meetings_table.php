<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('location')->nullable();
            $table->string('meeting_link')->nullable();
            $table->unsignedBigInteger('organizer_id')->nullable();
            $table->enum('status', [
                'scheduled',
                'ongoing',
                'completed',
                'cancelled'
            ])->default('scheduled');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('organizer_id');
            $table->index('status');
            $table->index('start_time');
        });

        Schema::create('meeting_participants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('meeting_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('external_email')->nullable();
            $table->enum('response', [
                'pending',
                'accepted',
                'declined'
            ])->default('pending');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('meeting_id');
            $table->index('user_id');
        });

        Schema::create('meeting_notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('meeting_id');
            $table->unsignedBigInteger('created_by')->nullable(); 
            $table->text('notes');
            $table->timestamps();
            $table->softDeletes();
            $table->index('meeting_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meeting_notes');
        Schema::dropIfExists('meeting_participants');
        Schema::dropIfExists('meetings');
    }
};
