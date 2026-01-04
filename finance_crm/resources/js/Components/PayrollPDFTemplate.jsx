import React from 'react';

export default function PayrollPDFTemplate({ payroll }) {
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

    return (
        <div className="bg-white p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <div className="border-b-2 border-blue-600 pb-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-600">PAYSLIP</h1>
                        <p className="text-gray-600 mt-1">Finance CRM System</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Generated on</p>
                        <p className="font-semibold">{formatDate(new Date())}</p>
                    </div>
                </div>
            </div>

            {/* Employee Information */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                        Employee Information
                    </h2>
                    <div className="space-y-2">
                        <div className="flex">
                            <span className="w-24 text-gray-600">Name:</span>
                            <span className="font-medium">{payroll.user?.name || 'N/A'}</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-600">Email:</span>
                            <span className="font-medium">{payroll.user?.email || 'N/A'}</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-600">Employee ID:</span>
                            <span className="font-medium">EMP-{payroll.user?.id || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                        Pay Period Information
                    </h2>
                    <div className="space-y-2">
                        <div className="flex">
                            <span className="w-24 text-gray-600">Period:</span>
                            <span className="font-medium">{payroll.pay_period}</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-600">From:</span>
                            <span className="font-medium">{formatDate(payroll.period_start)}</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-600">To:</span>
                            <span className="font-medium">{formatDate(payroll.period_end)}</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-600">Pay Date:</span>
                            <span className="font-medium">{formatDate(payroll.pay_date)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Summary */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                    Attendance Summary
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-2xl font-bold text-blue-600">{payroll.working_days}</div>
                        <div className="text-sm text-gray-600">Working Days</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-2xl font-bold text-green-600">{payroll.present_days}</div>
                        <div className="text-sm text-gray-600">Present Days</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded">
                        <div className="text-2xl font-bold text-yellow-600">{payroll.leave_days}</div>
                        <div className="text-sm text-gray-600">Leave Days</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded">
                        <div className="text-2xl font-bold text-red-600">{payroll.lop_days}</div>
                        <div className="text-sm text-gray-600">LOP Days</div>
                    </div>
                </div>
            </div>

            {/* Salary Breakdown */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Earnings */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                        Earnings
                    </h2>
                    <div className="space-y-3">
                        {payroll.earnings && payroll.earnings.length > 0 ? (
                            payroll.earnings.map((earning, index) => (
                                <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="capitalize text-gray-700">
                                        {earning.type.replace('_', ' ')}
                                    </span>
                                    <span className="font-medium">{formatCurrency(earning.amount)}</span>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-700">Gross Salary</span>
                                <span className="font-medium">{formatCurrency(payroll.gross_salary)}</span>
                            </div>
                        )}
                        <div className="flex justify-between py-3 bg-green-50 px-3 rounded font-semibold text-green-700">
                            <span>Total Earnings</span>
                            <span>{formatCurrency(payroll.total_earnings || payroll.gross_salary)}</span>
                        </div>
                    </div>
                </div>

                {/* Deductions */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                        Deductions
                    </h2>
                    <div className="space-y-3">
                        {payroll.deductions && payroll.deductions.length > 0 ? (
                            payroll.deductions.map((deduction, index) => (
                                <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="capitalize text-gray-700">
                                        {deduction.type.replace('_', ' ')}
                                    </span>
                                    <span className="font-medium">{formatCurrency(deduction.amount)}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 py-2">No deductions</div>
                        )}
                        <div className="flex justify-between py-3 bg-red-50 px-3 rounded font-semibold text-red-700">
                            <span>Total Deductions</span>
                            <span>{formatCurrency(payroll.total_deductions || 0)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Net Salary */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Net Salary</h2>
                    <div className="text-4xl font-bold mb-2">{formatCurrency(payroll.net_salary)}</div>
                    <div className="text-blue-100 text-sm">
                        {formatCurrency(payroll.total_earnings || payroll.gross_salary)} - {formatCurrency(payroll.total_deductions || 0)}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
                <p>This is a computer-generated payslip and does not require a signature.</p>
                <p className="mt-2">
                    Generated by Finance CRM System | 
                    <span className="ml-1">Payroll ID: {payroll.id}</span>
                </p>
                <div className="mt-4 text-xs">
                    <p>For any queries regarding this payslip, please contact HR Department.</p>
                    <p>Email: hr@company.com | Phone: +1 (555) 123-4567</p>
                </div>
            </div>
        </div>
    );
}