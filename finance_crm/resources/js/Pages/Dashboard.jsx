import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Dashboard() {
    useEffect(() => {
        // Redirect to the new dashboard index
        router.visit('/dashboard/index');
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-lg text-gray-600">Redirecting to dashboard...</div>
        </div>
    );
}
