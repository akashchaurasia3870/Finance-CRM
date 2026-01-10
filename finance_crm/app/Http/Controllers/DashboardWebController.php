<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardWebController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index');
    }

    public function userDashboard()
    {
        return Inertia::render('Dashboard/Modules/UserDashboard');
    }

    public function calendarDashboard()
    {
        return Inertia::render('Dashboard/Modules/CalendarDashboard');
    }

    public function meetingsDashboard()
    {
        return Inertia::render('Dashboard/Modules/MeetingsDashboard');
    }

    public function reports()
    {
        return Inertia::render('Dashboard/Reports');
    }
}