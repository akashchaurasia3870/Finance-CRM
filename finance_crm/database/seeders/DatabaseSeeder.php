<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            // Core Seeders
            UserSeeder::class,
            RoleSeeder::class,
            AddressSeeder::class,
            ClientsSeeder::class,
            LeadsSeeder::class,
            TasksSeeder::class,
            NotesSeeder::class,
            MeetingsSeeder::class,
            CalendarSeeder::class,
            CampaignsSeeder::class,
            EmailSeeder::class,
            EmailTemplateSeeder::class,
            SurveySeeder::class,
            TargetSeeder::class,
            AttendanceSeeder::class,
            PayrollSeeder::class,
            ComplainSeeder::class,
            DocumentsSeeder::class,
            HomeSeeder::class,
            
            // Finance Seeders
            ProductsSeeder::class,
            AccountsSeeder::class,
            PortfolioSeeder::class,
            SecurityPositionSeeder::class,
            TransactionSeeder::class,
            ReportsSeeder::class,
            
            // Product Sub-module Seeders
            StocksSeeder::class,
            BondsSeeder::class,
            ForexSeeder::class,
            LoanSeeder::class,
            MarginSeeder::class,
            MutualFundsSeeder::class,
        ]);
    }
}
