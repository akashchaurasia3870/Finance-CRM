import React from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function AttendanceNew({ users = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        date: new Date().toISOString().split('T')[0],
        check_in: '',
        check_out: '',
        status: 'present',
        notes: '',
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
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className={errors.date ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Check In Time</label>
                                <ThemedInput
                                    type="time"
                                    value={data.check_in}
                                    onChange={(e) => setData('check_in', e.target.value)}
                                    className={errors.check_in ? 'border-red-500' : ''}
                                />
                                {errors.check_in && <p className="text-red-500 text-sm mt-1">{errors.check_in}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Check Out Time</label>
                                <ThemedInput
                                    type="time"
                                    value={data.check_out}
                                    onChange={(e) => setData('check_out', e.target.value)}
                                    className={errors.check_out ? 'border-red-500' : ''}
                                />
                                {errors.check_out && <p className="text-red-500 text-sm mt-1">{errors.check_out}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Status</label>
                                <ThemedSelect
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="present">Present</option>
                                    <option value="late">Late</option>
                                    <option value="absent">Absent</option>
                                    <option value="half_day">Half Day</option>
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Notes</label>
                                <ThemedInput
                                    type="text"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Optional notes"
                                />
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