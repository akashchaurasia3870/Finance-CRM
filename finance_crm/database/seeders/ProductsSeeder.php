<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Investment', 'Insurance', 'Loan', 'Savings', 'Credit'];
        
        for ($i = 1; $i <= 15; $i++) {
            Product::create([
                'name' => 'Product ' . $i,
                'description' => 'Description for product ' . $i,
                'category' => $categories[array_rand($categories)],
                'price' => rand(100, 5000),
                'status' => rand(0, 1) ? 'active' : 'inactive',
            ]);
        }
    }
}