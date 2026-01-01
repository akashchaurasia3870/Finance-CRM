<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('symbol')->nullable();
            $table->enum('product_type', [
                'stock', 'mutual_fund', 'etf', 'bond', 
                'derivative', 'margin', 'commodity', 'forex', 'crypto'
            ]);
            $table->text('description')->nullable();
            $table->string('sector')->nullable();
            $table->enum('risk_level', ['low','medium','high','very_high'])->default('medium');
            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('product_type');
            $table->index('symbol');
            $table->index('is_active');
        });

        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_no', 9)->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->decimal('balance', 15, 2)->default(0);
            $table->enum('status', ['active','inactive','blocked'])->default('active');
            $table->unsignedBigInteger('client_id')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('status');
        });

        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('portfolio_name');
            $table->integer('portfolio_no');
            $table->unsignedBigInteger('account_id')->nullable();
            $table->enum('status', ['active','inactive'])->default('active');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('account_id');
            $table->index('status');
        });

        Schema::create('security_positions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('portfolio_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->decimal('quantity', 20, 6)->default(0);
            $table->decimal('avg_price', 15, 6)->default(0);
            $table->decimal('market_value', 20, 6)->default(0);
            $table->timestamp('last_updated')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('portfolio_id');
            $table->index('product_id');
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('account_id')->nullable();
            $table->unsignedBigInteger('portfolio_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->enum('type', ['deposit','withdrawal','buy','sell','dividend','fee','transfer','debit','credit']);
            $table->decimal('quantity', 20, 6)->nullable();
            $table->decimal('price', 15, 6)->nullable();
            $table->decimal('amount', 20, 6);
            $table->timestamp('transaction_date')->nullable();
            $table->enum('status', ['pending','completed','failed'])->default('pending');
            $table->string('reference')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('account_id');
            $table->index('portfolio_id');
            $table->index('product_id');
            $table->index('transaction_date');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('security_positions');
        Schema::dropIfExists('portfolios');
        Schema::dropIfExists('accounts');
        Schema::dropIfExists('products');
    }
};
