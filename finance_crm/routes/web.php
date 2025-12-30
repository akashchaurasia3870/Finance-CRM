<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BondController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CampaignsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ComplainController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\ForexController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\MarginController;
use App\Http\Controllers\MeetingsController;
use App\Http\Controllers\MutualFundsController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\TargetController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // User Module Routes
    Route::get('/user', fn() => Inertia::render('Modules/User/View'))->name('user.view');
    Route::get('/user/detail', fn() => Inertia::render('Modules/User/Detail'))->name('user.detail');
    Route::get('/user/edit', fn() => Inertia::render('Modules/User/Edit'))->name('user.edit');
    Route::prefix('api/user')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });
    
    // Accounts Module Routes
    Route::get('/accounts', fn() => Inertia::render('Modules/Accounts/View'))->name('accounts.view');
    Route::get('/accounts/detail', fn() => Inertia::render('Modules/Accounts/Detail'))->name('accounts.detail');
    Route::get('/accounts/edit', fn() => Inertia::render('Modules/Accounts/Edit'))->name('accounts.edit');
    Route::prefix('api/accounts')->group(function () {
        Route::get('/', [AccountsController::class, 'index']);
        Route::get('/{id}', [AccountsController::class, 'show']);
        Route::post('/', [AccountsController::class, 'store']);
        Route::put('/{id}', [AccountsController::class, 'update']);
        Route::delete('/{id}', [AccountsController::class, 'destroy']);
    });
    
    // Attendance Module Routes
    Route::get('/attendance', fn() => Inertia::render('Modules/Attendance/View'))->name('attendance.view');
    Route::get('/attendance/detail', fn() => Inertia::render('Modules/Attendance/Detail'))->name('attendance.detail');
    Route::get('/attendance/edit', fn() => Inertia::render('Modules/Attendance/Edit'))->name('attendance.edit');
    Route::prefix('api/attendance')->group(function () {
        Route::get('/', [AttendanceController::class, 'index']);
        Route::get('/{id}', [AttendanceController::class, 'show']);
        Route::post('/', [AttendanceController::class, 'store']);
        Route::put('/{id}', [AttendanceController::class, 'update']);
        Route::delete('/{id}', [AttendanceController::class, 'destroy']);
    });
    
    // Calendar Module Routes
    Route::get('/calendar', fn() => Inertia::render('Modules/Calendar/View'))->name('calendar.view');
    Route::get('/calendar/detail', fn() => Inertia::render('Modules/Calendar/Detail'))->name('calendar.detail');
    Route::get('/calendar/edit', fn() => Inertia::render('Modules/Calendar/Edit'))->name('calendar.edit');
    Route::prefix('api/calendar')->group(function () {
        Route::get('/', [CalendarController::class, 'index']);
        Route::get('/{id}', [CalendarController::class, 'show']);
        Route::post('/', [CalendarController::class, 'store']);
        Route::put('/{id}', [CalendarController::class, 'update']);
        Route::delete('/{id}', [CalendarController::class, 'destroy']);
    });
    
    // Campaigns Module Routes
    Route::get('/campaigns', fn() => Inertia::render('Modules/Campaigns/View'))->name('campaigns.view');
    Route::get('/campaigns/detail', fn() => Inertia::render('Modules/Campaigns/Detail'))->name('campaigns.detail');
    Route::get('/campaigns/edit', fn() => Inertia::render('Modules/Campaigns/Edit'))->name('campaigns.edit');
    Route::prefix('api/campaigns')->group(function () {
        Route::get('/', [CampaignsController::class, 'index']);
        Route::get('/{id}', [CampaignsController::class, 'show']);
        Route::post('/', [CampaignsController::class, 'store']);
        Route::put('/{id}', [CampaignsController::class, 'update']);
        Route::delete('/{id}', [CampaignsController::class, 'destroy']);
    });
    
    // Client Module Routes
    Route::get('/client', fn() => Inertia::render('Modules/Client/View'))->name('client.view');
    Route::get('/client/detail', fn() => Inertia::render('Modules/Client/Detail'))->name('client.detail');
    Route::get('/client/edit', fn() => Inertia::render('Modules/Client/Edit'))->name('client.edit');
    Route::prefix('api/client')->group(function () {
        Route::get('/', [ClientController::class, 'index']);
        Route::get('/{id}', [ClientController::class, 'show']);
        Route::post('/', [ClientController::class, 'store']);
        Route::put('/{id}', [ClientController::class, 'update']);
        Route::delete('/{id}', [ClientController::class, 'destroy']);
    });
    
    // Complain Module Routes
    Route::get('/complain', fn() => Inertia::render('Modules/Complain/View'))->name('complain.view');
    Route::get('/complain/detail', fn() => Inertia::render('Modules/Complain/Detail'))->name('complain.detail');
    Route::get('/complain/edit', fn() => Inertia::render('Modules/Complain/Edit'))->name('complain.edit');
    Route::prefix('api/complain')->group(function () {
        Route::get('/', [ComplainController::class, 'index']);
        Route::get('/{id}', [ComplainController::class, 'show']);
        Route::post('/', [ComplainController::class, 'store']);
        Route::put('/{id}', [ComplainController::class, 'update']);
        Route::delete('/{id}', [ComplainController::class, 'destroy']);
    });
    
    // Documents Module Routes
    Route::get('/documents', fn() => Inertia::render('Modules/Documents/View'))->name('documents.view');
    Route::get('/documents/detail', fn() => Inertia::render('Modules/Documents/Detail'))->name('documents.detail');
    Route::get('/documents/edit', fn() => Inertia::render('Modules/Documents/Edit'))->name('documents.edit');
    Route::prefix('api/documents')->group(function () {
        Route::get('/', [DocumentsController::class, 'index']);
        Route::get('/{id}', [DocumentsController::class, 'show']);
        Route::post('/', [DocumentsController::class, 'store']);
        Route::put('/{id}', [DocumentsController::class, 'update']);
        Route::delete('/{id}', [DocumentsController::class, 'destroy']);
    });
    
    // Email Module Routes
    Route::get('/email', fn() => Inertia::render('Modules/Email/View'))->name('email.view');
    Route::get('/email/detail', fn() => Inertia::render('Modules/Email/Detail'))->name('email.detail');
    Route::get('/email/edit', fn() => Inertia::render('Modules/Email/Edit'))->name('email.edit');
    Route::prefix('api/email')->group(function () {
        Route::get('/', [EmailController::class, 'index']);
        Route::get('/{id}', [EmailController::class, 'show']);
        Route::post('/', [EmailController::class, 'store']);
        Route::put('/{id}', [EmailController::class, 'update']);
        Route::delete('/{id}', [EmailController::class, 'destroy']);
    });
    
    // EmailTemplate Module Routes
    Route::get('/emailtemplate', fn() => Inertia::render('Modules/EmailTemplate/View'))->name('emailtemplate.view');
    Route::get('/emailtemplate/detail', fn() => Inertia::render('Modules/EmailTemplate/Detail'))->name('emailtemplate.detail');
    Route::get('/emailtemplate/edit', fn() => Inertia::render('Modules/EmailTemplate/Edit'))->name('emailtemplate.edit');
    Route::prefix('api/emailtemplate')->group(function () {
        Route::get('/', [EmailTemplateController::class, 'index']);
        Route::get('/{id}', [EmailTemplateController::class, 'show']);
        Route::post('/', [EmailTemplateController::class, 'store']);
        Route::put('/{id}', [EmailTemplateController::class, 'update']);
        Route::delete('/{id}', [EmailTemplateController::class, 'destroy']);
    });
    
    // Home Module Routes
    Route::get('/home', fn() => Inertia::render('Modules/Home/View'))->name('home.view');
    Route::get('/home/detail', fn() => Inertia::render('Modules/Home/Detail'))->name('home.detail');
    Route::get('/home/edit', fn() => Inertia::render('Modules/Home/Edit'))->name('home.edit');
    Route::prefix('api/home')->group(function () {
        Route::get('/', [HomeController::class, 'index']);
        Route::get('/{id}', [HomeController::class, 'show']);
        Route::post('/', [HomeController::class, 'store']);
        Route::put('/{id}', [HomeController::class, 'update']);
        Route::delete('/{id}', [HomeController::class, 'destroy']);
    });
    
    // Leads Module Routes
    Route::get('/leads', fn() => Inertia::render('Modules/Leads/View'))->name('leads.view');
    Route::get('/leads/detail', fn() => Inertia::render('Modules/Leads/Detail'))->name('leads.detail');
    Route::get('/leads/edit', fn() => Inertia::render('Modules/Leads/Edit'))->name('leads.edit');
    Route::prefix('api/leads')->group(function () {
        Route::get('/', [LeadsController::class, 'index']);
        Route::get('/{id}', [LeadsController::class, 'show']);
        Route::post('/', [LeadsController::class, 'store']);
        Route::put('/{id}', [LeadsController::class, 'update']);
        Route::delete('/{id}', [LeadsController::class, 'destroy']);
    });
    
    // Meetings Module Routes
    Route::get('/meetings', fn() => Inertia::render('Modules/Meetings/View'))->name('meetings.view');
    Route::get('/meetings/detail', fn() => Inertia::render('Modules/Meetings/Detail'))->name('meetings.detail');
    Route::get('/meetings/edit', fn() => Inertia::render('Modules/Meetings/Edit'))->name('meetings.edit');
    Route::prefix('api/meetings')->group(function () {
        Route::get('/', [MeetingsController::class, 'index']);
        Route::get('/{id}', [MeetingsController::class, 'show']);
        Route::post('/', [MeetingsController::class, 'store']);
        Route::put('/{id}', [MeetingsController::class, 'update']);
        Route::delete('/{id}', [MeetingsController::class, 'destroy']);
    });
    
    // Notes Module Routes
    Route::get('/notes', fn() => Inertia::render('Modules/Notes/View'))->name('notes.view');
    Route::get('/notes/detail', fn() => Inertia::render('Modules/Notes/Detail'))->name('notes.detail');
    Route::get('/notes/edit', fn() => Inertia::render('Modules/Notes/Edit'))->name('notes.edit');
    Route::prefix('api/notes')->group(function () {
        Route::get('/', [NotesController::class, 'index']);
        Route::get('/{id}', [NotesController::class, 'show']);
        Route::post('/', [NotesController::class, 'store']);
        Route::put('/{id}', [NotesController::class, 'update']);
        Route::delete('/{id}', [NotesController::class, 'destroy']);
    });
    
    // Payroll Module Routes
    Route::get('/payroll', fn() => Inertia::render('Modules/Payroll/View'))->name('payroll.view');
    Route::get('/payroll/detail', fn() => Inertia::render('Modules/Payroll/Detail'))->name('payroll.detail');
    Route::get('/payroll/edit', fn() => Inertia::render('Modules/Payroll/Edit'))->name('payroll.edit');
    Route::prefix('api/payroll')->group(function () {
        Route::get('/', [PayrollController::class, 'index']);
        Route::get('/{id}', [PayrollController::class, 'show']);
        Route::post('/', [PayrollController::class, 'store']);
        Route::put('/{id}', [PayrollController::class, 'update']);
        Route::delete('/{id}', [PayrollController::class, 'destroy']);
    });
    
    // Portfolio Module Routes
    Route::get('/portfolio', fn() => Inertia::render('Modules/Portfolio/View'))->name('portfolio.view');
    Route::get('/portfolio/detail', fn() => Inertia::render('Modules/Portfolio/Detail'))->name('portfolio.detail');
    Route::get('/portfolio/edit', fn() => Inertia::render('Modules/Portfolio/Edit'))->name('portfolio.edit');
    Route::prefix('api/portfolio')->group(function () {
        Route::get('/', [PortfolioController::class, 'index']);
        Route::get('/{id}', [PortfolioController::class, 'show']);
        Route::post('/', [PortfolioController::class, 'store']);
        Route::put('/{id}', [PortfolioController::class, 'update']);
        Route::delete('/{id}', [PortfolioController::class, 'destroy']);
    });
    
    // Position Module Routes
    Route::get('/position', fn() => Inertia::render('Modules/Position/View'))->name('position.view');
    Route::get('/position/detail', fn() => Inertia::render('Modules/Position/Detail'))->name('position.detail');
    Route::get('/position/edit', fn() => Inertia::render('Modules/Position/Edit'))->name('position.edit');
    Route::prefix('api/position')->group(function () {
        Route::get('/', [PositionController::class, 'index']);
        Route::get('/{id}', [PositionController::class, 'show']);
        Route::post('/', [PositionController::class, 'store']);
        Route::put('/{id}', [PositionController::class, 'update']);
        Route::delete('/{id}', [PositionController::class, 'destroy']);
    });
    
    // Product Module Routes
    Route::get('/product', fn() => Inertia::render('Modules/Product/View'))->name('product.view');
    Route::get('/product/detail', fn() => Inertia::render('Modules/Product/Detail'))->name('product.detail');
    Route::get('/product/edit', fn() => Inertia::render('Modules/Product/Edit'))->name('product.edit');
    Route::prefix('api/product')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::get('/{id}', [ProductController::class, 'show']);
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });
    
    // Reports Module Routes
    Route::get('/reports', fn() => Inertia::render('Modules/Reports/View'))->name('reports.view');
    Route::get('/reports/detail', fn() => Inertia::render('Modules/Reports/Detail'))->name('reports.detail');
    Route::get('/reports/edit', fn() => Inertia::render('Modules/Reports/Edit'))->name('reports.edit');
    Route::prefix('api/reports')->group(function () {
        Route::get('/', [ReportsController::class, 'index']);
        Route::get('/{id}', [ReportsController::class, 'show']);
        Route::post('/', [ReportsController::class, 'store']);
        Route::put('/{id}', [ReportsController::class, 'update']);
        Route::delete('/{id}', [ReportsController::class, 'destroy']);
    });
    
    // Role Module Routes
    Route::get('/role', fn() => Inertia::render('Modules/Role/View'))->name('role.view');
    Route::get('/role/detail', fn() => Inertia::render('Modules/Role/Detail'))->name('role.detail');
    Route::get('/role/edit', fn() => Inertia::render('Modules/Role/Edit'))->name('role.edit');
    Route::prefix('api/role')->group(function () {
        Route::get('/', [RoleController::class, 'index']);
        Route::get('/{id}', [RoleController::class, 'show']);
        Route::post('/', [RoleController::class, 'store']);
        Route::put('/{id}', [RoleController::class, 'update']);
        Route::delete('/{id}', [RoleController::class, 'destroy']);
    });
    
    // Survey Module Routes
    Route::get('/survey', fn() => Inertia::render('Modules/Survey/View'))->name('survey.view');
    Route::get('/survey/detail', fn() => Inertia::render('Modules/Survey/Detail'))->name('survey.detail');
    Route::get('/survey/edit', fn() => Inertia::render('Modules/Survey/Edit'))->name('survey.edit');
    Route::prefix('api/survey')->group(function () {
        Route::get('/', [SurveyController::class, 'index']);
        Route::get('/{id}', [SurveyController::class, 'show']);
        Route::post('/', [SurveyController::class, 'store']);
        Route::put('/{id}', [SurveyController::class, 'update']);
        Route::delete('/{id}', [SurveyController::class, 'destroy']);
    });
    
    // Target Module Routes
    Route::get('/target', fn() => Inertia::render('Modules/Target/View'))->name('target.view');
    Route::get('/target/detail', fn() => Inertia::render('Modules/Target/Detail'))->name('target.detail');
    Route::get('/target/edit', fn() => Inertia::render('Modules/Target/Edit'))->name('target.edit');
    Route::prefix('api/target')->group(function () {
        Route::get('/', [TargetController::class, 'index']);
        Route::get('/{id}', [TargetController::class, 'show']);
        Route::post('/', [TargetController::class, 'store']);
        Route::put('/{id}', [TargetController::class, 'update']);
        Route::delete('/{id}', [TargetController::class, 'destroy']);
    });
    
    // Tasks Module Routes
    Route::get('/tasks', fn() => Inertia::render('Modules/Tasks/View'))->name('tasks.view');
    Route::get('/tasks/detail', fn() => Inertia::render('Modules/Tasks/Detail'))->name('tasks.detail');
    Route::get('/tasks/edit', fn() => Inertia::render('Modules/Tasks/Edit'))->name('tasks.edit');
    Route::prefix('api/tasks')->group(function () {
        Route::get('/', [TasksController::class, 'index']);
        Route::get('/{id}', [TasksController::class, 'show']);
        Route::post('/', [TasksController::class, 'store']);
        Route::put('/{id}', [TasksController::class, 'update']);
        Route::delete('/{id}', [TasksController::class, 'destroy']);
    });
    
    // Product Sub-module Routes
    // Bond Module Routes
    Route::get('/bond', fn() => Inertia::render('Modules/Product/Bond/View'))->name('bond.view');
    Route::get('/bond/detail', fn() => Inertia::render('Modules/Product/Bond/Detail'))->name('bond.detail');
    Route::get('/bond/edit', fn() => Inertia::render('Modules/Product/Bond/Edit'))->name('bond.edit');
    Route::prefix('api/bond')->group(function () {
        Route::get('/', [BondController::class, 'index']);
        Route::get('/{id}', [BondController::class, 'show']);
        Route::post('/', [BondController::class, 'store']);
        Route::put('/{id}', [BondController::class, 'update']);
        Route::delete('/{id}', [BondController::class, 'destroy']);
    });
    
    // Forex Module Routes
    Route::get('/forex', fn() => Inertia::render('Modules/Product/Forex/View'))->name('forex.view');
    Route::get('/forex/detail', fn() => Inertia::render('Modules/Product/Forex/Detail'))->name('forex.detail');
    Route::get('/forex/edit', fn() => Inertia::render('Modules/Product/Forex/Edit'))->name('forex.edit');
    Route::prefix('api/forex')->group(function () {
        Route::get('/', [ForexController::class, 'index']);
        Route::get('/{id}', [ForexController::class, 'show']);
        Route::post('/', [ForexController::class, 'store']);
        Route::put('/{id}', [ForexController::class, 'update']);
        Route::delete('/{id}', [ForexController::class, 'destroy']);
    });
    
    // Loan Module Routes
    Route::get('/loan', fn() => Inertia::render('Modules/Product/Loan/View'))->name('loan.view');
    Route::get('/loan/detail', fn() => Inertia::render('Modules/Product/Loan/Detail'))->name('loan.detail');
    Route::get('/loan/edit', fn() => Inertia::render('Modules/Product/Loan/Edit'))->name('loan.edit');
    Route::prefix('api/loan')->group(function () {
        Route::get('/', [LoanController::class, 'index']);
        Route::get('/{id}', [LoanController::class, 'show']);
        Route::post('/', [LoanController::class, 'store']);
        Route::put('/{id}', [LoanController::class, 'update']);
        Route::delete('/{id}', [LoanController::class, 'destroy']);
    });
    
    // Margin Module Routes
    Route::get('/margin', fn() => Inertia::render('Modules/Product/Margin/View'))->name('margin.view');
    Route::get('/margin/detail', fn() => Inertia::render('Modules/Product/Margin/Detail'))->name('margin.detail');
    Route::get('/margin/edit', fn() => Inertia::render('Modules/Product/Margin/Edit'))->name('margin.edit');
    Route::prefix('api/margin')->group(function () {
        Route::get('/', [MarginController::class, 'index']);
        Route::get('/{id}', [MarginController::class, 'show']);
        Route::post('/', [MarginController::class, 'store']);
        Route::put('/{id}', [MarginController::class, 'update']);
        Route::delete('/{id}', [MarginController::class, 'destroy']);
    });
    
    // MutualFunds Module Routes
    Route::get('/mutualfunds', fn() => Inertia::render('Modules/Product/MutualFunds/View'))->name('mutualfunds.view');
    Route::get('/mutualfunds/detail', fn() => Inertia::render('Modules/Product/MutualFunds/Detail'))->name('mutualfunds.detail');
    Route::get('/mutualfunds/edit', fn() => Inertia::render('Modules/Product/MutualFunds/Edit'))->name('mutualfunds.edit');
    Route::prefix('api/mutualfunds')->group(function () {
        Route::get('/', [MutualFundsController::class, 'index']);
        Route::get('/{id}', [MutualFundsController::class, 'show']);
        Route::post('/', [MutualFundsController::class, 'store']);
        Route::put('/{id}', [MutualFundsController::class, 'update']);
        Route::delete('/{id}', [MutualFundsController::class, 'destroy']);
    });
    
    // Stock Module Routes
    Route::get('/stock', fn() => Inertia::render('Modules/Product/Stock/View'))->name('stock.view');
    Route::get('/stock/detail', fn() => Inertia::render('Modules/Product/Stock/Detail'))->name('stock.detail');
    Route::get('/stock/edit', fn() => Inertia::render('Modules/Product/Stock/Edit'))->name('stock.edit');
    Route::prefix('api/stock')->group(function () {
        Route::get('/', [StockController::class, 'index']);
        Route::get('/{id}', [StockController::class, 'show']);
        Route::post('/', [StockController::class, 'store']);
        Route::put('/{id}', [StockController::class, 'update']);
        Route::delete('/{id}', [StockController::class, 'destroy']);
    });
});

require __DIR__.'/auth.php';
