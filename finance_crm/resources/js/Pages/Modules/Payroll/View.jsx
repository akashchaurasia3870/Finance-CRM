import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function PayrollView({ payrolls = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPayrolls = payrolls.filter(payroll => 
        (payroll.employee?.name && payroll.employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payroll.period && payroll.period.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this payroll record?')) {
            router.delete(`/payroll/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Payroll</h1>
                        <p className="text-theme-secondary">Manage employee payroll</p>
                    </div>
                    <Link href="/payroll/new">
                        <ThemedButton variant="primary">Process Payroll</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Payroll Records</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search payroll..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Employee</ThemedTableCell>
                                <ThemedTableCell header>Period</ThemedTableCell>
                                <ThemedTableCell header>Basic Salary</ThemedTableCell>
                                <ThemedTableCell header>Allowances</ThemedTableCell>
                                <ThemedTableCell header>Deductions</ThemedTableCell>
                                <ThemedTableCell header>Net Pay</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredPayrolls.length > 0 ? filteredPayrolls.map((payroll) => (
                                <ThemedTableRow key={payroll.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{payroll.employee?.name || 'N/A'}</div>
                                        <div className="text-sm text-theme-muted">{payroll.employee?.employee_id || 'N/A'}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {payroll.period || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-medium">
                                        ${payroll.basic_salary || '0.00'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        ${payroll.allowances || '0.00'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        ${payroll.deductions || '0.00'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-semibold">
                                        ${payroll.net_pay || '0.00'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            payroll.status === 'paid' ? 'success' :
                                            payroll.status === 'pending' ? 'warning' : 'error'
                                        }>
                                            {payroll.status || 'Pending'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/payroll/${payroll.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/payroll/${payroll.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(payroll.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                ['John Doe', 'Jane Smith', 'Bob Johnson'].map((name, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{name}</div>
                                            <div className="text-sm text-theme-muted">EMP00{index + 1}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary font-medium">
                                            ${((index + 1) * 5000).toLocaleString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            ${((index + 1) * 500).toLocaleString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            ${((index + 1) * 200).toLocaleString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary font-semibold">
                                            ${((index + 1) * 5300).toLocaleString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={index === 0 ? 'success' : index === 1 ? 'warning' : 'info'}>
                                                {index === 0 ? 'Paid' : index === 1 ? 'Pending' : 'Processing'}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="space-x-2">
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1 text-red-600 hover:text-red-800">Delete</ThemedButton>
                                            </div>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
