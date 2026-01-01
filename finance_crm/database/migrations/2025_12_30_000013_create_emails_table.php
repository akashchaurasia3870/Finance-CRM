<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->id();
            $table->string('to_email');
            $table->string('from_email')->nullable();
            $table->string('cc')->nullable();
            $table->string('bcc')->nullable();
            $table->string('subject');
            $table->longText('body');
            $table->unsignedBigInteger('email_template_id')->nullable();
            $table->enum('status', [
                'draft',
                'queued',
                'sent',
                'failed'
            ])->default('draft');
            $table->integer('retry_count')->default(0);
            $table->text('failure_reason')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('status');
            $table->index('email_template_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emails');
    }
};