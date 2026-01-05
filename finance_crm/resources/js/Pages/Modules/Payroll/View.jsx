import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function PayrollView({ payrolls = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPayrolls = payrolls.filter(payroll => 
        (payroll.user?.name && payroll.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payroll.pay_period && payroll.pay_period.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this payroll record?')) {
            router.delete(`/payroll/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        const variants = {
            'generated': 'info',
            'approved': 'warning', 
            'paid': 'success',
            'locked': 'error'
        };
        return variants[status] || 'info';
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
                                <ThemedTableCell header>Gross Salary</ThemedTableCell>
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
                                        <div className="font-medium text-theme-primary">{payroll.user?.name || 'N/A'}</div>
                                        <div className="text-sm text-theme-muted">{payroll.user?.email || 'N/A'}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {payroll.pay_period || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-medium">
                                        ${parseFloat(payroll.gross_salary || 0).toFixed(2)}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        ${parseFloat(payroll.total_deductions || 0).toFixed(2)}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-semibold">
                                        ${parseFloat(payroll.net_salary || 0).toFixed(2)}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(payroll.status)}>
                                            {payroll.status || 'Generated'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="flex space-x-2">
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
                                <ThemedTableRow>
                                    <ThemedTableCell colSpan="7" className="text-center text-theme-muted">
                                        No payroll records found. Click "Process Payroll" to create one.
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
