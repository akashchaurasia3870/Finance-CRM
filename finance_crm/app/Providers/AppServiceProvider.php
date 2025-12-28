<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $models = [
        'User',
        'Product',
        'Order',
        // Add all your model names here
    ];

    foreach ($models as $model) {
        $this->app->bind(
            "App\Interfaces\\{$model}RepositoryInterface",
            "App\Repositories\\{$model}Repository"
        );
    }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
