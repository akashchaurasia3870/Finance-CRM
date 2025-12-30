<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('margins', function (Blueprint $table) {
            $table->id();
            $table->string('account_number');
            $table->decimal('margin_limit', 15, 2);
            $table->decimal('used_margin', 15, 2)->default(0);
            $table->decimal('available_margin', 15, 2);
            $table->decimal('maintenance_margin', 15, 2);
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('margins');
    }
};