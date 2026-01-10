<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Calendar;
use App\Models\Meetings;
use App\Models\Client;
use App\Models\Tasks;
use App\Models\Leads;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends BaseController
{
    public function index(Request $request)
    {
        $dateRange = $request->get('date_range', '30'); // Default 30 days
        $startDate = Carbon::now()->subDays($dateRange);
        
        $stats = [
            'users' => $this->getUserStats($startDate),
            'calendar' => $this->getCalendarStats($startDate),
            'meetings' => $this->getMeetingStats($startDate),
            'clients' => $this->getClientStats($startDate),
            'tasks' => $this->getTaskStats($startDate),
            'leads' => $this->getLeadStats($startDate)
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
            'charts' => $this->getChartData($startDate)
        ]);
    }

    private function getUserStats($startDate)
    {
        return [
            'total' => User::count(),
            'active' => User::where('created_at', '>=', $startDate)->count(),
            'new_this_month' => User::whereMonth('created_at', Carbon::now()->month)->count(),
            'growth_rate' => $this->calculateGrowthRate(User::class, $startDate)
        ];
    }

    private function getCalendarStats($startDate)
    {
        return [
            'total_events' => Calendar::count(),
            'upcoming_events' => Calendar::where('start_date', '>=', Carbon::now())->count(),
            'events_this_month' => Calendar::whereMonth('start_date', Carbon::now()->month)->count(),
            'overdue_events' => Calendar::where('end_date', '<', Carbon::now())->where('status', '!=', 'completed')->count()
        ];
    }

    private function getMeetingStats($startDate)
    {
        return [
            'total_meetings' => Meetings::count(),
            'upcoming_meetings' => Meetings::where('meeting_date', '>=', Carbon::now())->count(),
            'completed_meetings' => Meetings::where('status', 'completed')->count(),
            'meetings_this_week' => Meetings::whereBetween('meeting_date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->count()
        ];
    }

    private function getClientStats($startDate)
    {
        return [
            'total_clients' => Client::count(),
            'active_clients' => Client::where('status', 'active')->count(),
            'new_clients' => Client::where('created_at', '>=', $startDate)->count(),
            'client_growth' => $this->calculateGrowthRate(Client::class, $startDate)
        ];
    }

    private function getTaskStats($startDate)
    {
        return [
            'total_tasks' => Tasks::count(),
            'pending_tasks' => Tasks::where('status', 'pending')->count(),
            'completed_tasks' => Tasks::where('status', 'completed')->count(),
            'overdue_tasks' => Tasks::where('due_date', '<', Carbon::now())->where('status', '!=', 'completed')->count()
        ];
    }

    private function getLeadStats($startDate)
    {
        return [
            'total_leads' => Leads::count(),
            'hot_leads' => Leads::where('status', 'hot')->count(),
            'converted_leads' => Leads::where('status', 'converted')->count(),
            'conversion_rate' => $this->calculateConversionRate()
        ];
    }

    private function getChartData($startDate)
    {
        return [
            'user_growth' => $this->getUserGrowthChart($startDate),
            'meeting_trends' => $this->getMeetingTrendsChart($startDate),
            'client_acquisition' => $this->getClientAcquisitionChart($startDate),
            'task_completion' => $this->getTaskCompletionChart($startDate)
        ];
    }

    private function getUserGrowthChart($startDate)
    {
        $data = User::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
        ->where('created_at', '>=', $startDate)
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return [
            'labels' => $data->pluck('date'),
            'data' => $data->pluck('count')
        ];
    }

    private function getMeetingTrendsChart($startDate)
    {
        $data = Meetings::select(
            DB::raw('DATE(meeting_date) as date'),
            DB::raw('COUNT(*) as count')
        )
        ->where('meeting_date', '>=', $startDate)
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return [
            'labels' => $data->pluck('date'),
            'data' => $data->pluck('count')
        ];
    }

    private function getClientAcquisitionChart($startDate)
    {
        $data = Client::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
        ->where('created_at', '>=', $startDate)
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return [
            'labels' => $data->pluck('date'),
            'data' => $data->pluck('count')
        ];
    }

    private function getTaskCompletionChart($startDate)
    {
        $completed = Tasks::where('status', 'completed')
            ->where('updated_at', '>=', $startDate)
            ->count();
        
        $pending = Tasks::where('status', 'pending')->count();
        $in_progress = Tasks::where('status', 'in_progress')->count();

        return [
            'labels' => ['Completed', 'Pending', 'In Progress'],
            'data' => [$completed, $pending, $in_progress]
        ];
    }

    private function calculateGrowthRate($model, $startDate)
    {
        $current = $model::where('created_at', '>=', $startDate)->count();
        $previous = $model::where('created_at', '<', $startDate)
            ->where('created_at', '>=', Carbon::parse($startDate)->subDays(30))
            ->count();
        
        if ($previous == 0) return 100;
        
        return round((($current - $previous) / $previous) * 100, 2);
    }

    private function calculateConversionRate()
    {
        $total = Leads::count();
        $converted = Leads::where('status', 'converted')->count();
        
        if ($total == 0) return 0;
        
        return round(($converted / $total) * 100, 2);
    }

    public function getModuleStats(Request $request, $module)
    {
        switch ($module) {
            case 'users':
                return response()->json($this->getUserModuleStats($request));
            case 'calendar':
                return response()->json($this->getCalendarModuleStats($request));
            case 'meetings':
                return response()->json($this->getMeetingModuleStats($request));
            default:
                return response()->json(['error' => 'Module not found'], 404);
        }
    }

    private function getUserModuleStats($request)
    {
        $dateRange = $request->get('date_range', '30');
        $startDate = Carbon::now()->subDays($dateRange);
        
        return [
            'total_users' => User::count(),
            'active_users' => User::where('last_login_at', '>=', $startDate)->count(),
            'new_registrations' => User::where('created_at', '>=', $startDate)->count(),
            'user_roles' => User::select('role', DB::raw('count(*) as count'))
                ->groupBy('role')
                ->get(),
            'monthly_growth' => $this->getUserGrowthChart($startDate)
        ];
    }

    private function getCalendarModuleStats($request)
    {
        $dateRange = $request->get('date_range', '30');
        $startDate = Carbon::now()->subDays($dateRange);
        
        return [
            'total_events' => Calendar::count(),
            'upcoming_events' => Calendar::where('start_date', '>=', Carbon::now())->count(),
            'completed_events' => Calendar::where('status', 'completed')->count(),
            'event_types' => Calendar::select('event_type', DB::raw('count(*) as count'))
                ->groupBy('event_type')
                ->get(),
            'monthly_events' => $this->getCalendarEventsChart($startDate)
        ];
    }

    private function getMeetingModuleStats($request)
    {
        $dateRange = $request->get('date_range', '30');
        $startDate = Carbon::now()->subDays($dateRange);
        
        return [
            'total_meetings' => Meetings::count(),
            'upcoming_meetings' => Meetings::where('meeting_date', '>=', Carbon::now())->count(),
            'completed_meetings' => Meetings::where('status', 'completed')->count(),
            'meeting_types' => Meetings::select('meeting_type', DB::raw('count(*) as count'))
                ->groupBy('meeting_type')
                ->get(),
            'monthly_meetings' => $this->getMeetingTrendsChart($startDate)
        ];
    }

    private function getCalendarEventsChart($startDate)
    {
        $data = Calendar::select(
            DB::raw('DATE(start_date) as date'),
            DB::raw('COUNT(*) as count')
        )
        ->where('start_date', '>=', $startDate)
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return [
            'labels' => $data->pluck('date'),
            'data' => $data->pluck('count')
        ];
    }
}