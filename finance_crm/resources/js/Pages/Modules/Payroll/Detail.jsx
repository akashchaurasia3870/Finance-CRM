import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';
import PayrollPDFTemplate from '@/Components/PayrollPDFTemplate';

export default function PayrollDetail({ payroll }) {
    const getStatusColor = (status) => {
        const colors = {
            'generated': 'bg-blue-100 text-blue-800',
            'approved': 'bg-yellow-100 text-yellow-800',
            'paid': 'bg-green-100 text-green-800',
            'locked': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
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
            const React = window.React;
            const ReactDOM = window.ReactDOM;
            
            // For now, we'll use a simpler approach with direct HTML
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
            <div class="bg-white p-8 max-w-4xl mx-auto" style="font-family: Arial, sans-serif">
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

                <!-- Attendance Summary -->
                <div class="mb-8">
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                        Attendance Summary
                    </h2>
                    <div class="grid grid-cols-4 gap-4">
                        <div class="text-center p-3 bg-blue-50 rounded">
                            <div class="text-2xl font-bold text-blue-600">${payroll.working_days}</div>
                            <div class="text-sm text-gray-600">Working Days</div>
                        </div>
                        <div class="text-center p-3 bg-green-50 rounded">
                            <div class="text-2xl font-bold text-green-600">${payroll.present_days}</div>
                            <div class="text-sm text-gray-600">Present Days</div>
                        </div>
                        <div class="text-center p-3 bg-yellow-50 rounded">
                            <div class="text-2xl font-bold text-yellow-600">${payroll.leave_days}</div>
                            <div class="text-sm text-gray-600">Leave Days</div>
                        </div>
                        <div class="text-center p-3 bg-red-50 rounded">
                            <div class="text-2xl font-bold text-red-600">${payroll.lop_days}</div>
                            <div class="text-sm text-gray-600">LOP Days</div>
                        </div>
                    </div>
                </div>

                <!-- Salary Breakdown -->
                <div class="grid grid-cols-2 gap-8 mb-8">
                    <!-- Earnings -->
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                            Earnings
                        </h2>
                        <div class="space-y-3">
                            ${payroll.earnings && payroll.earnings.length > 0 ? 
                                payroll.earnings.map(earning => `
                                    <div class="flex justify-between py-2 border-b border-gray-100">
                                        <span class="capitalize text-gray-700">${earning.type.replace('_', ' ')}</span>
                                        <span class="font-medium">${formatCurrency(earning.amount)}</span>
                                    </div>
                                `).join('') : 
                                `<div class="flex justify-between py-2 border-b border-gray-100">
                                    <span class="text-gray-700">Gross Salary</span>
                                    <span class="font-medium">${formatCurrency(payroll.gross_salary)}</span>
                                </div>`
                            }
                            <div class="flex justify-between py-3 bg-green-50 px-3 rounded font-semibold text-green-700">
                                <span>Total Earnings</span>
                                <span>${formatCurrency(payroll.total_earnings || payroll.gross_salary)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Deductions -->
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                            Deductions
                        </h2>
                        <div class="space-y-3">
                            ${payroll.deductions && payroll.deductions.length > 0 ? 
                                payroll.deductions.map(deduction => `
                                    <div class="flex justify-between py-2 border-b border-gray-100">
                                        <span class="capitalize text-gray-700">${deduction.type.replace('_', ' ')}</span>
                                        <span class="font-medium">${formatCurrency(deduction.amount)}</span>
                                    </div>
                                `).join('') : 
                                '<div class="text-gray-500 py-2">No deductions</div>'
                            }
                            <div class="flex justify-between py-3 bg-red-50 px-3 rounded font-semibold text-red-700">
                                <span>Total Deductions</span>
                                <span>${formatCurrency(payroll.total_deductions || 0)}</span>
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
                    <div class="mt-4 text-xs">
                        <p>For any queries regarding this payslip, please contact HR Department.</p>
                        <p>Email: hr@company.com | Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
            </div>
        `;
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Payroll Details</h1>
                        <p className="text-gray-600">View payroll information</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href="/payroll"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back to Payroll
                        </Link>
                        {payroll.status === 'generated' && (
                            <Link
                                href={`/payroll/${payroll.id}/edit`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Edit Payroll
                            </Link>
                        )}
                        <button
                            onClick={handleExportPDF}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Employee Information</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Employee Name
                                </label>
                                <p className="text-gray-900">{payroll.user?.name || 'Unknown'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <p className="text-gray-900">{payroll.user?.email || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pay Period
                                </label>
                                <p className="text-gray-900">{payroll.pay_period}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Period Duration
                                </label>
                                <p className="text-gray-900">
                                    {new Date(payroll.period_start).toLocaleDateString()} - {new Date(payroll.period_end).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pay Date
                                </label>
                                <p className="text-gray-900">{new Date(payroll.pay_date).toLocaleDateString()}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(payroll.status)}`}>
                                    {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Attendance Summary</h3>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-700">Working Days:</span>
                                <span className="font-medium">{payroll.working_days}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-700">Present Days:</span>
                                <span className="font-medium text-green-600">{payroll.present_days}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-700">Leave Days:</span>
                                <span className="font-medium text-blue-600">{payroll.leave_days}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-700">LOP Days:</span>
                                <span className="font-medium text-red-600">{payroll.lop_days}</span>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Attendance %:</span>
                                    <span className="font-medium">
                                        {((payroll.present_days / payroll.working_days) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Salary Breakdown</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">Earnings</h4>
                            <div className="space-y-2">
                                {payroll.earnings && payroll.earnings.length > 0 ? (
                                    payroll.earnings.map((earning, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="text-gray-700 capitalize">{earning.type.replace('_', ' ')}:</span>
                                            <span className="font-medium">{formatCurrency(earning.amount)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Gross Salary:</span>
                                        <span className="font-medium">{formatCurrency(payroll.gross_salary)}</span>
                                    </div>
                                )}
                                <div className="border-t pt-2">
                                    <div className="flex justify-between font-medium">
                                        <span>Total Earnings:</span>
                                        <span className="text-green-600">{formatCurrency(payroll.total_earnings || payroll.gross_salary)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">Deductions</h4>
                            <div className="space-y-2">
                                {payroll.deductions && payroll.deductions.length > 0 ? (
                                    payroll.deductions.map((deduction, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="text-gray-700 capitalize">{deduction.type.replace('_', ' ')}:</span>
                                            <span className="font-medium">{formatCurrency(deduction.amount)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500">No deductions</div>
                                )}
                                <div className="border-t pt-2">
                                    <div className="flex justify-between font-medium">
                                        <span>Total Deductions:</span>
                                        <span className="text-red-600">{formatCurrency(payroll.total_deductions || 0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">Net Salary</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {formatCurrency(payroll.net_salary)}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Final Amount
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {formatCurrency(payroll.total_earnings || payroll.gross_salary)} - {formatCurrency(payroll.total_deductions || 0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {(payroll.approved_at || payroll.paid_at) && (
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Approval & Payment History</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Created By
                                </label>
                                <p className="text-gray-900">{payroll.creator?.name || 'Unknown'}</p>
                            </div>

                            {payroll.approved_at && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Approved By
                                    </label>
                                    <p className="text-gray-900">
                                        {payroll.approver?.name || 'Unknown'} on {new Date(payroll.approved_at).toLocaleDateString()}
                                    </p>
                                </div>
                            )}

                            {payroll.paid_at && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Paid On
                                    </label>
                                    <p className="text-gray-900">{new Date(payroll.paid_at).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}