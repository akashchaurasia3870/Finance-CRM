<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\SiteLog;
use Jenssegers\Agent\Agent;

class LogSiteActivity
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Skip logging for certain routes or conditions
        if ($this->shouldSkipLogging($request)) {
            return $response;
        }

        try {
            $agent = new Agent();
            $agent->setUserAgent($request->userAgent());

            SiteLog::create([
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'method' => $request->method(),
                'url' => $request->fullUrl(),
                'headers' => $this->getFilteredHeaders($request),
                'device' => $agent->device(),
                'platform' => $agent->platform(),
                'browser' => $agent->browser(),
                'user_id' => auth()->id(),
            ]);
        } catch (\Exception $e) {
            // Log error but don't break the request
            \Log::error('Site logging failed: ' . $e->getMessage());
        }

        return $response;
    }

    private function shouldSkipLogging(Request $request): bool
    {
        // Skip API routes, assets, and certain paths
        $skipPaths = [
            'api/',
            'assets/',
            'css/',
            'js/',
            'images/',
            'favicon.ico',
            '_debugbar',
            'telescope',
        ];

        foreach ($skipPaths as $path) {
            if (str_starts_with($request->path(), $path)) {
                return true;
            }
        }

        // Skip AJAX requests for certain endpoints
        if ($request->ajax() && in_array($request->path(), [
            'settings/audit', // Skip logging when filtering audit logs
        ])) {
            return true;
        }

        return false;
    }

    private function getFilteredHeaders(Request $request): array
    {
        $headers = $request->headers->all();
        
        // Remove sensitive headers
        $sensitiveHeaders = [
            'authorization',
            'cookie',
            'x-csrf-token',
            'x-xsrf-token',
        ];

        foreach ($sensitiveHeaders as $header) {
            unset($headers[$header]);
        }

        return $headers;
    }
}