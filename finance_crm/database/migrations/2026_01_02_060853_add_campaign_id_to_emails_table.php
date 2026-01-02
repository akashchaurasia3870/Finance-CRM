<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedBigInteger('campaign_id')->nullable()->after('email_template_id');
            $table->foreign('campaign_id')->references('id')->on('campaigns')->onDelete('set null');
            $table->index('campaign_id');
        });
    }

    public function down(): void
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['campaign_id']);
            $table->dropIndex(['campaign_id']);
            $table->dropColumn('campaign_id');
        });
    }
};