import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function PayrollNew({ users = [] }) {
    const [formData, setFormData] = useState({
        user_id: '',
        pay_period: '',
        period_start: '',
        period_end: '',
        pay_date: '',
        gross_salary: '',
        working_days: 22,
        present_days: 22,
        leave_days: 0,
        lop_days: 0,
        status: 'generated',
        earnings: [
            { type: 'basic', amount: '' },
            { type: 'hra', amount: '' },
            { type: 'allowances', amount: '' }
        ],
        deductions: [
            { type: 'tax', amount: '' },
            { type: 'pf', amount: '' }
        ]
    });

    const [errors, setErrors] = useState({});

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
        const submitData = {
            ...formData,
            total_earnings: totalEarnings,
            total_deductions: totalDeductions,
            net_salary: netSalary
        };
        router.post('/payroll', submitData, {
            onError: (errors) => setErrors(errors)
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create Payroll</h1>
                        <p className="text-gray-600">Generate new payroll record</p>
                    </div>
                    <Link
                        href="/payroll"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back to Payroll
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Employee *
                                </label>
                                <select
                                    value={formData.user_id}
                                    onChange={(e) => setFormData(prev => ({ ...prev, user_id: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pay Period *
                                </label>
                                <input
                                    type="month"
                                    value={formData.pay_period}
                                    onChange={(e) => setFormData(prev => ({ ...prev, pay_period: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Period Start *
                                </label>
                                <input
                                    type="date"
                                    value={formData.period_start}
                                    onChange={(e) => setFormData(prev => ({ ...prev, period_start: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Period End *
                                </label>
                                <input
                                    type="date"
                                    value={formData.period_end}
                                    onChange={(e) => setFormData(prev => ({ ...prev, period_end: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pay Date *
                                </label>
                                <input
                                    type="date"
                                    value={formData.pay_date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, pay_date: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Working Days *
                                </label>
                                <input
                                    type="number"
                                    value={formData.working_days}
                                    onChange={(e) => setFormData(prev => ({ ...prev, working_days: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Present Days *
                                </label>
                                <input
                                    type="number"
                                    value={formData.present_days}
                                    onChange={(e) => setFormData(prev => ({ ...prev, present_days: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Leave Days
                                </label>
                                <input
                                    type="number"
                                    value={formData.leave_days}
                                    onChange={(e) => setFormData(prev => ({ ...prev, leave_days: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Earnings</h3>
                            <button
                                type="button"
                                onClick={addEarning}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                                Add Earning
                            </button>
                        </div>
                        
                        {formData.earnings.map((earning, index) => (
                            <div key={index} className="flex gap-4 mb-3">
                                <select
                                    value={earning.type}
                                    onChange={(e) => updateEarning(index, 'type', e.target.value)}
                                    className="flex-1 border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Type</option>
                                    <option value="basic">Basic Salary</option>
                                    <option value="hra">HRA</option>
                                    <option value="allowances">Allowances</option>
                                    <option value="bonus">Bonus</option>
                                    <option value="overtime">Overtime</option>
                                </select>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Amount"
                                    value={earning.amount}
                                    onChange={(e) => updateEarning(index, 'amount', e.target.value)}
                                    className="flex-1 border rounded-md px-3 py-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeEarning(index)}
                                    className="text-red-600 hover:text-red-800 px-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="text-right font-medium">
                            Total Earnings: ${totalEarnings.toFixed(2)}
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Deductions</h3>
                            <button
                                type="button"
                                onClick={addDeduction}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                                Add Deduction
                            </button>
                        </div>
                        
                        {formData.deductions.map((deduction, index) => (
                            <div key={index} className="flex gap-4 mb-3">
                                <select
                                    value={deduction.type}
                                    onChange={(e) => updateDeduction(index, 'type', e.target.value)}
                                    className="flex-1 border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Type</option>
                                    <option value="tax">Income Tax</option>
                                    <option value="pf">Provident Fund</option>
                                    <option value="esi">ESI</option>
                                    <option value="loan">Loan Deduction</option>
                                    <option value="other">Other</option>
                                </select>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Amount"
                                    value={deduction.amount}
                                    onChange={(e) => updateDeduction(index, 'amount', e.target.value)}
                                    className="flex-1 border rounded-md px-3 py-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeDeduction(index)}
                                    className="text-red-600 hover:text-red-800 px-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="text-right font-medium">
                            Total Deductions: ${totalDeductions.toFixed(2)}
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-2">Salary Summary</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</div>
                                <div className="text-sm text-gray-600">Total Earnings</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red-600">${totalDeductions.toFixed(2)}</div>
                                <div className="text-sm text-gray-600">Total Deductions</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600">${netSalary.toFixed(2)}</div>
                                <div className="text-sm text-gray-600">Net Salary</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link
                            href="/payroll"
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        >
                            Create Payroll
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}