<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Settings;
use App\Models\OrganizationSettings;
use App\Models\SecuritySettings;
use App\Models\NotificationSettings;
use App\Models\EmailSettings;

class SettingsSeederFixed extends Seeder
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
                ],
                'working_days' => [1, 2, 3, 4, 5],
                'holidays' => [],
            ]
        );

        // Default Security Settings
        SecuritySettings::updateOrCreate(
            ['id' => 1],
            [
                'two_factor_enabled' => false,
                'login_attempt_limit' => 5,
                'session_timeout' => 120,
                'force_password_change' => false,
                'password_policy' => [
                    'min_length' => 8,
                    'require_uppercase' => true,
                    'require_lowercase' => true,
                    'require_numbers' => true,
                    'require_special' => true,
                ],
                'ip_whitelist' => [],
                'ip_blacklist' => [],
            ]
        );

        // Default Notification Settings
        NotificationSettings::updateOrCreate(
            ['id' => 1],
            [
                'email_notifications' => true,
                'sms_notifications' => false,
                'push_notifications' => true,
                'notification_triggers' => [
                    'lead_created' => true,
                    'task_assigned' => true,
                    'meeting_scheduled' => true,
                ],
                'system_notification_rules' => [
                    'send_daily_summary' => true,
                ]
            ]
        );

        // Default Email Settings
        EmailSettings::updateOrCreate(
            ['id' => 1],
            [
                'smtp_host' => 'smtp.gmail.com',
                'smtp_port' => 587,
                'smtp_username' => 'your-email@gmail.com',
                'smtp_password' => 'your-app-password',
                'smtp_encryption' => 'tls',
                'from_email' => 'noreply@financecrm.com',
                'from_name' => 'Finance CRM',
                'reply_to_email' => 'support@financecrm.com',
                'email_tracking' => false,
            ]
        );

        // General Settings
        $settings = [
            ['key' => 'app_name', 'value' => 'Finance CRM', 'type' => 'string', 'category' => 'general', 'is_public' => true],
            ['key' => 'maintenance_mode', 'value' => false, 'type' => 'boolean', 'category' => 'general'],
        ];

        foreach ($settings as $setting) {
            Settings::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}