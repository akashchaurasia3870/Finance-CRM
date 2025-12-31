<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();

            // Lead identity
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();

            // Assignment & ownership
            $table->unsignedBigInteger('assigned_to')->nullable(); // users.id
            $table->unsignedBigInteger('created_by')->nullable();  // users.id

            // Lead details
            $table->string('source')->nullable();   // website, referral, ads
            $table->string('campaign')->nullable();

            $table->enum('status', [
                'new',
                'contacted',
                'qualified',
                'converted',
                'lost'
            ])->default('new');

            $table->decimal('value', 15, 2)->nullable();
            $table->date('follow_up_date')->nullable();

            // Conversion tracking
            $table->timestamp('converted_at')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();

            // Indexes for performance
            $table->index('assigned_to');
            $table->index('status');
            $table->index('source');
            $table->index('follow_up_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
