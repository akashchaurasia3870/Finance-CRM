<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\AccountsWebController;
use App\Http\Controllers\AddressWebController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\AttendanceWebController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BondController;
use App\Http\Controllers\CalendarWebController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CampaignsWebController;
use App\Http\Controllers\CampaignsController;
use App\Http\Controllers\ClientWebController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ComplainWebController;
use App\Http\Controllers\ComplainController;
use App\Http\Controllers\DocumentsWebController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\EmailWebController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\EmailTemplateWebController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\ForexController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeadsWebController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\MarginController;
use App\Http\Controllers\MeetingsWebController;
use App\Http\Controllers\MeetingsController;
use App\Http\Controllers\MutualFundsController;
use App\Http\Controllers\NotesWebController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\PayrollWebController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\PortfolioWebController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\SecurityPositionWebController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProductWebController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\RoleWebController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SurveyWebController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\TargetWebController;
use App\Http\Controllers\TargetController;
use App\Http\Controllers\TasksWebController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionWebController;
use App\Http\Controllers\UserWebController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SettingsWebController;
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
    
    // Address Module Routes
    Route::get('/address', [AddressWebController::class, 'index'])->name('address.view');
    Route::get('/address/new', [AddressWebController::class, 'create'])->name('address.new');
    Route::post('/address', [AddressWebController::class, 'store']);
    Route::get('/address/{id}', [AddressWebController::class, 'show'])->name('address.detail');
    Route::get('/address/{id}/edit', [AddressWebController::class, 'edit'])->name('address.edit');
    Route::put('/address/{id}', [AddressWebController::class, 'update']);
    Route::delete('/address/{id}', [AddressWebController::class, 'destroy']);
    
    Route::prefix('api/address')->group(function () {
        Route::get('/', [AddressController::class, 'index']);
        Route::get('/{id}', [AddressController::class, 'show']);
        Route::post('/', [AddressController::class, 'store']);
        Route::put('/{id}', [AddressController::class, 'update']);
        Route::delete('/{id}', [AddressController::class, 'destroy']);
    });
    
    // User Module Routes
    Route::get('/user', [UserWebController::class, 'index'])->name('user.view');
    Route::get('/user/new', [UserWebController::class, 'create'])->name('user.new');
    Route::post('/user', [UserWebController::class, 'store']);
    Route::get('/user/{id}', [UserWebController::class, 'show'])->name('user.detail');
    Route::get('/user/{id}/edit', [UserWebController::class, 'edit'])->name('user.edit');
    Route::put('/user/{id}', [UserWebController::class, 'update']);
    Route::delete('/user/{id}', [UserWebController::class, 'destroy']);
    
    Route::prefix('api/user')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });
    
    // Accounts Module Routes
    Route::get('/accounts', [AccountsWebController::class, 'index'])->name('accounts.view');
    Route::get('/accounts/new', [AccountsWebController::class, 'create'])->name('accounts.new');
    Route::post('/accounts', [AccountsWebController::class, 'store']);
    Route::get('/accounts/{id}', [AccountsWebController::class, 'show'])->name('accounts.detail');
    Route::get('/accounts/{id}/edit', [AccountsWebController::class, 'edit'])->name('accounts.edit');
    Route::put('/accounts/{id}', [AccountsWebController::class, 'update']);
    Route::delete('/accounts/{id}', [AccountsWebController::class, 'destroy']);
    
    Route::prefix('api/accounts')->group(function () {
        Route::get('/', [AccountsController::class, 'index']);
        Route::get('/{id}', [AccountsController::class, 'show']);
        Route::post('/', [AccountsController::class, 'store']);
        Route::put('/{id}', [AccountsController::class, 'update']);
        Route::delete('/{id}', [AccountsController::class, 'destroy']);
    });
    
    // Attendance Module Routes
    Route::get('/attendance', [AttendanceWebController::class, 'index'])->name('attendance.view');
    Route::get('/attendance/new', [AttendanceWebController::class, 'create'])->name('attendance.new');
    Route::post('/attendance', [AttendanceWebController::class, 'store']);
    Route::get('/attendance/{id}', [AttendanceWebController::class, 'show'])->name('attendance.detail');
    Route::get('/attendance/{id}/edit', [AttendanceWebController::class, 'edit'])->name('attendance.edit');
    Route::put('/attendance/{id}', [AttendanceWebController::class, 'update']);
    Route::delete('/attendance/{id}', [AttendanceWebController::class, 'destroy']);
    
    Route::prefix('api/attendance')->group(function () {
        Route::get('/', [AttendanceController::class, 'index']);
        Route::get('/{id}', [AttendanceController::class, 'show']);
        Route::post('/', [AttendanceController::class, 'store']);
        Route::put('/{id}', [AttendanceController::class, 'update']);
        Route::delete('/{id}', [AttendanceController::class, 'destroy']);
    });
    
    // Calendar Module Routes
    Route::get('/calendar/calendar-view', [CalendarWebController::class, 'calendarView'])->name('calendar.calendar-view');
    Route::get('/calendar/reports', [CalendarWebController::class, 'reports'])->name('calendar.reports');
    Route::get('/calendar', [CalendarWebController::class, 'index'])->name('calendar.view');
    Route::get('/calendar/new', [CalendarWebController::class, 'create'])->name('calendar.new');
    Route::post('/calendar', [CalendarWebController::class, 'store']);
    Route::get('/calendar/{id}', [CalendarWebController::class, 'show'])->name('calendar.detail');
    Route::get('/calendar/{id}/edit', [CalendarWebController::class, 'edit'])->name('calendar.edit');
    Route::put('/calendar/{id}', [CalendarWebController::class, 'update']);
    Route::delete('/calendar/{id}', [CalendarWebController::class, 'destroy']);
    Route::post('/calendar/{id}/notes', [CalendarWebController::class, 'addNote']);
    
    Route::prefix('api/calendar')->group(function () {
        Route::get('/', [CalendarController::class, 'index']);
        Route::get('/{id}', [CalendarController::class, 'show']);
        Route::post('/', [CalendarController::class, 'store']);
        Route::put('/{id}', [CalendarController::class, 'update']);
        Route::delete('/{id}', [CalendarController::class, 'destroy']);
    });
    
    // Campaigns Module Routes
    Route::get('/campaigns', [CampaignsWebController::class, 'index'])->name('campaigns.view');
    Route::get('/campaigns/new', [CampaignsWebController::class, 'create'])->name('campaigns.new');
    Route::post('/campaigns', [CampaignsWebController::class, 'store']);
    Route::get('/campaigns/{id}', [CampaignsWebController::class, 'show'])->name('campaigns.detail');
    Route::get('/campaigns/{id}/edit', [CampaignsWebController::class, 'edit'])->name('campaigns.edit');
    Route::put('/campaigns/{id}', [CampaignsWebController::class, 'update']);
    Route::delete('/campaigns/{id}', [CampaignsWebController::class, 'destroy']);
    
    Route::prefix('api/campaigns')->group(function () {
        Route::get('/', [CampaignsController::class, 'index']);
        Route::get('/{id}', [CampaignsController::class, 'show']);
        Route::post('/', [CampaignsController::class, 'store']);
        Route::put('/{id}', [CampaignsController::class, 'update']);
        Route::delete('/{id}', [CampaignsController::class, 'destroy']);
    });
    
    // Client Module Routes
    Route::get('/client', [ClientWebController::class, 'index'])->name('client.view');
    Route::get('/client/new', [ClientWebController::class, 'create'])->name('client.new');
    Route::post('/client', [ClientWebController::class, 'store']);
    Route::get('/client/{id}', [ClientWebController::class, 'show'])->name('client.detail');
    Route::get('/client/{id}/edit', [ClientWebController::class, 'edit'])->name('client.edit');
    Route::put('/client/{id}', [ClientWebController::class, 'update']);
    Route::delete('/client/{id}', [ClientWebController::class, 'destroy']);
    
    Route::prefix('api/client')->group(function () {
        Route::get('/', [ClientController::class, 'index']);
        Route::get('/{id}', [ClientController::class, 'show']);
        Route::post('/', [ClientController::class, 'store']);
        Route::put('/{id}', [ClientController::class, 'update']);
        Route::delete('/{id}', [ClientController::class, 'destroy']);
    });
    
    // Complain Module Routes
    Route::get('/complain', [ComplainWebController::class, 'index'])->name('complain.view');
    Route::get('/complain/new', [ComplainWebController::class, 'create'])->name('complain.new');
    Route::post('/complain', [ComplainWebController::class, 'store']);
    Route::get('/complain/{id}', [ComplainWebController::class, 'show'])->name('complain.detail');
    Route::get('/complain/{id}/edit', [ComplainWebController::class, 'edit'])->name('complain.edit');
    Route::put('/complain/{id}', [ComplainWebController::class, 'update']);
    Route::delete('/complain/{id}', [ComplainWebController::class, 'destroy']);
    
    Route::prefix('api/complain')->group(function () {
        Route::get('/', [ComplainController::class, 'index']);
        Route::get('/{id}', [ComplainController::class, 'show']);
        Route::post('/', [ComplainController::class, 'store']);
        Route::put('/{id}', [ComplainController::class, 'update']);
        Route::delete('/{id}', [ComplainController::class, 'destroy']);
    });
    
    // Documents Module Routes
    Route::get('/documents', [DocumentsWebController::class, 'index'])->name('documents.view');
    Route::get('/documents/new', [DocumentsWebController::class, 'create'])->name('documents.new');
    Route::post('/documents', [DocumentsWebController::class, 'store']);
    Route::get('/documents/{id}', [DocumentsWebController::class, 'show'])->name('documents.detail');
    Route::get('/documents/{id}/edit', [DocumentsWebController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{id}', [DocumentsWebController::class, 'update']);
    Route::delete('/documents/{id}', [DocumentsWebController::class, 'destroy']);
    
    Route::prefix('api/documents')->group(function () {
        Route::get('/', [DocumentsController::class, 'index']);
        Route::get('/{id}', [DocumentsController::class, 'show']);
        Route::post('/', [DocumentsController::class, 'store']);
        Route::put('/{id}', [DocumentsController::class, 'update']);
        Route::delete('/{id}', [DocumentsController::class, 'destroy']);
    });
    
    // Email Module Routes
    Route::get('/email', [EmailWebController::class, 'index'])->name('email.view');
    Route::get('/email/new', [EmailWebController::class, 'create'])->name('email.new');
    Route::post('/email', [EmailWebController::class, 'store']);
    Route::get('/email/{id}', [EmailWebController::class, 'show'])->name('email.detail');
    Route::get('/email/{id}/edit', [EmailWebController::class, 'edit'])->name('email.edit');
    Route::put('/email/{id}', [EmailWebController::class, 'update']);
    Route::delete('/email/{id}', [EmailWebController::class, 'destroy']);
    
    Route::prefix('api/email')->group(function () {
        Route::get('/', [EmailController::class, 'index']);
        Route::get('/{id}', [EmailController::class, 'show']);
        Route::post('/', [EmailController::class, 'store']);
        Route::put('/{id}', [EmailController::class, 'update']);
        Route::delete('/{id}', [EmailController::class, 'destroy']);
    });
    
    // EmailTemplate Module Routes
    Route::get('/emailtemplate', [EmailTemplateWebController::class, 'index'])->name('emailtemplate.view');
    Route::get('/emailtemplate/new', [EmailTemplateWebController::class, 'create'])->name('emailtemplate.new');
    Route::post('/emailtemplate', [EmailTemplateWebController::class, 'store']);
    Route::get('/emailtemplate/{id}', [EmailTemplateWebController::class, 'show'])->name('emailtemplate.detail');
    Route::get('/emailtemplate/{id}/edit', [EmailTemplateWebController::class, 'edit'])->name('emailtemplate.edit');
    Route::put('/emailtemplate/{id}', [EmailTemplateWebController::class, 'update']);
    Route::delete('/emailtemplate/{id}', [EmailTemplateWebController::class, 'destroy']);
    
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
    Route::get('/leads', [LeadsWebController::class, 'index'])->name('leads.view');
    Route::get('/leads/new', [LeadsWebController::class, 'create'])->name('leads.new');
    Route::post('/leads', [LeadsWebController::class, 'store']);
    Route::get('/leads/{id}', [LeadsWebController::class, 'show'])->name('leads.detail');
    Route::get('/leads/{id}/edit', [LeadsWebController::class, 'edit'])->name('leads.edit');
    Route::put('/leads/{id}', [LeadsWebController::class, 'update']);
    Route::delete('/leads/{id}', [LeadsWebController::class, 'destroy']);
    
    Route::prefix('api/leads')->group(function () {
        Route::get('/', [LeadsController::class, 'index']);
        Route::get('/{id}', [LeadsController::class, 'show']);
        Route::post('/', [LeadsController::class, 'store']);
        Route::put('/{id}', [LeadsController::class, 'update']);
        Route::delete('/{id}', [LeadsController::class, 'destroy']);
    });
    
    // Meetings Module Routes
    Route::get('/meetings', [MeetingsWebController::class, 'index'])->name('meetings.view');
    Route::get('/meetings/new', [MeetingsWebController::class, 'create'])->name('meetings.new');
    Route::post('/meetings', [MeetingsWebController::class, 'store']);
    Route::get('/meetings/{id}', [MeetingsWebController::class, 'show'])->name('meetings.detail');
    Route::get('/meetings/{id}/edit', [MeetingsWebController::class, 'edit'])->name('meetings.edit');
    Route::put('/meetings/{id}', [MeetingsWebController::class, 'update']);
    Route::delete('/meetings/{id}', [MeetingsWebController::class, 'destroy']);
    
    Route::post('/meetings/{id}/notes', [MeetingsWebController::class, 'addNote']);
    
    Route::prefix('api/meetings')->group(function () {
        Route::get('/', [MeetingsController::class, 'index']);
        Route::get('/{id}', [MeetingsController::class, 'show']);
        Route::post('/', [MeetingsController::class, 'store']);
        Route::put('/{id}', [MeetingsController::class, 'update']);
        Route::delete('/{id}', [MeetingsController::class, 'destroy']);
    });
    
    // Notes Module Routes
    Route::get('/notes', [NotesWebController::class, 'index'])->name('notes.view');
    Route::get('/notes/new', [NotesWebController::class, 'create'])->name('notes.new');
    Route::post('/notes', [NotesWebController::class, 'store']);
    Route::get('/notes/{id}', [NotesWebController::class, 'show'])->name('notes.detail');
    Route::get('/notes/{id}/edit', [NotesWebController::class, 'edit'])->name('notes.edit');
    Route::put('/notes/{id}', [NotesWebController::class, 'update']);
    Route::delete('/notes/{id}', [NotesWebController::class, 'destroy']);
    
    Route::prefix('api/notes')->group(function () {
        Route::get('/', [NotesController::class, 'index']);
        Route::get('/{id}', [NotesController::class, 'show']);
        Route::post('/', [NotesController::class, 'store']);
        Route::put('/{id}', [NotesController::class, 'update']);
        Route::delete('/{id}', [NotesController::class, 'destroy']);
    });
    
    // Payroll Module Routes
    Route::get('/payroll', [PayrollWebController::class, 'index'])->name('payroll.view');
    Route::get('/payroll/new', [PayrollWebController::class, 'create'])->name('payroll.new');
    Route::post('/payroll', [PayrollWebController::class, 'store']);
    Route::get('/payroll/{id}', [PayrollWebController::class, 'show'])->name('payroll.detail');
    Route::get('/payroll/{id}/edit', [PayrollWebController::class, 'edit'])->name('payroll.edit');
    Route::put('/payroll/{id}', [PayrollWebController::class, 'update']);
    Route::delete('/payroll/{id}', [PayrollWebController::class, 'destroy']);
    
    Route::prefix('api/payroll')->group(function () {
        Route::get('/', [PayrollController::class, 'index']);
        Route::get('/user/{userId}', [PayrollController::class, 'getByUser']);
        Route::get('/period/{period}', [PayrollController::class, 'getByPeriod']);
        Route::get('/pending', [PayrollController::class, 'getPendingApprovals']);
        Route::get('/{id}', [PayrollController::class, 'show']);
        Route::post('/', [PayrollController::class, 'store']);
        Route::put('/{id}', [PayrollController::class, 'update']);
        Route::delete('/{id}', [PayrollController::class, 'destroy']);
        Route::post('/{id}/approve', [PayrollController::class, 'approve']);
        Route::post('/{id}/mark-paid', [PayrollController::class, 'markPaid']);
    });
    
    // Portfolio Module Routes
    Route::get('/portfolio', [PortfolioWebController::class, 'index'])->name('portfolio.view');
    Route::get('/portfolio/new', [PortfolioWebController::class, 'create'])->name('portfolio.new');
    Route::post('/portfolio', [PortfolioWebController::class, 'store']);
    Route::get('/portfolio/{id}', [PortfolioWebController::class, 'show'])->name('portfolio.detail');
    Route::get('/portfolio/{id}/edit', [PortfolioWebController::class, 'edit'])->name('portfolio.edit');
    Route::put('/portfolio/{id}', [PortfolioWebController::class, 'update']);
    Route::delete('/portfolio/{id}', [PortfolioWebController::class, 'destroy']);
    
    Route::prefix('api/portfolio')->group(function () {
        Route::get('/', [PortfolioController::class, 'index']);
        Route::get('/{id}', [PortfolioController::class, 'show']);
        Route::post('/', [PortfolioController::class, 'store']);
        Route::put('/{id}', [PortfolioController::class, 'update']);
        Route::delete('/{id}', [PortfolioController::class, 'destroy']);
    });
    
    // Position Module Routes
    Route::get('/position', [SecurityPositionWebController::class, 'index'])->name('position.view');
    Route::get('/position/new', [SecurityPositionWebController::class, 'create'])->name('position.new');
    Route::post('/position', [SecurityPositionWebController::class, 'store']);
    Route::get('/position/{id}', [SecurityPositionWebController::class, 'show'])->name('position.detail');
    Route::get('/position/{id}/edit', [SecurityPositionWebController::class, 'edit'])->name('position.edit');
    Route::put('/position/{id}', [SecurityPositionWebController::class, 'update']);
    Route::delete('/position/{id}', [SecurityPositionWebController::class, 'destroy']);
    
    Route::prefix('api/position')->group(function () {
        Route::get('/', [PositionController::class, 'index']);
        Route::get('/{id}', [PositionController::class, 'show']);
        Route::post('/', [PositionController::class, 'store']);
        Route::put('/{id}', [PositionController::class, 'update']);
        Route::delete('/{id}', [PositionController::class, 'destroy']);
    });
    
    // Product Module Routes
    Route::get('/product', [ProductWebController::class, 'index'])->name('product.view');
    Route::get('/product/new', [ProductWebController::class, 'create'])->name('product.new');
    Route::post('/product', [ProductWebController::class, 'store']);
    Route::get('/product/{id}', [ProductWebController::class, 'show'])->name('product.detail');
    Route::get('/product/{id}/edit', [ProductWebController::class, 'edit'])->name('product.edit');
    Route::put('/product/{id}', [ProductWebController::class, 'update']);
    Route::delete('/product/{id}', [ProductWebController::class, 'destroy']);
    
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
    Route::get('/role', [RoleWebController::class, 'index'])->name('role.view');
    Route::get('/role/new', [RoleWebController::class, 'create'])->name('role.new');
    Route::post('/role', [RoleWebController::class, 'store']);
    Route::get('/role/{id}', [RoleWebController::class, 'show'])->name('role.detail');
    Route::get('/role/{id}/edit', [RoleWebController::class, 'edit'])->name('role.edit');
    Route::put('/role/{id}', [RoleWebController::class, 'update']);
    Route::delete('/role/{id}', [RoleWebController::class, 'destroy']);
    
    Route::prefix('api/role')->group(function () {
        Route::get('/', [RoleController::class, 'index']);
        Route::get('/{id}', [RoleController::class, 'show']);
        Route::post('/', [RoleController::class, 'store']);
        Route::put('/{id}', [RoleController::class, 'update']);
        Route::delete('/{id}', [RoleController::class, 'destroy']);
    });
    
    // Survey Module Routes
    Route::get('/survey', [SurveyWebController::class, 'index'])->name('survey.view');
    Route::get('/survey/new', [SurveyWebController::class, 'create'])->name('survey.new');
    Route::post('/survey', [SurveyWebController::class, 'store']);
    Route::get('/survey/{id}', [SurveyWebController::class, 'show'])->name('survey.detail');
    Route::get('/survey/{id}/edit', [SurveyWebController::class, 'edit'])->name('survey.edit');
    Route::put('/survey/{id}', [SurveyWebController::class, 'update']);
    Route::delete('/survey/{id}', [SurveyWebController::class, 'destroy']);
    Route::get('/survey/{id}/results', [SurveyWebController::class, 'results'])->name('survey.results');
    
    Route::prefix('api/survey')->group(function () {
        Route::get('/', [SurveyController::class, 'index']);
        Route::get('/active', [SurveyController::class, 'getActiveSurveys']);
        Route::get('/{id}', [SurveyController::class, 'show']);
        Route::post('/', [SurveyController::class, 'store']);
        Route::put('/{id}', [SurveyController::class, 'update']);
        Route::delete('/{id}', [SurveyController::class, 'destroy']);
        Route::post('/{id}/response', [SurveyController::class, 'submitResponse']);
        Route::get('/{id}/results', [SurveyController::class, 'getResults']);
    });
    
    // Target Module Routes
    Route::get('/target', [TargetWebController::class, 'index'])->name('target.view');
    Route::get('/target/new', [TargetWebController::class, 'create'])->name('target.new');
    Route::post('/target', [TargetWebController::class, 'store']);
    Route::get('/target/{id}', [TargetWebController::class, 'show'])->name('target.detail');
    Route::get('/target/{id}/edit', [TargetWebController::class, 'edit'])->name('target.edit');
    Route::put('/target/{id}', [TargetWebController::class, 'update']);
    Route::delete('/target/{id}', [TargetWebController::class, 'destroy']);
    
    Route::prefix('api/target')->group(function () {
        Route::get('/', [TargetController::class, 'index']);
        Route::get('/{id}', [TargetController::class, 'show']);
        Route::post('/', [TargetController::class, 'store']);
        Route::put('/{id}', [TargetController::class, 'update']);
        Route::delete('/{id}', [TargetController::class, 'destroy']);
    });
    
    // Tasks Module Routes
    Route::get('/tasks', [TasksWebController::class, 'index'])->name('tasks.view');
    Route::get('/tasks/new', [TasksWebController::class, 'create'])->name('tasks.new');
    Route::post('/tasks', [TasksWebController::class, 'store']);
    Route::get('/tasks/{id}', [TasksWebController::class, 'show'])->name('tasks.detail');
    Route::get('/tasks/{id}/edit', [TasksWebController::class, 'edit'])->name('tasks.edit');
    Route::put('/tasks/{id}', [TasksWebController::class, 'update']);
    Route::delete('/tasks/{id}', [TasksWebController::class, 'destroy']);
    
    Route::prefix('api/tasks')->group(function () {
        Route::get('/', [TasksController::class, 'index']);
        Route::get('/{id}', [TasksController::class, 'show']);
        Route::post('/', [TasksController::class, 'store']);
        Route::put('/{id}', [TasksController::class, 'update']);
        Route::delete('/{id}', [TasksController::class, 'destroy']);
    });
    
    // Transaction Module Routes
    Route::get('/transaction', [TransactionWebController::class, 'index'])->name('transaction.view');
    Route::get('/transaction/new', [TransactionWebController::class, 'create'])->name('transaction.new');
    Route::post('/transaction', [TransactionWebController::class, 'store']);
    Route::get('/transaction/{id}', [TransactionWebController::class, 'show'])->name('transaction.detail');
    Route::get('/transaction/{id}/edit', [TransactionWebController::class, 'edit'])->name('transaction.edit');
    Route::put('/transaction/{id}', [TransactionWebController::class, 'update']);
    Route::delete('/transaction/{id}', [TransactionWebController::class, 'destroy']);
    
    Route::prefix('api/transaction')->group(function () {
        Route::get('/', [TransactionController::class, 'index']);
        Route::get('/{id}', [TransactionController::class, 'show']);
        Route::post('/', [TransactionController::class, 'store']);
        Route::put('/{id}', [TransactionController::class, 'update']);
        Route::delete('/{id}', [TransactionController::class, 'destroy']);
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
    
    // Settings Module Routes
    Route::get('/settings', [SettingsWebController::class, 'index'])->name('settings.view');
    Route::get('/settings/organization', [SettingsWebController::class, 'organizationSettings'])->name('settings.organization');
    Route::put('/settings/organization', [SettingsWebController::class, 'updateOrganizationSettings']);
    Route::get('/settings/users', [SettingsWebController::class, 'userManagement'])->name('settings.users');
    Route::post('/settings/users', [SettingsWebController::class, 'createUser']);
    Route::put('/settings/users/{id}', [SettingsWebController::class, 'updateUser']);
    Route::get('/settings/roles', [SettingsWebController::class, 'roleManagement'])->name('settings.roles');
    Route::post('/settings/roles', [SettingsWebController::class, 'createRole']);
    Route::get('/settings/security', [SettingsWebController::class, 'securitySettings'])->name('settings.security');
    Route::put('/settings/security', [SettingsWebController::class, 'updateSecuritySettings']);
    Route::get('/settings/notifications', [SettingsWebController::class, 'notificationSettings'])->name('settings.notifications');
    Route::put('/settings/notifications', [SettingsWebController::class, 'updateNotificationSettings']);
    Route::get('/settings/email', [SettingsWebController::class, 'emailSettings'])->name('settings.email');
    Route::put('/settings/email', [SettingsWebController::class, 'updateEmailSettings']);
    Route::get('/settings/integrations', [SettingsWebController::class, 'integrationSettings'])->name('settings.integrations');
    Route::get('/settings/data-management', [SettingsWebController::class, 'dataManagement'])->name('settings.data-management');
    Route::get('/settings/audit', [SettingsWebController::class, 'auditSettings'])->name('settings.audit');
    Route::get('/settings/localization', [SettingsWebController::class, 'localizationSettings'])->name('settings.localization');
    Route::get('/settings/branding', [SettingsWebController::class, 'brandingSettings'])->name('settings.branding');
    Route::put('/settings/branding', [SettingsWebController::class, 'updateBrandingSettings']);
    Route::get('/settings/system-behavior', [SettingsWebController::class, 'systemBehaviorSettings'])->name('settings.system-behavior');
    Route::get('/settings/compliance', [SettingsWebController::class, 'complianceSettings'])->name('settings.compliance');
    
    // Settings API Routes
    Route::prefix('api/settings')->group(function () {
        // Organization Settings
        Route::get('/organization', [SettingsController::class, 'getOrganizationSettings']);
        Route::put('/organization', [SettingsController::class, 'updateOrganizationSettings']);
        
        // Security Settings
        Route::get('/security', [SettingsController::class, 'getSecuritySettings']);
        Route::put('/security', [SettingsController::class, 'updateSecuritySettings']);
        
        // User Management
        Route::post('/users', [SettingsController::class, 'createUser']);
        Route::put('/users/{id}', [SettingsController::class, 'updateUser']);
        Route::delete('/users/{id}', [SettingsController::class, 'deactivateUser']);
        Route::post('/users/{id}/reset-password', [SettingsController::class, 'resetUserPassword']);
        Route::post('/users/{userId}/roles', [SettingsController::class, 'assignRoleToUser']);
        Route::delete('/users/{userId}/roles/{roleId}', [SettingsController::class, 'removeRoleFromUser']);
        
        // Role Management
        Route::post('/roles', [SettingsController::class, 'createRole']);
        Route::put('/roles/{roleId}/permissions', [SettingsController::class, 'updateRolePermissions']);
        
        // Notification Settings
        Route::get('/notifications', [SettingsController::class, 'getNotificationSettings']);
        Route::put('/notifications', [SettingsController::class, 'updateNotificationSettings']);
        Route::put('/users/{userId}/notification-preferences', [SettingsController::class, 'updateUserNotificationPreferences']);
        
        // Email Settings
        Route::get('/email', [SettingsController::class, 'getEmailSettings']);
        Route::put('/email', [SettingsController::class, 'updateEmailSettings']);
        
        // Integration Settings
        Route::post('/integrations/enable', [SettingsController::class, 'enableIntegration']);
        Route::delete('/integrations/{integrationName}', [SettingsController::class, 'disableIntegration']);
        
        // Data Management
        Route::put('/data-retention', [SettingsController::class, 'updateDataRetention']);
        
        // Audit & Activity
        Route::get('/audit-logs', [SettingsController::class, 'getAuditLogs']);
        Route::get('/audit-logs/export', [SettingsController::class, 'exportAuditLogs']);
        
        // Localization
        Route::put('/localization', [SettingsController::class, 'updateLocalizationSettings']);
        
        // Branding
        Route::get('/branding', [SettingsController::class, 'getBrandingSettings']);
        Route::put('/branding', [SettingsController::class, 'updateBrandingSettings']);
        
        // System Behavior
        Route::put('/system-behavior', [SettingsController::class, 'updateSystemBehaviorSettings']);
        
        // Compliance
        Route::put('/compliance', [SettingsController::class, 'updateComplianceSettings']);
    });
});

require __DIR__.'/auth.php';
