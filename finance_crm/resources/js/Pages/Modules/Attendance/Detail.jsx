import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

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

    const getStatusVariant = (status) => {
        switch(status) {
            case 'present': return 'success';
            case 'absent': return 'error';
            case 'half_day': return 'warning';
            case 'leave': return 'info';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Attendance Details</h1>
                        <p className="text-theme-secondary">View attendance record information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/attendance">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/attendance/${attendance.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Attendance Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">User</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {attendance.user ? attendance.user.name : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Date</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {new Date(attendance.attendance_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Check In Time</label>
                                <p className="mt-1 text-sm text-theme-primary">{attendance.check_in_time || 'Not recorded'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Check Out Time</label>
                                <p className="mt-1 text-sm text-theme-primary">{attendance.check_out_time || 'Not recorded'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Work Hours</label>
                                <p className="mt-1 text-sm text-theme-primary">{attendance.work_hours || 'Not calculated'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getStatusVariant(attendance.status)}>
                                        {attendance.status.replace('_', ' ')}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Source</label>
                                <p className="mt-1 text-sm text-theme-primary capitalize">{attendance.source}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Active Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={attendance.is_active ? 'success' : 'error'}>
                                        {attendance.is_active ? 'Active' : 'Inactive'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            {attendance.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{attendance.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(attendance.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(attendance.updated_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
