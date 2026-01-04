<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('branding_settings', function (Blueprint $table) {
            // Add user_id for per-user settings
            $table->unsignedBigInteger('user_id')->nullable()->after('id');
            
            // Add theme field
            $table->string('theme')->default('light')->after('accent_color');
            
            // Add new branding fields
            $table->string('background_color')->default('#FFFFFF')->after('theme');
            $table->string('text_color')->default('#111827')->after('background_color');
            $table->string('banner_template')->default('default')->after('login_background');
            $table->string('banner_background')->nullable()->after('banner_template');
            $table->text('banner_quote')->default('Welcome to Finance CRM - Your Success is Our Priority')->after('banner_background');
            $table->string('company_name')->default('Finance CRM')->after('banner_quote');
            $table->string('logo_url')->nullable()->after('company_name');
            $table->string('favicon_url')->nullable()->after('logo_url');
            
            // Add foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
            // Add unique constraint for user_id (one setting per user)
            $table->unique('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('branding_settings', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropUnique(['user_id']);
            $table->dropColumn([
                'user_id',
                'theme',
                'background_color', 
                'text_color',
                'banner_template',
                'banner_background',
                'banner_quote',
                'company_name',
                'logo_url',
                'favicon_url'
            ]);
        });
    }
};