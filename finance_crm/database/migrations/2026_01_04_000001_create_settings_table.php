<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, json, boolean, integer
            $table->string('category'); // organization, security, notification, etc.
            $table->text('description')->nullable();
            $table->boolean('is_public')->default(false); // can be accessed by all users
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            
            $table->index(['category', 'key']);
        });

        // Organization/Company Settings
        Schema::create('organization_settings', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('company_logo')->nullable();
            $table->json('company_address')->nullable();
            $table->string('timezone')->default('UTC');
            $table->json('business_hours')->nullable(); // {monday: {start: '09:00', end: '17:00'}, ...}
            $table->json('holidays')->nullable(); // array of dates
            $table->date('fiscal_year_start');
            $table->json('working_days')->nullable(); // [1,2,3,4,5] for Mon-Fri
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Security Settings
        Schema::create('security_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('two_factor_enabled')->default(false);
            $table->integer('login_attempt_limit')->default(5);
            $table->json('ip_whitelist')->nullable();
            $table->json('ip_blacklist')->nullable();
            $table->integer('session_timeout')->default(120); // minutes
            $table->boolean('force_password_change')->default(false);
            $table->json('password_policy')->nullable(); // {min_length: 8, require_special: true, ...}
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Notification Settings
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('email_notifications')->default(true);
            $table->boolean('sms_notifications')->default(false);
            $table->boolean('push_notifications')->default(true);
            $table->json('notification_triggers')->nullable(); // events that trigger notifications
            $table->json('system_notification_rules')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // User Notification Preferences
        Schema::create('user_notification_preferences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('notification_type'); // email, sms, push
            $table->string('event_type'); // lead_created, task_assigned, etc.
            $table->boolean('enabled')->default(true);
            $table->timestamps();
            
            $table->unique(['user_id', 'notification_type', 'event_type'], 'user_notif_prefs_unique');
        });

        // Email Settings
        Schema::create('email_settings', function (Blueprint $table) {
            $table->id();
            $table->string('smtp_host');
            $table->integer('smtp_port')->default(587);
            $table->string('smtp_username');
            $table->string('smtp_password');
            $table->string('smtp_encryption')->default('tls');
            $table->string('from_email');
            $table->string('from_name');
            $table->string('reply_to_email')->nullable();
            $table->boolean('email_tracking')->default(false);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Integration Settings
        Schema::create('integration_settings', function (Blueprint $table) {
            $table->id();
            $table->string('integration_name');
            $table->boolean('enabled')->default(false);
            $table->json('api_keys')->nullable(); // encrypted
            $table->json('configuration')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Data Management Settings
        Schema::create('data_management_settings', function (Blueprint $table) {
            $table->id();
            $table->json('import_configuration')->nullable();
            $table->json('export_permissions')->nullable(); // role-based export permissions
            $table->integer('data_retention_days')->default(2555); // 7 years default
            $table->boolean('soft_delete_enabled')->default(true);
            $table->json('backup_configuration')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Audit Settings
        Schema::create('audit_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('activity_logging')->default(true);
            $table->integer('log_retention_days')->default(365);
            $table->json('tracked_actions')->nullable(); // which actions to track
            $table->boolean('export_logs_enabled')->default(false);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Localization Settings
        Schema::create('localization_settings', function (Blueprint $table) {
            $table->id();
            $table->string('default_language')->default('en');
            $table->string('currency')->default('USD');
            $table->string('number_format')->default('en_US');
            $table->string('date_format')->default('Y-m-d');
            $table->string('time_format')->default('H:i:s');
            $table->boolean('multi_language_enabled')->default(false);
            $table->json('available_languages')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Branding Settings
        Schema::create('branding_settings', function (Blueprint $table) {
            $table->id();
            $table->string('primary_color')->default('#3B82F6');
            $table->string('secondary_color')->default('#64748B');
            $table->string('accent_color')->default('#10B981');
            $table->string('font_family')->default('Inter');
            $table->string('font_size')->default('14px');
            $table->string('font_weight')->default('400');
            $table->string('login_background')->nullable();
            $table->json('dashboard_widgets')->nullable();
            $table->json('ui_features')->nullable(); // enabled/disabled features
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // System Behavior Settings
        Schema::create('system_behavior_settings', function (Blueprint $table) {
            $table->id();
            $table->string('default_landing_page')->default('/dashboard');
            $table->json('record_ownership_rules')->nullable();
            $table->json('auto_assignment_rules')->nullable();
            $table->json('duplicate_detection_rules')->nullable();
            $table->json('data_validation_rules')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Compliance Settings
        Schema::create('compliance_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('gdpr_enabled')->default(false);
            $table->boolean('consent_management')->default(false);
            $table->json('data_access_approvals')->nullable();
            $table->text('legal_disclaimer')->nullable();
            $table->json('privacy_settings')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('compliance_settings');
        Schema::dropIfExists('system_behavior_settings');
        Schema::dropIfExists('branding_settings');
        Schema::dropIfExists('localization_settings');
        Schema::dropIfExists('audit_settings');
        Schema::dropIfExists('data_management_settings');
        Schema::dropIfExists('integration_settings');
        Schema::dropIfExists('email_settings');
        Schema::dropIfExists('user_notification_preferences');
        Schema::dropIfExists('notification_settings');
        Schema::dropIfExists('security_settings');
        Schema::dropIfExists('organization_settings');
        Schema::dropIfExists('settings');
    }
};