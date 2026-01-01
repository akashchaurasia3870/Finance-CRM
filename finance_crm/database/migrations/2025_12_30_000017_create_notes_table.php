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
            $table->unsignedBigInteger('created_by')->nullable(); 
            $table->unsignedBigInteger('client_id')->nullable();
            $table->string('title');
            $table->text('content');
            $table->string('category')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('created_by');
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
