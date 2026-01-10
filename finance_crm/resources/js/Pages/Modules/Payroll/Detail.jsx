import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function PayrollDetail({ payroll }) {
    const getStatusVariant = (status) => {
        const variants = {
            'generated': 'info',
            'approved': 'warning',
            'paid': 'success',
            'locked': 'error'
        };
        return variants[status] || 'info';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this payroll record?')) {
            router.delete(`/payroll/${payroll.id}`, {
                onSuccess: () => {
                    router.visit('/payroll');
                }
            });
        }
    };

    const handleExportPDF = () => {
        // Create a new window for PDF
        const printWindow = window.open('', '_blank');
        
        // Create the HTML content
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Payslip - ${payroll.user?.name} - ${payroll.pay_period}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div id="pdf-content"></div>
                <div class="no-print p-4 text-center">
                    <button onclick="window.print()" class="bg-blue-600 text-white px-6 py-2 rounded mr-4">Print PDF</button>
                    <button onclick="window.close()" class="bg-gray-600 text-white px-6 py-2 rounded">Close</button>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Wait for the window to load, then render the React component
        printWindow.onload = () => {
            const pdfContent = printWindow.document.getElementById('pdf-content');
            pdfContent.innerHTML = generatePDFHTML(payroll);
        };
    };

    const generatePDFHTML = (payroll) => {
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        };

        const formatDate = (date) => {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        return `
            <div class="bg-theme-primary p-8 max-w-4xl mx-auto" style="font-family: Arial, sans-serif">
                <!-- Header -->
                <div class="border-b-2 border-blue-600 pb-6 mb-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-3xl font-bold text-blue-600">PAYSLIP</h1>
                            <p class="text-gray-600 mt-1">Finance CRM System</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-600">Generated on</p>
                            <p class="font-semibold">${formatDate(new Date())}</p>
                        </div>
                    </div>
                </div>

                <!-- Employee Information -->
                <div class="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                            Employee Information
                        </h2>
                        <div class="space-y-2">
                            <div class="flex">
                                <span class="w-24 text-gray-600">Name:</span>
                                <span class="font-medium">${payroll.user?.name || 'N/A'}</span>
                            </div>
                            <div class="flex">
                                <span class="w-24 text-gray-600">Email:</span>
                                <span class="font-medium">${payroll.user?.email || 'N/A'}</span>
                            </div>
                            <div class="flex">
                                <span class="w-24 text-gray-600">Employee ID:</span>
                                <span class="font-medium">EMP-${payroll.user?.id || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                            Pay Period Information
                        </h2>
                        <div class="space-y-2">
                            <div class="flex">
                                <span class="w-24 text-gray-600">Period:</span>
                                <span class="font-medium">${payroll.pay_period}</span>
                            </div>
                            <div class="flex">
                                <span class="w-24 text-gray-600">From:</span>
                                <span class="font-medium">${formatDate(payroll.period_start)}</span>
                            </div>
                            <div class="flex">
                                <span class="w-24 text-gray-600">To:</span>
                                <span class="font-medium">${formatDate(payroll.period_end)}</span>
                            </div>
                            <div class="flex">
                                <span class="w-24 text-gray-600">Pay Date:</span>
                                <span class="font-medium">${formatDate(payroll.pay_date)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Net Salary -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-8">
                    <div class="text-center">
                        <h2 class="text-xl font-semibold mb-2">Net Salary</h2>
                        <div class="text-4xl font-bold mb-2">${formatCurrency(payroll.net_salary)}</div>
                        <div class="text-blue-100 text-sm">
                            ${formatCurrency(payroll.total_earnings || payroll.gross_salary)} - ${formatCurrency(payroll.total_deductions || 0)}
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
                    <p>This is a computer-generated payslip and does not require a signature.</p>
                    <p class="mt-2">
                        Generated by Finance CRM System | 
                        <span class="ml-1">Payroll ID: ${payroll.id}</span>
                    </p>
                </div>
            </div>
        `;
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Payroll Details</h1>
                        <p className="text-theme-secondary">View payroll information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/payroll">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        {payroll.status === 'generated' && (
                            <Link href={`/payroll/${payroll.id}/edit`}>
                                <ThemedButton variant="primary">Edit</ThemedButton>
                            </Link>
                        )}
                        <ThemedButton
                            onClick={handleExportPDF}
                            variant="success"
                        >
                            Export PDF
                        </ThemedButton>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Employee Information</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Employee Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{payroll.user?.name || 'Unknown'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Email</label>
                                <p className="mt-1 text-sm text-theme-primary">{payroll.user?.email || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Pay Period</label>
                                <p className="mt-1 text-sm text-theme-primary">{payroll.pay_period}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Period Duration</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(payroll.period_start).toLocaleDateString()} - {new Date(payroll.period_end).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Pay Date</label>
                                <p className="mt-1 text-sm text-theme-secondary">{new Date(payroll.pay_date).toLocaleDateString()}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getStatusVariant(payroll.status)}>
                                        {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                                    </ThemedBadge>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>

                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Attendance Summary</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-theme-muted">Working Days:</span>
                                <span className="font-medium text-theme-primary">{payroll.working_days}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-theme-muted">Present Days:</span>
                                <span className="font-medium text-green-600">{payroll.present_days}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-theme-muted">Leave Days:</span>
                                <span className="font-medium text-blue-600">{payroll.leave_days}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-theme-muted">LOP Days:</span>
                                <span className="font-medium text-red-600">{payroll.lop_days}</span>
                            </div>

                            <div className="border-t border-theme pt-4">
                                <div className="flex justify-between">
                                    <span className="text-theme-muted">Attendance %:</span>
                                    <span className="font-medium text-theme-primary">
                                        {((payroll.present_days / payroll.working_days) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Salary Breakdown</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-medium text-theme-primary mb-3">Earnings</h4>
                                <div className="space-y-2">
                                    {payroll.earnings && payroll.earnings.length > 0 ? (
                                        payroll.earnings.map((earning, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span className="text-theme-muted capitalize">{earning.type.replace('_', ' ')}:</span>
                                                <span className="font-medium text-theme-primary">{formatCurrency(earning.amount)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex justify-between">
                                            <span className="text-theme-muted">Gross Salary:</span>
                                            <span className="font-medium text-theme-primary">{formatCurrency(payroll.gross_salary)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-theme pt-2">
                                        <div className="flex justify-between font-medium">
                                            <span className="text-theme-primary">Total Earnings:</span>
                                            <span className="text-green-600">{formatCurrency(payroll.total_earnings || payroll.gross_salary)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-theme-primary mb-3">Deductions</h4>
                                <div className="space-y-2">
                                    {payroll.deductions && payroll.deductions.length > 0 ? (
                                        payroll.deductions.map((deduction, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span className="text-theme-muted capitalize">{deduction.type.replace('_', ' ')}:</span>
                                                <span className="font-medium text-theme-primary">{formatCurrency(deduction.amount)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-theme-muted">No deductions</div>
                                    )}
                                    <div className="border-t border-theme pt-2">
                                        <div className="flex justify-between font-medium">
                                            <span className="text-theme-primary">Total Deductions:</span>
                                            <span className="text-red-600">{formatCurrency(payroll.total_deductions || 0)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-theme-primary mb-3">Net Salary</h4>
                                <div className="bg-theme-primary p-4 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {formatCurrency(payroll.net_salary)}
                                        </div>
                                        <div className="text-sm text-theme-muted mt-1">
                                            Final Amount
                                        </div>
                                        <div className="text-xs text-theme-muted mt-2">
                                            {formatCurrency(payroll.total_earnings || payroll.gross_salary)} - {formatCurrency(payroll.total_deductions || 0)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ThemedCard>

                {(payroll.approved_at || payroll.paid_at) && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Approval & Payment History</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                <p className="mt-1 text-sm text-theme-primary">{payroll.creator?.name || 'Unknown'}</p>
                            </div>

                            {payroll.approved_at && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Approved By</label>
                                    <p className="mt-1 text-sm text-theme-primary">
                                        {payroll.approver?.name || 'Unknown'} on {new Date(payroll.approved_at).toLocaleDateString()}
                                    </p>
                                </div>
                            )}

                            {payroll.paid_at && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Paid On</label>
                                    <p className="mt-1 text-sm text-theme-secondary">{new Date(payroll.paid_at).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </ThemedCard>
                )}
            </div>
        </Layout>
    );
}
