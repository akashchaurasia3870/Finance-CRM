<?php

namespace App\Helpers;

use App\Models\Settings;
use App\Models\OrganizationSettings;
use App\Models\SecuritySettings;
use App\Models\NotificationSettings;
use App\Models\EmailSettings;
use Illuminate\Support\Facades\Cache;

class SettingsHelper
{
    // Organization Settings
    public static function getCompanyName()
    {
        return Cache::remember('company_name', 3600, function () {
            $org = OrganizationSettings::first();
            return $org ? $org->company_name : 'Finance CRM';
        });
    }

    public static function getTimezone()
    {
        return Cache::remember('timezone', 3600, function () {
            $org = OrganizationSettings::first();
            return $org ? $org->timezone : 'UTC';
        });
    }

    public static function getBusinessHours()
    {
        return Cache::remember('business_hours', 3600, function () {
            $org = OrganizationSettings::first();
            return $org ? $org->business_hours : [];
        });
    }

    // Security Settings
    public static function isTwoFactorEnabled()
    {
        return Cache::remember('two_factor_enabled', 3600, function () {
            $security = SecuritySettings::first();
            return $security ? $security->two_factor_enabled : false;
        });
    }

    public static function getLoginAttemptLimit()
    {
        return Cache::remember('login_attempt_limit', 3600, function () {
            $security = SecuritySettings::first();
            return $security ? $security->login_attempt_limit : 5;
        });
    }

    public static function getPasswordPolicy()
    {
        return Cache::remember('password_policy', 3600, function () {
            $security = SecuritySettings::first();
            return $security ? $security->password_policy : [
                'min_length' => 8,
                'require_uppercase' => true,
                'require_lowercase' => true,
                'require_numbers' => true,
                'require_special' => true,
            ];
        });
    }

    // General Settings
    public static function get($key, $default = null)
    {
        return Cache::remember("setting_{$key}", 3600, function () use ($key, $default) {
            return Settings::get($key, $default);
        });
    }

    public static function set($key, $value, $type = 'string', $category = 'general')
    {
        $result = Settings::set($key, $value, $type, $category);
        Cache::forget("setting_{$key}");
        return $result;
    }

    // Localization Settings
    public static function getDefaultLanguage()
    {
        return self::get('localization_default_language', 'en');
    }

    public static function getCurrency()
    {
        return self::get('localization_currency', 'USD');
    }

    // Branding Settings
    public static function getPrimaryColor()
    {
        return self::get('branding_primary_color', '#3B82F6');
    }

    // System Behavior Settings
    public static function getDefaultLandingPage()
    {
        return self::get('system_default_landing_page', '/dashboard');
    }

    // Utility Methods
    public static function isMaintenanceMode()
    {
        return self::get('maintenance_mode', false);
    }

    public static function getAppName()
    {
        return self::get('app_name', 'Finance CRM');
    }

    // Clear all settings cache
    public static function clearCache()
    {
        Cache::flush();
    }
}