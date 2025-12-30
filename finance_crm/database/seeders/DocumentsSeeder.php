<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Documents;

class DocumentsSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['pdf', 'doc', 'xlsx', 'jpg', 'png'];
        
        for ($i = 1; $i <= 15; $i++) {
            $type = $types[array_rand($types)];
            Documents::create([
                'name' => 'Document ' . $i,
                'file_path' => '/documents/document_' . $i . '.' . $type,
                'file_type' => $type,
                'file_size' => rand(1024, 1048576),
                'description' => 'Description for document ' . $i,
                'user_id' => 1,
            ]);
        }
    }
}