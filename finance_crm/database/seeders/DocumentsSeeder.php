<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Documents;

class DocumentsSeeder extends Seeder
{
    public function run(): void
    {
        $fileTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png'];
        
        for ($i = 1; $i <= 15; $i++) {
            $fileType = $fileTypes[array_rand($fileTypes)];
            
            Documents::create([
                'created_by' => rand(1, 5),
                'owned_by' => rand(1, 5),
                'name' => 'Document ' . $i . '.' . $fileType,
                'file_path' => '/documents/document_' . $i . '.' . $fileType,
                'file_type' => $fileType,
                'file_size' => rand(1024, 5242880), // 1KB to 5MB
                'description' => 'Description for document ' . $i,
                'is_active' => rand(0, 1),
            ]);
        }
    }
}