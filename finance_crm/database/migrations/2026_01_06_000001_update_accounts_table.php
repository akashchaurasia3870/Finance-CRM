<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            // Drop email column
            $table->dropColumn('email');
            
            // Change name to account_type with enum values
            $table->dropColumn('name');
            $table->enum('account_type', [
                'savings', 'checking', 'investment', 'retirement', 
                'trading', 'margin', 'cash', 'ira', 'roth_ira'
            ])->default('savings')->after('account_no');
        });
    }

    public function down(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            // Restore email column
            $table->string('email')->unique()->after('account_no');
            
            // Change account_type back to name
            $table->dropColumn('account_type');
            $table->string('name')->after('account_no');
        });
    }
};