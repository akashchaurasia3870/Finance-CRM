import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function PayrollEdit({ payroll, users = [] }) {
    const [formData, setFormData] = useState({
        user_id: '',
        pay_period: '',
        period_start: '',
        period_end: '',
        pay_date: '',
        working_days: 22,
        present_days: 22,
        leave_days: 0,
        lop_days: 0,
        status: 'generated',
        earnings: [],
        deductions: []
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (payroll) {
            setFormData({
                user_id: payroll.user_id || '',
                pay_period: payroll.pay_period || '',
                period_start: payroll.period_start ? payroll.period_start.split('T')[0] : '',
                period_end: payroll.period_end ? payroll.period_end.split('T')[0] : '',
                pay_date: payroll.pay_date ? payroll.pay_date.split('T')[0] : '',
                working_days: payroll.working_days || 22,
                present_days: payroll.present_days || 22,
                leave_days: payroll.leave_days || 0,
                lop_days: payroll.lop_days || 0,
                status: payroll.status || 'generated',
                earnings: payroll.earnings || [],
                deductions: payroll.deductions || []
            });
        }
    }, [payroll]);

    const addEarning = () => {
        setFormData(prev => ({
            ...prev,
            earnings: [...prev.earnings, { type: '', amount: '' }]
        }));
    };

    const removeEarning = (index) => {
        setFormData(prev => ({
            ...prev,
            earnings: prev.earnings.filter((_, i) => i !== index)
        }));
    };

    const updateEarning = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            earnings: prev.earnings.map((earning, i) => 
                i === index ? { ...earning, [field]: value } : earning
            )
        }));
    };

    const addDeduction = () => {
        setFormData(prev => ({
            ...prev,
            deductions: [...prev.deductions, { type: '', amount: '' }]
        }));
    };

    const removeDeduction = (index) => {
        setFormData(prev => ({
            ...prev,
            deductions: prev.deductions.filter((_, i) => i !== index)
        }));
    };

    const updateDeduction = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            deductions: prev.deductions.map((deduction, i) => 
                i === index ? { ...deduction, [field]: value } : deduction
            )
        }));
    };

    const calculateTotals = () => {
        const totalEarnings = formData.earnings.reduce((sum, earning) => 
            sum + (parseFloat(earning.amount) || 0), 0
        );
        const totalDeductions = formData.deductions.reduce((sum, deduction) => 
            sum + (parseFloat(deduction.amount) || 0), 0
        );
        return { totalEarnings, totalDeductions };
    };

    const { totalEarnings, totalDeductions } = calculateTotals();
    const netSalary = totalEarnings - totalDeductions;

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/payroll/${payroll.id}`, formData, {
            onSuccess: () => {
                router.visit('/payroll');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Payroll</h1>
                        <p className="text-theme-secondary">Update payroll information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/payroll">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/payroll/${payroll.id}`}>
                            <ThemedButton variant="primary">View Payroll</ThemedButton>
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Basic Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Employee *
                                    </label>
                                    <select
                                        value={formData.user_id}
                                        onChange={(e) => setFormData(prev => ({ ...prev, user_id: e.target.value }))}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                        required
                                    >
                                        <option value="">Select Employee</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} - {user.email}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Pay Period *
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={formData.pay_period}
                                        onChange={(e) => setFormData(prev => ({ ...prev, pay_period: e.target.value }))}
                                        placeholder="YYYY-MM"
                                        required
                                    />
                                    {errors.pay_period && <p className="text-red-500 text-sm mt-1">{errors.pay_period}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Period Start *
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={formData.period_start}
                                        onChange={(e) => setFormData(prev => ({ ...prev, period_start: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Period End *
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={formData.period_end}
                                        onChange={(e) => setFormData(prev => ({ ...prev, period_end: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Pay Date *
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={formData.pay_date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, pay_date: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Working Days *
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        value={formData.working_days}
                                        onChange={(e) => setFormData(prev => ({ ...prev, working_days: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Present Days *
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        value={formData.present_days}
                                        onChange={(e) => setFormData(prev => ({ ...prev, present_days: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Leave Days
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        value={formData.leave_days}
                                        onChange={(e) => setFormData(prev => ({ ...prev, leave_days: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </ThemedCard>

                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-theme-primary">Earnings</h3>
                                <ThemedButton
                                    type="button"
                                    onClick={addEarning}
                                    variant="success"
                                    className="text-sm"
                                >
                                    Add Earning
                                </ThemedButton>
                            </div>
                        </div>
                        <div className="p-6">
                            {formData.earnings.map((earning, index) => (
                                <div key={index} className="flex gap-4 mb-3">
                                    <select
                                        value={earning.type}
                                        onChange={(e) => updateEarning(index, 'type', e.target.value)}
                                        className="flex-1 border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="basic">Basic Salary</option>
                                        <option value="hra">HRA</option>
                                        <option value="allowances">Allowances</option>
                                        <option value="bonus">Bonus</option>
                                        <option value="overtime">Overtime</option>
                                    </select>
                                    <ThemedInput
                                        type="number"
                                        step="0.01"
                                        placeholder="Amount"
                                        value={earning.amount}
                                        onChange={(e) => updateEarning(index, 'amount', e.target.value)}
                                        className="flex-1"
                                    />
                                    <ThemedButton
                                        type="button"
                                        onClick={() => removeEarning(index)}
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-800 px-2"
                                    >
                                        Remove
                                    </ThemedButton>
                                </div>
                            ))}
                            <div className="text-right font-medium text-theme-primary">
                                Total Earnings: ${totalEarnings.toFixed(2)}
                            </div>
                        </div>
                    </ThemedCard>

                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-theme-primary">Deductions</h3>
                                <ThemedButton
                                    type="button"
                                    onClick={addDeduction}
                                    variant="danger"
                                    className="text-sm"
                                >
                                    Add Deduction
                                </ThemedButton>
                            </div>
                        </div>
                        <div className="p-6">
                            {formData.deductions.map((deduction, index) => (
                                <div key={index} className="flex gap-4 mb-3">
                                    <select
                                        value={deduction.type}
                                        onChange={(e) => updateDeduction(index, 'type', e.target.value)}
                                        className="flex-1 border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="tax">Income Tax</option>
                                        <option value="pf">Provident Fund</option>
                                        <option value="esi">ESI</option>
                                        <option value="loan">Loan Deduction</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ThemedInput
                                        type="number"
                                        step="0.01"
                                        placeholder="Amount"
                                        value={deduction.amount}
                                        onChange={(e) => updateDeduction(index, 'amount', e.target.value)}
                                        className="flex-1"
                                    />
                                    <ThemedButton
                                        type="button"
                                        onClick={() => removeDeduction(index)}
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-800 px-2"
                                    >
                                        Remove
                                    </ThemedButton>
                                </div>
                            ))}
                            <div className="text-right font-medium text-theme-primary">
                                Total Deductions: ${totalDeductions.toFixed(2)}
                            </div>
                        </div>
                    </ThemedCard>

                    <ThemedCard>
                        <div className="p-6 bg-blue-50 border border-blue-200">
                            <h3 className="text-lg font-medium mb-4 text-theme-primary">Salary Summary</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</div>
                                    <div className="text-sm text-theme-muted">Total Earnings</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-red-600">${totalDeductions.toFixed(2)}</div>
                                    <div className="text-sm text-theme-muted">Total Deductions</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">${netSalary.toFixed(2)}</div>
                                    <div className="text-sm text-theme-muted">Net Salary</div>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>

                    <div className="flex justify-end space-x-3">
                        <Link href={`/payroll/${payroll.id}`}>
                            <ThemedButton variant="secondary">Cancel</ThemedButton>
                        </Link>
                        <ThemedButton
                            type="submit"
                            variant="primary"
                            disabled={processing}
                        >
                            {processing ? 'Updating...' : 'Update Payroll'}
                        </ThemedButton>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
