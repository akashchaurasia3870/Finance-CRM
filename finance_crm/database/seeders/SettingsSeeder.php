<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Settings;
use App\Models\OrganizationSettings;
use App\Models\SecuritySettings;
use App\Models\NotificationSettings;
use App\Models\EmailSettings;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        // Default Organization Settings
        OrganizationSettings::updateOrCreate(
            ['id' => 1],
            [
                'company_name' => 'Finance CRM',
                'timezone' => 'UTC',
                'fiscal_year_start' => '2024-01-01',
                'business_hours' => [
                    'monday' => ['start' => '09:00', 'end' => '17:00'],
                    'tuesday' => ['start' => '09:00', 'end' => '17:00'],
                    'wednesday' => ['start' => '09:00', 'end' => '17:00'],
                    'thursday' => ['start' => '09:00', 'end' => '17:00'],
                    'friday' => ['start' => '09:00', 'end' => '17:00'],
                    'saturday' => ['start' => '10:00', 'end' => '14:00'],
                    'sunday' => ['closed' => true]
                ],
                'working_days' => [1, 2, 3, 4, 5], // Monday to Friday
                'holidays' => [],
            ]
        );

        // Default Security Settings
        SecuritySettings::updateOrCreate(
            ['id' => 1],[
            'two_factor_enabled' => false,
            'login_attempt_limit' => 5,
            'session_timeout' => 120, // 2 hours
            'force_password_change' => false,
            'password_policy' => [
                'min_length' => 8,
                'require_uppercase' => true,
                'require_lowercase' => true,
                'require_numbers' => true,
                'require_special' => true,
                'expiry_days' => 90
            ],
            'ip_whitelist' => [],
            'ip_blacklist' => [],
        );

        // Default Notification Settings
        NotificationSettings::updateOrCreate(
            ['id' => 1],[
            'email_notifications' => true,
            'sms_notifications' => false,
            'push_notifications' => true,
            'notification_triggers' => [
                'lead_created' => true,
                'lead_updated' => true,
                'task_assigned' => true,
                'task_completed' => true,
                'meeting_scheduled' => true,
                'campaign_launched' => true,
                'user_login' => false,
                'password_changed' => true
            ],
            'system_notification_rules' => [
                'send_daily_summary' => true,
                'send_weekly_reports' => true,
                'send_overdue_reminders' => true
            ]
        );

        // Default Email Settings (placeholder - should be configured by admin)
        EmailSettings::updateOrCreate(
            ['id' => 1],[
            'smtp_host' => 'smtp.gmail.com',
            'smtp_port' => 587,
            'smtp_username' => 'your-email@gmail.com',
            'smtp_password' => 'your-app-password',
            'smtp_encryption' => 'tls',
            'from_email' => 'noreply@financecrm.com',
            'from_name' => 'Finance CRM',
            'reply_to_email' => 'support@financecrm.com',
            'email_tracking' => false,
        ]);

        // General Settings
        $generalSettings = [
            ['key' => 'app_name', 'value' => 'Finance CRM', 'type' => 'string', 'category' => 'general', 'is_public' => true],
            ['key' => 'app_version', 'value' => '1.0.0', 'type' => 'string', 'category' => 'general', 'is_public' => true],
            ['key' => 'maintenance_mode', 'value' => false, 'type' => 'boolean', 'category' => 'general'],
            ['key' => 'registration_enabled', 'value' => false, 'type' => 'boolean', 'category' => 'general'],
        ];

        // Localization Settings
        $localizationSettings = [
            ['key' => 'localization_default_language', 'value' => 'en', 'type' => 'string', 'category' => 'localization', 'is_public' => true],
            ['key' => 'localization_currency', 'value' => 'USD', 'type' => 'string', 'category' => 'localization', 'is_public' => true],
            ['key' => 'localization_date_format', 'value' => 'Y-m-d', 'type' => 'string', 'category' => 'localization', 'is_public' => true],
            ['key' => 'localization_time_format', 'value' => 'H:i:s', 'type' => 'string', 'category' => 'localization', 'is_public' => true],
            ['key' => 'localization_number_format', 'value' => 'en_US', 'type' => 'string', 'category' => 'localization', 'is_public' => true],
            ['key' => 'localization_multi_language_enabled', 'value' => false, 'type' => 'boolean', 'category' => 'localization'],
        ];

        // Branding Settings
        $brandingSettings = [
            ['key' => 'branding_primary_color', 'value' => '#3B82F6', 'type' => 'string', 'category' => 'branding', 'is_public' => true],
            ['key' => 'branding_secondary_color', 'value' => '#64748B', 'type' => 'string', 'category' => 'branding', 'is_public' => true],
            ['key' => 'branding_accent_color', 'value' => '#10B981', 'type' => 'string', 'category' => 'branding', 'is_public' => true],
            ['key' => 'branding_font_family', 'value' => 'Inter', 'type' => 'string', 'category' => 'branding', 'is_public' => true],
            ['key' => 'branding_font_size', 'value' => '14px', 'type' => 'string', 'category' => 'branding', 'is_public' => true],
            ['key' => 'branding_font_weight', 'value' => '400', 'type' => 'string', 'category' => 'branding', 'is_public' => true],
        ];

        // System Behavior Settings
        $systemBehaviorSettings = [
            ['key' => 'system_default_landing_page', 'value' => '/dashboard', 'type' => 'string', 'category' => 'system_behavior'],
            ['key' => 'system_record_ownership_rules', 'value' => ['creator_owns' => true, 'manager_can_view_all' => true], 'type' => 'json', 'category' => 'system_behavior'],
            ['key' => 'system_auto_assignment_rules', 'value' => ['enabled' => false, 'round_robin' => true], 'type' => 'json', 'category' => 'system_behavior'],
            ['key' => 'system_duplicate_detection_rules', 'value' => ['email_check' => true, 'phone_check' => true, 'name_similarity' => 0.8], 'type' => 'json', 'category' => 'system_behavior'],
        ];

        // Data Management Settings
        $dataManagementSettings = [
            ['key' => 'data_retention_days', 'value' => 2555, 'type' => 'integer', 'category' => 'data_management'], // 7 years
            ['key' => 'data_soft_delete_enabled', 'value' => true, 'type' => 'boolean', 'category' => 'data_management'],
            ['key' => 'data_backup_enabled', 'value' => false, 'type' => 'boolean', 'category' => 'data_management'],
        ];

        // Audit Settings
        $auditSettings = [
            ['key' => 'audit_activity_logging', 'value' => true, 'type' => 'boolean', 'category' => 'audit'],
            ['key' => 'audit_log_retention_days', 'value' => 365, 'type' => 'integer', 'category' => 'audit'],
            ['key' => 'audit_export_logs_enabled', 'value' => false, 'type' => 'boolean', 'category' => 'audit'],
            ['key' => 'audit_tracked_actions', 'value' => ['create', 'update', 'delete', 'login', 'logout'], 'type' => 'json', 'category' => 'audit'],
        ];

        // Compliance Settings
        $complianceSettings = [
            ['key' => 'compliance_gdpr_enabled', 'value' => false, 'type' => 'boolean', 'category' => 'compliance'],
            ['key' => 'compliance_consent_management', 'value' => false, 'type' => 'boolean', 'category' => 'compliance'],
            ['key' => 'compliance_legal_disclaimer', 'value' => 'This system is for authorized users only.', 'type' => 'string', 'category' => 'compliance'],
        ];

        // Integration Settings
        $integrationSettings = [
            ['key' => 'integration_api_enabled', 'value' => true, 'type' => 'boolean', 'category' => 'integration'],
            ['key' => 'integration_rate_limit', 'value' => 1000, 'type' => 'integer', 'category' => 'integration'], // requests per hour
        ];

        // Combine all settings
        $allSettings = array_merge(
            $generalSettings,
            $localizationSettings,
            $brandingSettings,
            $systemBehaviorSettings,
            $dataManagementSettings,
            $auditSettings,
            $complianceSettings,
            $integrationSettings
        );

        // Insert all settings
        foreach ($allSettings as $setting) {
            Settings::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}