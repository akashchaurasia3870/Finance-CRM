<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            // Drop unnecessary columns
            $table->dropColumn(['client_id', 'total_value', 'cash_balance', 'margin_used']);
            
            // Change portfolio_name to enum
            $table->dropColumn('portfolio_name');
            $table->enum('portfolio_name', [
                'cash_portfolio', 'stock_portfolio', 'bond_portfolio', 
                'mutual_fund_portfolio', 'etf_portfolio', 'retirement_portfolio',
                'margin_portfolio', 'options_portfolio', 'forex_portfolio', 'crypto_portfolio'
            ])->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            // Restore original structure
            $table->dropColumn('portfolio_name');
            $table->string('portfolio_name')->after('id');
            $table->unsignedBigInteger('client_id')->nullable()->after('account_id');
            $table->decimal('total_value', 20, 6)->default(0)->after('status');
            $table->decimal('cash_balance', 20, 6)->default(0)->after('total_value');
            $table->decimal('margin_used', 20, 6)->default(0)->after('cash_balance');
        });
    }
};