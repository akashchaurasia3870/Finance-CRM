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
                $settingsService = app(\App\Services\SettingsService::class);
                $branding = $settingsService->getBrandingSettings(auth()->id());
            }
        @endphp
        
        <style>
            :root {
                --primary-color: {{ $branding->primary_color ?? '#3B82F6' }};
                --secondary-color: {{ $branding->secondary_color ?? '#10B981' }};
                --accent-color: {{ $branding->accent_color ?? '#F59E0B' }};
                --background-color: {{ $branding->background_color ?? '#FFFFFF' }};
                --text-color: {{ $branding->text_color ?? '#111827' }};
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
    <body class="font-sans antialiased theme-{{ $branding->theme ?? 'light' }}">
        @inertia
    </body>
</html>
