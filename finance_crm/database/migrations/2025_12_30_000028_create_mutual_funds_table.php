<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mutual_funds', function (Blueprint $table) {
            $table->id();
            $table->string('fund_name');
            $table->string('fund_code')->unique();
            $table->decimal('nav', 15, 4);
            $table->decimal('units', 15, 4);
            $table->decimal('investment_amount', 15, 2);
            $table->enum('fund_type', ['equity', 'debt', 'hybrid'])->default('equity');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mutual_funds');
    }
};