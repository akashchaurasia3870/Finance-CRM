<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Theme Variables -->
        @php
            $branding = null;
            if (auth()->check()) {
                try {
                    $settingsService = app(\App\Services\SettingsService::class);
                    $branding = $settingsService->getBrandingSettings(auth()->id());
                } catch (\Exception $e) {
                    // Fallback to default if there's any error
                    $branding = null;
                }
            }
            // Use default values if not logged in or if branding is null
            $defaultBranding = (object) [
                'primary_color' => '#3B82F6',
                'secondary_color' => '#10B981',
                'accent_color' => '#F59E0B',
                'background_color' => '#FFFFFF',
                'text_color' => '#111827',
                'font_family' => 'Inter',
                'font_size' => 'medium',
                'font_weight' => 'normal',
                'theme' => 'light'
            ];
            $branding = $branding ?? $defaultBranding;
        @endphp
        
        <style>
            :root {
                --primary-color: {{ $branding->primary_color }};
                --secondary-color: {{ $branding->secondary_color }};
                --accent-color: {{ $branding->accent_color }};
                --background-color: {{ $branding->background_color }};
                --text-color: {{ $branding->text_color }};
                --font-family: {{ $branding->font_family && $branding->font_family !== 'Default' ? $branding->font_family : 'Inter' }}, sans-serif;
                --font-size: {{ 
                    $branding->font_size === 'small' ? '14px' : 
                    ($branding->font_size === 'large' ? '18px' : '16px') 
                }};
                --font-weight: {{ 
                    $branding->font_weight === 'light' ? '300' : 
                    ($branding->font_weight === 'medium' ? '500' : 
                    ($branding->font_weight === 'semibold' ? '600' : 
                    ($branding->font_weight === 'bold' ? '700' : '400'))) 
                }};
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased theme-{{ $branding->theme }}">
        @inertia
    </body>
</html>
