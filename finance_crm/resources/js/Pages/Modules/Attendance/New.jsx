import React from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function AttendanceNew({ users = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        attendance_date: new Date().toISOString().split('T')[0],
        check_in_time: '',
        check_out_time: '',
        work_hours: '',
        status: 'present',
        source: 'manual',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/attendance');
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/attendance">
                        <ThemedButton variant="ghost">← Back</ThemedButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Mark Attendance</h1>
                        <p className="text-theme-secondary">Record employee attendance</p>
                    </div>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Employee *</label>
                                <ThemedSelect
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className={errors.user_id ? 'border-red-500' : ''}
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </ThemedSelect>
                                {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Date *</label>
                                <ThemedInput
                                    type="date"
                                    value={data.attendance_date}
                                    onChange={(e) => setData('attendance_date', e.target.value)}
                                    className={errors.attendance_date ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.attendance_date && <p className="text-red-500 text-sm mt-1">{errors.attendance_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Check In Time</label>
                                <ThemedInput
                                    type="time"
                                    value={data.check_in_time}
                                    onChange={(e) => setData('check_in_time', e.target.value)}
                                    className={errors.check_in_time ? 'border-red-500' : ''}
                                />
                                {errors.check_in_time && <p className="text-red-500 text-sm mt-1">{errors.check_in_time}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Check Out Time</label>
                                <ThemedInput
                                    type="time"
                                    value={data.check_out_time}
                                    onChange={(e) => setData('check_out_time', e.target.value)}
                                    className={errors.check_out_time ? 'border-red-500' : ''}
                                />
                                {errors.check_out_time && <p className="text-red-500 text-sm mt-1">{errors.check_out_time}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Work Hours</label>
                                <ThemedInput
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="24"
                                    value={data.work_hours}
                                    onChange={(e) => setData('work_hours', e.target.value)}
                                    placeholder="Hours worked"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Status</label>
                                <ThemedSelect
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="half_day">Half Day</option>
                                    <option value="leave">Leave</option>
                                </ThemedSelect>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/attendance">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Saving...' : 'Mark Attendance'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
