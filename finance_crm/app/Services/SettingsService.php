<?php

namespace App\Services;

use App\Repositories\SettingsRepository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class SettingsService extends BaseService
{
    protected $settingsRepository;

    public function __construct(SettingsRepository $settingsRepository)
    {
        $this->settingsRepository = $settingsRepository;
        parent::__construct($settingsRepository);
    }

    // Organization Settings
    public function getOrganizationSettings()
    {
        return Cache::remember('organization_settings', 3600, function () {
            return $this->settingsRepository->getOrganizationSettings();
        });
    }

    public function updateOrganizationSettings($data)
    {
        $result = $this->settingsRepository->updateOrganizationSettings($data);
        Cache::forget('organization_settings');
        return $result;
    }

    // Security Settings
    public function getSecuritySettings()
    {
        return Cache::remember('security_settings', 3600, function () {
            return $this->settingsRepository->getSecuritySettings();
        });
    }

    public function updateSecuritySettings($data)
    {
        // Validate password policy if provided
        if (isset($data['password_policy'])) {
            $this->validatePasswordPolicy($data['password_policy']);
        }

        $result = $this->settingsRepository->updateSecuritySettings($data);
        Cache::forget('security_settings');
        return $result;
    }

    // User Management
    public function createUser($data)
    {
        // Validate password against policy
        $this->validatePasswordAgainstPolicy($data['password']);
        
        return $this->settingsRepository->createUser($data);
    }

    public function updateUser($id, $data)
    {
        if (isset($data['password'])) {
            $this->validatePasswordAgainstPolicy($data['password']);
        }
        
        return $this->settingsRepository->updateUser($id, $data);
    }

    public function deactivateUser($id)
    {
        return $this->settingsRepository->deactivateUser($id);
    }

    public function resetUserPassword($id, $newPassword = null)
    {
        if (!$newPassword) {
            $newPassword = $this->generateSecurePassword();
        }
        
        $this->validatePasswordAgainstPolicy($newPassword);
        
        $result = $this->settingsRepository->updateUser($id, ['password' => $newPassword]);
        
        // Send password reset email
        $this->sendPasswordResetNotification($id, $newPassword);
        
        return $result;
    }

    public function assignRoleToUser($userId, $roleId)
    {
        return $this->settingsRepository->assignRoleToUser($userId, $roleId);
    }

    public function removeRoleFromUser($userId, $roleId)
    {
        return $this->settingsRepository->removeRoleFromUser($userId, $roleId);
    }

    // Role & Permission Management
    public function createRole($data)
    {
        return $this->settingsRepository->createRole($data);
    }

    public function updateRole($id, $data)
    {
        return $this->settingsRepository->updateRole($id, $data);
    }

    public function updateRolePermissions($roleId, $permissions)
    {
        // Validate permissions structure
        $this->validatePermissions($permissions);
        
        return $this->settingsRepository->updateRolePermissions($roleId, $permissions);
    }

    // Notification Settings
    public function getNotificationSettings()
    {
        return Cache::remember('notification_settings', 3600, function () {
            return $this->settingsRepository->getNotificationSettings();
        });
    }

    public function updateNotificationSettings($data)
    {
        $result = $this->settingsRepository->updateNotificationSettings($data);
        Cache::forget('notification_settings');
        return $result;
    }

    public function updateUserNotificationPreferences($userId, $preferences)
    {
        foreach ($preferences as $preference) {
            $this->settingsRepository->updateUserNotificationPreference(
                $userId,
                $preference['notification_type'],
                $preference['event_type'],
                $preference['enabled']
            );
        }
        return true;
    }

    // Email Settings
    public function getEmailSettings()
    {
        return Cache::remember('email_settings', 3600, function () {
            return $this->settingsRepository->getEmailSettings();
        });
    }

    public function updateEmailSettings($data)
    {
        // Test email configuration before saving
        if (isset($data['smtp_host'])) {
            $this->testEmailConfiguration($data);
        }
        
        $result = $this->settingsRepository->updateEmailSettings($data);
        Cache::forget('email_settings');
        return $result;
    }

    // Integration Settings
    public function enableIntegration($integrationName, $apiKeys, $configuration = [])
    {
        return $this->settingsRepository->setSetting(
            "integration_{$integrationName}_enabled",
            true,
            'boolean',
            'integration'
        );
    }

    public function disableIntegration($integrationName)
    {
        return $this->settingsRepository->setSetting(
            "integration_{$integrationName}_enabled",
            false,
            'boolean',
            'integration'
        );
    }

    // Data Management
    public function configureDataRetention($days)
    {
        return $this->settingsRepository->setSetting(
            'data_retention_days',
            $days,
            'integer',
            'data_management'
        );
    }

    public function configureDuplicateDetection($rules)
    {
        return $this->settingsRepository->setSetting(
            'duplicate_detection_rules',
            $rules,
            'json',
            'system_behavior'
        );
    }

    // Audit & Activity
    public function enableActivityLogging($enabled = true)
    {
        return $this->settingsRepository->setSetting(
            'activity_logging_enabled',
            $enabled,
            'boolean',
            'audit'
        );
    }

    public function getAuditLogs($filters = [])
    {
        return $this->settingsRepository->getAuditLogs($filters);
    }

    public function exportAuditLogs($filters = [])
    {
        return $this->settingsRepository->exportAuditLogs($filters);
    }

    // Localization
    public function updateLocalizationSettings($data)
    {
        foreach ($data as $key => $value) {
            $this->settingsRepository->setSetting(
                "localization_{$key}",
                $value,
                is_array($value) ? 'json' : 'string',
                'localization'
            );
        }
        Cache::forget('localization_settings');
        return true;
    }

    // Branding
    public function updateBrandingSettings($data, $userId = null)
    {
        $userId = $userId ?? auth()->id();
        
        // Get or create user branding settings
        $brandingSettings = \DB::table('branding_settings')
            ->where('user_id', $userId)
            ->first();
            
        if ($brandingSettings) {
            \DB::table('branding_settings')
                ->where('user_id', $userId)
                ->update(array_merge($data, ['updated_at' => now()]));
        } else {
            \DB::table('branding_settings')
                ->insert(array_merge($data, [
                    'user_id' => $userId,
                    'created_at' => now(),
                    'updated_at' => now()
                ]));
        }
        
        // Clear cache for this user and all users (in case of shared settings)
        Cache::forget("branding_settings_{$userId}");
        Cache::forget('branding_settings_default');
        
        return true;
    }
    
    public function getBrandingSettings($userId = null)
    {
        $userId = $userId ?? auth()->id();
        
        return Cache::remember("branding_settings_{$userId}", 3600, function () use ($userId) {
            $settings = \DB::table('branding_settings')
                ->where('user_id', $userId)
                ->first();
                
            // Return default settings if user hasn't customized
            if (!$settings) {
                return (object) [
                    'theme' => 'light',
                    'primary_color' => '#3B82F6',
                    'secondary_color' => '#10B981',
                    'accent_color' => '#F59E0B',
                    'background_color' => '#FFFFFF',
                    'text_color' => '#111827',
                    'font_family' => 'Inter',
                    'font_size' => 'medium',
                    'font_weight' => 'normal',
                    'banner_template' => 'default',
                    'banner_background' => '',
                    'banner_quote' => 'Welcome to Finance CRM - Your Success is Our Priority',
                    'company_name' => 'Finance CRM',
                    'logo_url' => '',
                    'favicon_url' => '',
                    'login_background' => ''
                ];
            }
            
            return $settings;
        });
    }
    
    public function getDefaultBrandingSettings()
    {
        return Cache::remember('branding_settings_default', 3600, function () {
            return (object) [
                'theme' => 'light',
                'primary_color' => '#3B82F6',
                'secondary_color' => '#10B981',
                'accent_color' => '#F59E0B',
                'background_color' => '#FFFFFF',
                'text_color' => '#111827',
                'font_family' => 'Inter',
                'font_size' => 'medium',
                'font_weight' => 'normal',
                'banner_template' => 'default',
                'banner_background' => '',
                'banner_quote' => 'Welcome to Finance CRM - Your Success is Our Priority',
                'company_name' => 'Finance CRM',
                'logo_url' => '',
                'favicon_url' => '',
                'login_background' => ''
            ];
        });
    }

    // System Behavior
    public function updateSystemBehaviorSettings($data)
    {
        foreach ($data as $key => $value) {
            $this->settingsRepository->setSetting(
                "system_{$key}",
                $value,
                is_array($value) ? 'json' : 'string',
                'system_behavior'
            );
        }
        Cache::forget('system_behavior_settings');
        return true;
    }

    // Compliance
    public function enableGDPR($enabled = true)
    {
        return $this->settingsRepository->setSetting(
            'gdpr_enabled',
            $enabled,
            'boolean',
            'compliance'
        );
    }

    public function updateComplianceSettings($data)
    {
        foreach ($data as $key => $value) {
            $this->settingsRepository->setSetting(
                "compliance_{$key}",
                $value,
                is_array($value) ? 'json' : (is_bool($value) ? 'boolean' : 'string'),
                'compliance'
            );
        }
        Cache::forget('compliance_settings');
        return true;
    }

    // Helper Methods
    private function validatePasswordPolicy($policy)
    {
        $requiredFields = ['min_length', 'require_uppercase', 'require_lowercase', 'require_numbers', 'require_special'];
        foreach ($requiredFields as $field) {
            if (!isset($policy[$field])) {
                throw new \InvalidArgumentException("Password policy must include {$field}");
            }
        }
    }

    private function validatePasswordAgainstPolicy($password)
    {
        $securitySettings = $this->getSecuritySettings();
        if (!$securitySettings || !$securitySettings->password_policy) {
            return true;
        }

        $policy = $securitySettings->password_policy;
        
        if (strlen($password) < $policy['min_length']) {
            throw new \InvalidArgumentException("Password must be at least {$policy['min_length']} characters long");
        }

        if ($policy['require_uppercase'] && !preg_match('/[A-Z]/', $password)) {
            throw new \InvalidArgumentException("Password must contain at least one uppercase letter");
        }

        if ($policy['require_lowercase'] && !preg_match('/[a-z]/', $password)) {
            throw new \InvalidArgumentException("Password must contain at least one lowercase letter");
        }

        if ($policy['require_numbers'] && !preg_match('/[0-9]/', $password)) {
            throw new \InvalidArgumentException("Password must contain at least one number");
        }

        if ($policy['require_special'] && !preg_match('/[^A-Za-z0-9]/', $password)) {
            throw new \InvalidArgumentException("Password must contain at least one special character");
        }

        return true;
    }

    private function generateSecurePassword($length = 12)
    {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        return substr(str_shuffle($chars), 0, $length);
    }

    private function validatePermissions($permissions)
    {
        // Validate permissions structure
        if (!is_array($permissions)) {
            throw new \InvalidArgumentException("Permissions must be an array");
        }
        return true;
    }

    private function testEmailConfiguration($config)
    {
        // Test email configuration
        try {
            // This would test the SMTP connection
            return true;
        } catch (\Exception $e) {
            throw new \InvalidArgumentException("Email configuration test failed: " . $e->getMessage());
        }
    }

    private function sendPasswordResetNotification($userId, $newPassword)
    {
        // Send password reset notification
        // Implementation depends on your notification system
    }
}