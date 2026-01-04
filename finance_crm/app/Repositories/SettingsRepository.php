<?php

namespace App\Repositories;

use App\Models\Settings;
use App\Models\OrganizationSettings;
use App\Models\SecuritySettings;
use App\Models\NotificationSettings;
use App\Models\UserNotificationPreferences;
use App\Models\EmailSettings;
use App\Models\User;
use App\Models\Role;

class SettingsRepository extends BaseRepository
{
    public function __construct(Settings $model)
    {
        parent::__construct($model);
    }

    // Organization Settings
    public function getOrganizationSettings()
    {
        return OrganizationSettings::first();
    }

    public function updateOrganizationSettings($data)
    {
        $settings = OrganizationSettings::first();
        if ($settings) {
            return $settings->update($data);
        }
        return OrganizationSettings::create(array_merge($data, ['created_by' => auth()->id()]));
    }

    // Security Settings
    public function getSecuritySettings()
    {
        return SecuritySettings::first();
    }

    public function updateSecuritySettings($data)
    {
        $settings = SecuritySettings::first();
        if ($settings) {
            return $settings->update($data);
        }
        return SecuritySettings::create(array_merge($data, ['created_by' => auth()->id()]));
    }

    // User Management
    public function createUser($data)
    {
        return User::create(array_merge($data, [
            'password' => bcrypt($data['password']),
            'created_by' => auth()->id()
        ]));
    }

    public function updateUser($id, $data)
    {
        $user = User::findOrFail($id);
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        return $user->update($data);
    }

    public function deactivateUser($id)
    {
        return User::findOrFail($id)->update(['is_active' => false]);
    }

    public function assignRoleToUser($userId, $roleId)
    {
        $user = User::findOrFail($userId);
        return $user->roles()->attach($roleId, [
            'is_active' => true,
            'created_by' => auth()->id()
        ]);
    }

    public function removeRoleFromUser($userId, $roleId)
    {
        $user = User::findOrFail($userId);
        return $user->roles()->detach($roleId);
    }

    // Role Management
    public function createRole($data)
    {
        return Role::create(array_merge($data, ['created_by' => auth()->id()]));
    }

    public function updateRole($id, $data)
    {
        return Role::findOrFail($id)->update($data);
    }

    public function getRolePermissions($roleId)
    {
        return Role::findOrFail($roleId)->permissions;
    }

    public function updateRolePermissions($roleId, $permissions)
    {
        return Role::findOrFail($roleId)->update(['permissions' => $permissions]);
    }

    // Notification Settings
    public function getNotificationSettings()
    {
        return NotificationSettings::first();
    }

    public function updateNotificationSettings($data)
    {
        $settings = NotificationSettings::first();
        if ($settings) {
            return $settings->update($data);
        }
        return NotificationSettings::create(array_merge($data, ['created_by' => auth()->id()]));
    }

    public function getUserNotificationPreferences($userId)
    {
        return UserNotificationPreferences::where('user_id', $userId)->get();
    }

    public function updateUserNotificationPreference($userId, $notificationType, $eventType, $enabled)
    {
        return UserNotificationPreferences::updateOrCreate(
            [
                'user_id' => $userId,
                'notification_type' => $notificationType,
                'event_type' => $eventType
            ],
            ['enabled' => $enabled]
        );
    }

    // Email Settings
    public function getEmailSettings()
    {
        return EmailSettings::first();
    }

    public function updateEmailSettings($data)
    {
        $settings = EmailSettings::first();
        if ($settings) {
            return $settings->update($data);
        }
        return EmailSettings::create(array_merge($data, ['created_by' => auth()->id()]));
    }

    // Generic Settings
    public function getSetting($key, $default = null)
    {
        return Settings::get($key, $default);
    }

    public function setSetting($key, $value, $type = 'string', $category = 'general')
    {
        return Settings::set($key, $value, $type, $category);
    }

    public function getSettingsByCategory($category)
    {
        return Settings::where('category', $category)->get();
    }

    public function getPublicSettings()
    {
        return Settings::where('is_public', true)->get();
    }

    // Audit & Activity
    public function getAuditLogs($filters = [])
    {
        // Implementation depends on your audit log structure
        // This is a placeholder for audit functionality
        return collect([]);
    }

    public function exportAuditLogs($filters = [])
    {
        // Implementation for exporting audit logs
        return $this->getAuditLogs($filters);
    }
}