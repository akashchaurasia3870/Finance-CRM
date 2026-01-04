<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Services\SettingsService;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $sharedData = [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];

        // Always add branding settings for authenticated users
        if ($request->user()) {
            $settingsService = app(SettingsService::class);
            $sharedData['branding'] = $settingsService->getBrandingSettings($request->user()->id);
        } else {
            // Provide default branding for non-authenticated users
            $sharedData['branding'] = (object) [
                'theme' => 'light',
                'primary_color' => '#3B82F6',
                'secondary_color' => '#10B981',
                'accent_color' => '#F59E0B',
                'background_color' => '#FFFFFF',
                'text_color' => '#111827',
                'font_family' => 'Inter',
                'font_size' => 'medium',
                'font_weight' => 'normal',
                'company_name' => 'Finance CRM'
            ];
        }

        return $sharedData;
    }
}
