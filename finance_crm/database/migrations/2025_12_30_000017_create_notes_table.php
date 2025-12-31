<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();

            // Ownership
            $table->unsignedBigInteger('created_by')->nullable(); 
            $table->unsignedBigInteger('client_id')->nullable();

            // Note content
            $table->string('title');
            $table->text('content');

            // Classification
            $table->string('category')->nullable(); // personal, lead, complain, system

            $table->timestamps();

            // Indexes
            $table->index('created_by');
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
