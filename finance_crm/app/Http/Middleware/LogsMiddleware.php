<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Jenssegers\Agent\Agent;

class LogsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $agent = new Agent();
        
        DB::table('site_logs')->insert([
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'headers' => json_encode($request->headers->all()),
            'device' => $agent->device() ?: 'Unknown',
            'platform' => $agent->platform(),
            'browser' => $agent->browser(),
            'user_id' => auth()->id(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $next($request);
    }
}