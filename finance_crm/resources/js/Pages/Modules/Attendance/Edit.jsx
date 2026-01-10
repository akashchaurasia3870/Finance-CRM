import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function EditAttendance({ attendance, users = [] }) {
    const [data, setData] = useState({
        user_id: attendance.user_id || '',
        attendance_date: attendance.attendance_date || '',
        check_in_time: attendance.check_in_time || '',
        check_out_time: attendance.check_out_time || '',
        work_hours: attendance.work_hours || '',
        status: attendance.status || 'present',
        source: attendance.source || 'system',
        is_active: attendance.is_active ?? true,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/attendance/${attendance.id}`, data, {
            onSuccess: () => {
                router.visit('/attendance');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Attendance</h1>
                        <p className="text-theme-secondary">Update attendance record</p>
                    </div>
                    <Link href="/attendance">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Attendance Information</h3>
                    </div>
                    <div className="p-6">
                        {errors.error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errors.error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        User *
                                    </label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData({...data, user_id: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 
                                                   bg-white text-gray-900 focus:outline-none 
                                                   focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select User</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                    {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Date *
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={data.attendance_date}
                                        onChange={(e) => setData({...data, attendance_date: e.target.value})}
                                        required
                                    />
                                    {errors.attendance_date && <p className="text-red-500 text-sm mt-1">{errors.attendance_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Check In Time
                                    </label>
                                    <ThemedInput
                                        type="time"
                                        value={data.check_in_time}
                                        onChange={(e) => setData({...data, check_in_time: e.target.value})}
                                    />
                                    {errors.check_in_time && <p className="text-red-500 text-sm mt-1">{errors.check_in_time}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Check Out Time
                                    </label>
                                    <ThemedInput
                                        type="time"
                                        value={data.check_out_time}
                                        onChange={(e) => setData({...data, check_out_time: e.target.value})}
                                    />
                                    {errors.check_out_time && <p className="text-red-500 text-sm mt-1">{errors.check_out_time}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Work Hours
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="24"
                                        value={data.work_hours}
                                        onChange={(e) => setData({...data, work_hours: e.target.value})}
                                    />
                                    {errors.work_hours && <p className="text-red-500 text-sm mt-1">{errors.work_hours}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Status *
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData({...data, status: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 
                                                   bg-white text-gray-900 focus:outline-none 
                                                   focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                        <option value="half_day">Half Day</option>
                                        <option value="leave">Leave</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Source
                                    </label>
                                    <select
                                        value={data.source}
                                        onChange={(e) => setData({...data, source: e.target.value})}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 
                                                   bg-white text-gray-900 focus:outline-none 
                                                   focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="system">System</option>
                                        <option value="manual">Manual</option>
                                        <option value="biometric">Biometric</option>
                                        <option value="mobile">Mobile</option>
                                    </select>
                                    {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source}</p>}
                                </div>

                                <div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData({...data, is_active: e.target.checked})}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm font-medium text-theme-primary">
                                            Active Status
                                        </label>
                                    </div>
                                    {errors.is_active && <p className="text-red-500 text-sm mt-1">{errors.is_active}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/attendance">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Attendance'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
