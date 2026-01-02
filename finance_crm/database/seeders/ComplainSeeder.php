<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Complain;
use App\Models\Client;
use App\Models\User;

class ComplainSeeder extends Seeder
{
    public function run(): void
    {
        $priorities = ['low', 'medium', 'high'];
        $statuses = ['open', 'in_progress', 'resolved', 'closed'];
        $sources = ['Phone', 'Email', 'Website', 'In-Person', 'Social Media'];
        
        // Get some clients and users for relationships
        $clients = Client::limit(5)->get();
        $users = User::limit(3)->get();
        
        for ($i = 1; $i <= 15; $i++) {
            $status = $statuses[array_rand($statuses)];
            $resolvedAt = null;
            $resolutionNotes = null;
            
            // If status is resolved or closed, add resolution data
            if (in_array($status, ['resolved', 'closed'])) {
                $resolvedAt = now()->subDays(rand(1, 30));
                $resolutionNotes = 'Issue resolved through ' . $sources[array_rand($sources)] . ' communication.';
            }
            
            Complain::create([
                'title' => 'Complaint #' . str_pad($i, 3, '0', STR_PAD_LEFT) . ' - ' . ['Service Issue', 'Product Defect', 'Billing Problem', 'Delivery Delay', 'Quality Concern'][array_rand(['Service Issue', 'Product Defect', 'Billing Problem', 'Delivery Delay', 'Quality Concern'])],
                'description' => 'Detailed description for complaint ' . $i . '. This complaint involves various issues that need to be addressed promptly to ensure customer satisfaction.',
                'client_id' => $clients->isNotEmpty() ? $clients->random()->id : null,
                'complainant_name' => 'Customer ' . $i,
                'complainant_email' => 'customer' . $i . '@example.com',
                'complainant_phone' => '+1-555-' . str_pad($i * 100, 4, '0', STR_PAD_LEFT),
                'priority' => $priorities[array_rand($priorities)],
                'status' => $status,
                'assigned_to' => $users->isNotEmpty() && rand(0, 1) ? $users->random()->id : null,
                'resolved_at' => $resolvedAt,
                'resolution_notes' => $resolutionNotes,
                'source' => $sources[array_rand($sources)],
                'created_by' => $users->isNotEmpty() ? $users->random()->id : null,
                'created_at' => now()->subDays(rand(1, 60)),
                'updated_at' => now()->subDays(rand(0, 30)),
            ]);
        }
    }
}