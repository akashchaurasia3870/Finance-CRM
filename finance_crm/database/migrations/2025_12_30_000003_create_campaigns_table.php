<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('budget', 15, 2)->default(0);
            $table->enum('type', [
                'email',
                'sms',
                'whatsapp',
                'manual'
            ])->default('email');
            $table->enum('status', [
                'draft',
                'scheduled',
                'active',
                'paused',
                'completed',
                'cancelled'
            ])->default('draft');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('status');
            $table->index('type');
        });

        Schema::create('campaign_targets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campaign_id');
            $table->string('email');
            $table->string('name')->nullable();
            $table->enum('status', [
                'pending',
                'sent',
                'opened',
                'clicked',
                'failed',
                'unsubscribed'
            ])->default('pending');
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('opened_at')->nullable();
            $table->timestamp('clicked_at')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('campaign_id');
            $table->index('email');
        });

        Schema::create('campaign_emails', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campaign_id');
            $table->string('subject');
            $table->longText('body');
            $table->unsignedBigInteger('template_id')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('campaign_id');
        });

        Schema::create('campaign_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campaign_id');
            $table->dateTime('scheduled_at');
            $table->boolean('is_recurring')->default(false);
            $table->string('recurring_rule')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('campaign_id');
        });

        Schema::create('campaign_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campaign_id');
            $table->string('action');
            $table->text('message')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('campaign_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaign_logs');
        Schema::dropIfExists('campaign_schedules');
        Schema::dropIfExists('campaign_emails');
        Schema::dropIfExists('campaign_targets');
        Schema::dropIfExists('campaigns');
    }
};