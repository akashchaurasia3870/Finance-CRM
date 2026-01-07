<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('security_positions')) {
            Schema::create('security_positions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('portfolio_id')->nullable();
                $table->unsignedBigInteger('product_id')->nullable();
                $table->enum('position_type', ['stock', 'cash', 'margin']);
                $table->decimal('quantity', 20, 6)->default(0);
                $table->decimal('avg_price', 15, 6)->default(0);
                $table->decimal('market_value', 15, 2)->default(0);
                $table->decimal('unrealized_pnl', 15, 2)->default(0);
                $table->timestamp('last_updated')->useCurrent();
                $table->unsignedBigInteger('created_by')->nullable();
                $table->timestamps();
                $table->softDeletes();
                
                $table->unique(['portfolio_id', 'product_id', 'position_type']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('security_positions');
    }
};