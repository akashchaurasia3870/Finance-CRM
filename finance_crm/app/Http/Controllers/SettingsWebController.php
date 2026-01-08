<?php

namespace App\Http\Controllers;

use App\Services\SettingsService;
use App\Services\UserService;
use App\Services\RoleService;
use App\Models\SiteLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsWebController extends Controller
{
    protected $settingsService;
    protected $userService;
    protected $roleService;

    public function __construct(SettingsService $settingsService, UserService $userService, RoleService $roleService)
    {
        $this->settingsService = $settingsService;
        $this->userService = $userService;
        $this->roleService = $roleService;
    }

    public function index()
    {
        return Inertia::render('Modules/Settings/Index');
    }

    // Organization Settings
    public function organizationSettings()
    {
        return Inertia::render('Modules/Settings/Organization', [
            'settings' => $this->settingsService->getOrganizationSettings(),
        ]);
    }

    public function updateOrganizationSettings(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'timezone' => 'required|string',
            'fiscal_year_start' => 'required|date',
        ]);

        $this->settingsService->updateOrganizationSettings($request->all());
        
        return redirect()->back()->with('success', 'Organization settings updated successfully');
    }

    // User Management
    public function userManagement()
    {
        return Inertia::render('Modules/Settings/UserManagement', [
            'users' => $this->userService->getAllRecords(),
            'roles' => $this->roleService->getAllRecords(),
        ]);
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $this->settingsService->createUser($request->all());
        
        return redirect()->back()->with('success', 'User created successfully');
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $id,
            'is_active' => 'boolean',
        ]);

        $this->settingsService->updateUser($id, $request->all());
        
        return redirect()->back()->with('success', 'User updated successfully');
    }

    // Role Management
    public function roleManagement()
    {
        return Inertia::render('Modules/Settings/RoleManagement', [
            'roles' => $this->roleService->getAllRecords(),
            'permissions' => $this->getAvailablePermissions(),
        ]);
    }

    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles|max:255',
            'description' => 'nullable|string',
            'permissions' => 'required|array',
        ]);

        $this->settingsService->createRole($request->all());
        
        return redirect()->back()->with('success', 'Role created successfully');
    }

    // Security Settings
    public function securitySettings()
    {
        return Inertia::render('Modules/Settings/Security', [
            'settings' => $this->settingsService->getSecuritySettings(),
        ]);
    }

    public function updateSecuritySettings(Request $request)
    {
        $request->validate([
            'two_factor_enabled' => 'boolean',
            'login_attempt_limit' => 'integer|min:1|max:10',
            'session_timeout' => 'integer|min:5|max:1440',
        ]);

        $this->settingsService->updateSecuritySettings($request->all());
        
        return redirect()->back()->with('success', 'Security settings updated successfully');
    }

    // Notification Settings
    public function notificationSettings()
    {
        return Inertia::render('Modules/Settings/Notifications', [
            'settings' => $this->settingsService->getNotificationSettings(),
        ]);
    }

    public function updateNotificationSettings(Request $request)
    {
        $this->settingsService->updateNotificationSettings($request->all());
        
        return redirect()->back()->with('success', 'Notification settings updated successfully');
    }

    // Email Settings
    public function emailSettings()
    {
        return Inertia::render('Modules/Settings/Email', [
            'settings' => $this->settingsService->getEmailSettings(),
        ]);
    }

    public function updateEmailSettings(Request $request)
    {
        $request->validate([
            'smtp_host' => 'required|string',
            'smtp_port' => 'required|integer',
            'smtp_username' => 'required|string',
            'from_email' => 'required|email',
            'from_name' => 'required|string',
        ]);

        $this->settingsService->updateEmailSettings($request->all());
        
        return redirect()->back()->with('success', 'Email settings updated successfully');
    }

    // Integration Settings
    public function integrationSettings()
    {
        return Inertia::render('Modules/Settings/Integrations');
    }

    // Data Management
    public function dataManagement()
    {
        return Inertia::render('Modules/Settings/DataManagement');
    }

    // Audit & Activity
    public function auditSettings(Request $request)
    {
        $query = SiteLog::with('user')->orderBy('created_at', 'desc');

        // Apply filters
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('ip_address')) {
            $query->byIpAddress($request->ip_address);
        }

        if ($request->filled('method')) {
            $query->byMethod($request->method);
        }

        if ($request->filled('user_id')) {
            $query->byUserId($request->user_id);
        }

        if ($request->filled('date_from') || $request->filled('date_to')) {
            $query->byDateRange($request->date_from, $request->date_to);
        }

        $siteLogs = $query->paginate(50);

        return Inertia::render('Modules/Settings/Audit', [
            'siteLogs' => $siteLogs->items(),
            'filters' => $request->only(['search', 'ip_address', 'method', 'user_id', 'date_from', 'date_to']),
        ]);
    }

    public function exportAuditLogs(Request $request)
    {
        $query = SiteLog::with('user')->orderBy('created_at', 'desc');

        // Apply same filters as audit settings
        if ($request->filled('search')) {
            $query->search($request->search);
        }
        if ($request->filled('ip_address')) {
            $query->byIpAddress($request->ip_address);
        }
        if ($request->filled('method')) {
            $query->byMethod($request->method);
        }
        if ($request->filled('user_id')) {
            $query->byUserId($request->user_id);
        }
        if ($request->filled('date_from') || $request->filled('date_to')) {
            $query->byDateRange($request->date_from, $request->date_to);
        }

        $logs = $query->limit(10000)->get(); // Limit for performance

        $filename = 'site_logs_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($logs) {
            $file = fopen('php://output', 'w');
            
            // CSV headers
            fputcsv($file, [
                'ID', 'IP Address', 'User ID', 'User Name', 'Method', 'URL', 
                'Browser', 'Platform', 'Device', 'User Agent', 'Created At'
            ]);

            // CSV data
            foreach ($logs as $log) {
                fputcsv($file, [
                    $log->id,
                    $log->ip_address,
                    $log->user_id,
                    $log->user ? $log->user->name : 'Guest',
                    $log->method,
                    $log->url,
                    $log->browser,
                    $log->platform,
                    $log->device,
                    $log->user_agent,
                    $log->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    // Localization
    public function localizationSettings()
    {
        return Inertia::render('Modules/Settings/Localization');
    }

    // Branding
    public function brandingSettings()
    {
        return Inertia::render('Modules/Settings/Branding', [
            'branding' => $this->settingsService->getBrandingSettings(),
        ]);
    }

    public function updateBrandingSettings(Request $request)
    {
        $request->validate([
            'theme' => 'string|in:light,dark,warm,cool,cozy,sunny,monsoon,high-contrast,bold-palette,vivid-scheme,power-colors,statement-colors,rainy-night,storm,autumn,ocean-breeze,midnight,golden-hour,serenity,corporate,minimal,cyberpunk,galaxy,sunset',
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

        $this->settingsService->updateBrandingSettings($request->all());
        
        return redirect()->back()->with('success', 'Branding settings updated successfully');
    }

    // System Behavior
    public function systemBehaviorSettings()
    {
        return Inertia::render('Modules/Settings/SystemBehavior');
    }

    // Compliance
    public function complianceSettings()
    {
        return Inertia::render('Modules/Settings/Compliance');
    }

    private function getAvailablePermissions()
    {
        return [
            'users' => ['view', 'create', 'edit', 'delete'],
            'roles' => ['view', 'create', 'edit', 'delete'],
            'leads' => ['view', 'create', 'edit', 'delete'],
            'clients' => ['view', 'create', 'edit', 'delete'],
            'campaigns' => ['view', 'create', 'edit', 'delete'],
            'tasks' => ['view', 'create', 'edit', 'delete'],
            'meetings' => ['view', 'create', 'edit', 'delete'],
            'reports' => ['view', 'create', 'edit', 'delete'],
            'settings' => ['view', 'edit'],
        ];
    }
}