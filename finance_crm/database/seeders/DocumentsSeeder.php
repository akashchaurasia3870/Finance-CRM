<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Documents;
use App\Models\User;

class DocumentsSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        
        $documents = [
            [
                'name' => 'Company Policy Document',
                'file_path' => 'documents/company_policy.pdf',
                'file_type' => 'pdf',
                'file_size' => 1024000,
                'description' => 'Official company policy and procedures document',
                'is_active' => true,
            ],
            [
                'name' => 'Financial Report Q4',
                'file_path' => 'documents/financial_report_q4.xlsx',
                'file_type' => 'xlsx',
                'file_size' => 512000,
                'description' => 'Quarterly financial report for Q4',
                'is_active' => true,
            ],
            [
                'name' => 'Employee Handbook',
                'file_path' => 'documents/employee_handbook.docx',
                'file_type' => 'docx',
                'file_size' => 768000,
                'description' => 'Complete employee handbook and guidelines',
                'is_active' => true,
            ],
            [
                'name' => 'Project Proposal',
                'file_path' => 'documents/project_proposal.pdf',
                'file_type' => 'pdf',
                'file_size' => 2048000,
                'description' => 'New project proposal and requirements',
                'is_active' => true,
            ],
            [
                'name' => 'Training Materials',
                'file_path' => 'documents/training_materials.pptx',
                'file_type' => 'pptx',
                'file_size' => 3072000,
                'description' => 'Employee training presentation materials',
                'is_active' => false,
            ],
        ];
        
        foreach ($documents as $documentData) {
            if ($users->isNotEmpty()) {
                $creator = $users->random();
                $owner = $users->random();
                $documentData['created_by'] = $creator->id;
                $documentData['owned_by'] = $owner->id;
            }
            Documents::create($documentData);
        }
    }
}