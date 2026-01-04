<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            if (Schema::hasColumn('transactions', 'account_id')) {
                $table->dropColumn('account_id');
            }
            if (Schema::hasColumn('transactions', 'type')) {
                $table->dropColumn('type');
            }
            if (!Schema::hasColumn('transactions', 'transaction_type')) {
                $table->enum('transaction_type', ['buy', 'sell', 'deposit', 'withdraw', 'margin_use', 'margin_repay', 'dividend'])->after('product_id');
            }
            if (!Schema::hasColumn('transactions', 'fees')) {
                $table->decimal('fees', 15, 2)->after('amount')->default(0);
            }
            if (!Schema::hasColumn('transactions', 'net_amount')) {
                $table->decimal('net_amount', 15, 2)->after('fees');
            }
            if (!Schema::hasColumn('transactions', 'notes')) {
                $table->text('notes')->nullable()->after('reference');
            }
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['transaction_type', 'fees', 'net_amount', 'notes']);
        });
    }
};