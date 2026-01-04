<?php

namespace App\Http\Controllers;

use App\Services\SettingsService;
use Illuminate\Http\Request;

class SettingsController extends BaseController
{
    protected $settingsService;

    public function __construct(SettingsService $settingsService)
    {
        $this->settingsService = $settingsService;
    }

    // Organization Settings
    public function getOrganizationSettings()
    {
        try {
            $settings = $this->settingsService->getOrganizationSettings();
            return $this->sendResponse($settings, 'Organization settings retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error retrieving organization settings', $e->getMessage());
        }
    }

    public function updateOrganizationSettings(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'timezone' => 'required|string',
            'fiscal_year_start' => 'required|date',
            'business_hours' => 'array',
            'working_days' => 'array',
        ]);

        try {
            $result = $this->settingsService->updateOrganizationSettings($request->all());
            return $this->sendResponse($result, 'Organization settings updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating organization settings', $e->getMessage());
        }
    }

    // Security Settings
    public function getSecuritySettings()
    {
        try {
            $settings = $this->settingsService->getSecuritySettings();
            return $this->sendResponse($settings, 'Security settings retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error retrieving security settings', $e->getMessage());
        }
    }

    public function updateSecuritySettings(Request $request)
    {
        $request->validate([
            'two_factor_enabled' => 'boolean',
            'login_attempt_limit' => 'integer|min:1|max:10',
            'session_timeout' => 'integer|min:5|max:1440',
            'password_policy' => 'array',
        ]);

        try {
            $result = $this->settingsService->updateSecuritySettings($request->all());
            return $this->sendResponse($result, 'Security settings updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating security settings', $e->getMessage());
        }
    }

    // User Management
    public function createUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'is_active' => 'boolean',
        ]);

        try {
            $user = $this->settingsService->createUser($request->all());
            return $this->sendResponse($user, 'User created successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error creating user', $e->getMessage());
        }
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $id,
            'password' => 'string|min:8',
            'is_active' => 'boolean',
        ]);

        try {
            $result = $this->settingsService->updateUser($id, $request->all());
            return $this->sendResponse($result, 'User updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating user', $e->getMessage());
        }
    }

    public function deactivateUser($id)
    {
        try {
            $result = $this->settingsService->deactivateUser($id);
            return $this->sendResponse($result, 'User deactivated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error deactivating user', $e->getMessage());
        }
    }

    public function resetUserPassword(Request $request, $id)
    {
        $request->validate([
            'new_password' => 'nullable|string|min:8',
        ]);

        try {
            $result = $this->settingsService->resetUserPassword($id, $request->new_password);
            return $this->sendResponse($result, 'Password reset successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error resetting password', $e->getMessage());
        }
    }

    public function assignRoleToUser(Request $request, $userId)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        try {
            $result = $this->settingsService->assignRoleToUser($userId, $request->role_id);
            return $this->sendResponse($result, 'Role assigned successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error assigning role', $e->getMessage());
        }
    }

    public function removeRoleFromUser($userId, $roleId)
    {
        try {
            $result = $this->settingsService->removeRoleFromUser($userId, $roleId);
            return $this->sendResponse($result, 'Role removed successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error removing role', $e->getMessage());
        }
    }

    // Role Management
    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles|max:255',
            'description' => 'nullable|string',
            'permissions' => 'required|array',
        ]);

        try {
            $role = $this->settingsService->createRole($request->all());
            return $this->sendResponse($role, 'Role created successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error creating role', $e->getMessage());
        }
    }

    public function updateRolePermissions(Request $request, $roleId)
    {
        $request->validate([
            'permissions' => 'required|array',
        ]);

        try {
            $result = $this->settingsService->updateRolePermissions($roleId, $request->permissions);
            return $this->sendResponse($result, 'Role permissions updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating role permissions', $e->getMessage());
        }
    }

    // Notification Settings
    public function getNotificationSettings()
    {
        try {
            $settings = $this->settingsService->getNotificationSettings();
            return $this->sendResponse($settings, 'Notification settings retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error retrieving notification settings', $e->getMessage());
        }
    }

    public function updateNotificationSettings(Request $request)
    {
        $request->validate([
            'email_notifications' => 'boolean',
            'sms_notifications' => 'boolean',
            'push_notifications' => 'boolean',
            'notification_triggers' => 'array',
        ]);

        try {
            $result = $this->settingsService->updateNotificationSettings($request->all());
            return $this->sendResponse($result, 'Notification settings updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating notification settings', $e->getMessage());
        }
    }

    public function updateUserNotificationPreferences(Request $request, $userId)
    {
        $request->validate([
            'preferences' => 'required|array',
            'preferences.*.notification_type' => 'required|string',
            'preferences.*.event_type' => 'required|string',
            'preferences.*.enabled' => 'required|boolean',
        ]);

        try {
            $result = $this->settingsService->updateUserNotificationPreferences($userId, $request->preferences);
            return $this->sendResponse($result, 'User notification preferences updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating notification preferences', $e->getMessage());
        }
    }

    // Email Settings
    public function getEmailSettings()
    {
        try {
            $settings = $this->settingsService->getEmailSettings();
            return $this->sendResponse($settings, 'Email settings retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error retrieving email settings', $e->getMessage());
        }
    }

    public function updateEmailSettings(Request $request)
    {
        $request->validate([
            'smtp_host' => 'required|string',
            'smtp_port' => 'required|integer',
            'smtp_username' => 'required|string',
            'smtp_password' => 'required|string',
            'from_email' => 'required|email',
            'from_name' => 'required|string',
        ]);

        try {
            $result = $this->settingsService->updateEmailSettings($request->all());
            return $this->sendResponse($result, 'Email settings updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating email settings', $e->getMessage());
        }
    }

    // Integration Settings
    public function enableIntegration(Request $request)
    {
        $request->validate([
            'integration_name' => 'required|string',
            'api_keys' => 'required|array',
            'configuration' => 'array',
        ]);

        try {
            $result = $this->settingsService->enableIntegration(
                $request->integration_name,
                $request->api_keys,
                $request->configuration ?? []
            );
            return $this->sendResponse($result, 'Integration enabled successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error enabling integration', $e->getMessage());
        }
    }

    public function disableIntegration($integrationName)
    {
        try {
            $result = $this->settingsService->disableIntegration($integrationName);
            return $this->sendResponse($result, 'Integration disabled successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error disabling integration', $e->getMessage());
        }
    }

    // Data Management
    public function updateDataRetention(Request $request)
    {
        $request->validate([
            'retention_days' => 'required|integer|min:30',
        ]);

        try {
            $result = $this->settingsService->configureDataRetention($request->retention_days);
            return $this->sendResponse($result, 'Data retention configured successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error configuring data retention', $e->getMessage());
        }
    }

    // Audit & Activity
    public function getAuditLogs(Request $request)
    {
        try {
            $logs = $this->settingsService->getAuditLogs($request->all());
            return $this->sendResponse($logs, 'Audit logs retrieved successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error retrieving audit logs', $e->getMessage());
        }
    }

    public function exportAuditLogs(Request $request)
    {
        try {
            $logs = $this->settingsService->exportAuditLogs($request->all());
            return $this->sendResponse($logs, 'Audit logs exported successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error exporting audit logs', $e->getMessage());
        }
    }

    // Localization
    public function updateLocalizationSettings(Request $request)
    {
        $request->validate([
            'default_language' => 'string|max:5',
            'currency' => 'string|max:3',
            'date_format' => 'string',
            'time_format' => 'string',
        ]);

        try {
            $result = $this->settingsService->updateLocalizationSettings($request->all());
            return $this->sendResponse($result, 'Localization settings updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating localization settings', $e->getMessage());
        }
    }

    // Branding
    public function getBrandingSettings()
    {
        try {
            $settings = $this->settingsService->getBrandingSettings();
            return response()->json([
                'success' => true,
                'data' => $settings,
                'message' => 'Branding settings retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving branding settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function updateBrandingSettings(Request $request)
    {
        $request->validate([
            'theme' => 'string|in:light,dark,warm,cool,cozy,sunny,monsoon',
            'primary_color' => 'string|regex:/^#[0-9A-Fa-f]{6}$/',
            'secondary_color' => 'string|regex:/^#[0-9A-Fa-f]{6}$/',
            'accent_color' => 'string|regex:/^#[0-9A-Fa-f]{6}$/',
            'background_color' => 'string|regex:/^#[0-9A-Fa-f]{6}$/',
            'text_color' => 'string|regex:/^#[0-9A-Fa-f]{6}$/',
            'font_family' => 'string',
            'font_size' => 'string',
            'font_weight' => 'string',
            'banner_template' => 'string',
            'banner_background' => 'nullable|string',
            'banner_quote' => 'string',
            'company_name' => 'string',
            'logo_url' => 'nullable|url',
            'favicon_url' => 'nullable|url',
            'login_background' => 'nullable|url'
        ]);

        try {
            $result = $this->settingsService->updateBrandingSettings($request->all());
            return response()->json([
                'success' => true,
                'data' => $result,
                'message' => 'Branding settings updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating branding settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // System Behavior
    public function updateSystemBehaviorSettings(Request $request)
    {
        try {
            $result = $this->settingsService->updateSystemBehaviorSettings($request->all());
            return $this->sendResponse($result, 'System behavior settings updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating system behavior settings', $e->getMessage());
        }
    }

    // Compliance
    public function updateComplianceSettings(Request $request)
    {
        $request->validate([
            'gdpr_enabled' => 'boolean',
            'consent_management' => 'boolean',
        ]);

        try {
            $result = $this->settingsService->updateComplianceSettings($request->all());
            return $this->sendResponse($result, 'Compliance settings updated successfully');
        } catch (\Exception $e) {
            return $this->sendError('Error updating compliance settings', $e->getMessage());
        }
    }
}