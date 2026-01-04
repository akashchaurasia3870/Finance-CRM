<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            if (!Schema::hasColumn('portfolios', 'account_id')) {
                $table->unsignedBigInteger('account_id')->after('portfolio_no')->nullable();
            }
            if (!Schema::hasColumn('portfolios', 'client_id')) {
                $table->unsignedBigInteger('client_id')->after('account_id')->nullable();
            }
            if (!Schema::hasColumn('portfolios', 'total_value')) {
                $table->decimal('total_value', 15, 2)->after('client_id')->default(0);
            }
            if (!Schema::hasColumn('portfolios', 'cash_balance')) {
                $table->decimal('cash_balance', 15, 2)->after('total_value')->default(0);
            }
            if (!Schema::hasColumn('portfolios', 'margin_used')) {
                $table->decimal('margin_used', 15, 2)->after('cash_balance')->default(0);
            }
        });
        
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            if (Schema::hasColumn('portfolios', 'account_id')) {
                $table->dropColumn(['account_id', 'client_id', 'total_value', 'cash_balance', 'margin_used']);
            }
        });
    }
};