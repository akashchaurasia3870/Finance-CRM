<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('forex', function (Blueprint $table) {
            $table->id();
            $table->string('currency_pair');
            $table->decimal('exchange_rate', 15, 6);
            $table->decimal('amount', 15, 2);
            $table->enum('transaction_type', ['buy', 'sell'])->default('buy');
            $table->timestamp('transaction_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('forex');
    }
};