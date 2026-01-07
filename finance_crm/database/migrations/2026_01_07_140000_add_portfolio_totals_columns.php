<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            if (!Schema::hasColumn('portfolios', 'total_value')) {
                $table->decimal('total_value', 15, 2)->default(0)->after('status');
            }
            if (!Schema::hasColumn('portfolios', 'cash_balance')) {
                $table->decimal('cash_balance', 15, 2)->default(0)->after('total_value');
            }
            if (!Schema::hasColumn('portfolios', 'margin_used')) {
                $table->decimal('margin_used', 15, 2)->default(0)->after('cash_balance');
            }
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn(['total_value', 'cash_balance', 'margin_used']);
        });
    }
};