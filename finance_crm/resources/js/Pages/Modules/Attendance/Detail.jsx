import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function AttendanceDetail({ attendance }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this attendance record?')) {
            router.delete(`/attendance/${attendance.id}`, {
                onSuccess: () => {
                    router.visit('/attendance');
                }
            });
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'present': return 'bg-green-100 text-green-800';
            case 'absent': return 'bg-red-100 text-red-800';
            case 'half_day': return 'bg-yellow-100 text-yellow-800';
            case 'leave': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Attendance Details</h1>
                        <p className="text-gray-600">View attendance record information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/attendance"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/attendance/${attendance.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Attendance Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">User</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {attendance.user ? attendance.user.name : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(attendance.attendance_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Check In Time</label>
                                <p className="mt-1 text-sm text-gray-900">{attendance.check_in_time || 'Not recorded'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Check Out Time</label>
                                <p className="mt-1 text-sm text-gray-900">{attendance.check_out_time || 'Not recorded'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Work Hours</label>
                                <p className="mt-1 text-sm text-gray-900">{attendance.work_hours || 'Not calculated'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(attendance.status)}`}>
                                    {attendance.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Source</label>
                                <p className="mt-1 text-sm text-gray-900 capitalize">{attendance.source}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Active Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    attendance.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {attendance.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            {attendance.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{attendance.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(attendance.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(attendance.updated_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}