<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Settings;
use App\Models\SecuritySettings;
use Symfony\Component\HttpFoundation\Response;

class SettingsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Check if maintenance mode is enabled
        if (Settings::get('maintenance_mode', false) && !$request->user()?->hasRole('admin')) {
            return response()->json(['message' => 'System is under maintenance'], 503);
        }

        // Check IP restrictions
        $this->checkIpRestrictions($request);

        // Check session timeout
        $this->checkSessionTimeout($request);

        // Check login attempts
        $this->checkLoginAttempts($request);

        return $next($request);
    }

    private function checkIpRestrictions(Request $request)
    {
        $securitySettings = SecuritySettings::first();
        if (!$securitySettings) {
            return;
        }

        $clientIp = $request->ip();

        // Check IP blacklist
        if (!empty($securitySettings->ip_blacklist) && in_array($clientIp, $securitySettings->ip_blacklist)) {
            abort(403, 'Access denied from this IP address');
        }

        // Check IP whitelist (if configured)
        if (!empty($securitySettings->ip_whitelist) && !in_array($clientIp, $securitySettings->ip_whitelist)) {
            abort(403, 'Access denied. IP not in whitelist');
        }
    }

    private function checkSessionTimeout(Request $request)
    {
        if (!$request->user()) {
            return;
        }

        $securitySettings = SecuritySettings::first();
        if (!$securitySettings) {
            return;
        }

        $sessionTimeout = $securitySettings->session_timeout * 60; // Convert to seconds
        $lastActivity = session('last_activity', time());

        if (time() - $lastActivity > $sessionTimeout) {
            auth()->logout();
            session()->invalidate();
            abort(401, 'Session expired due to inactivity');
        }

        session(['last_activity' => time()]);
    }

    private function checkLoginAttempts(Request $request)
    {
        // This would be implemented with a rate limiting mechanism
        // For now, we'll just store the logic structure
        $securitySettings = SecuritySettings::first();
        if (!$securitySettings) {
            return;
        }

        // Implementation would track failed login attempts per IP/user
        // and block after exceeding the limit
    }
}