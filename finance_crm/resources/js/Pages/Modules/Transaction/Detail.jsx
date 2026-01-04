import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function TransactionDetail({ transaction }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            router.delete(`/transaction/${transaction.id}`, {
                onSuccess: () => {
                    router.visit('/transaction');
                }
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    const getTransactionTypeColor = (type) => {
        const colors = {
            'buy': 'bg-green-100 text-green-800',
            'sell': 'bg-red-100 text-red-800',
            'deposit': 'bg-blue-100 text-blue-800',
            'withdraw': 'bg-orange-100 text-orange-800',
            'margin_use': 'bg-purple-100 text-purple-800',
            'margin_repay': 'bg-indigo-100 text-indigo-800',
            'dividend': 'bg-yellow-100 text-yellow-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Transaction Details</h1>
                        <p className="text-gray-600">Reference: {transaction.reference || 'N/A'}</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/transaction"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/transaction/${transaction.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* Transaction Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Transaction Type</h3>
                        <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getTransactionTypeColor(transaction.transaction_type)}`}>
                            {transaction.transaction_type}
                        </span>
                    </div>
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Amount</h3>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(transaction.amount)}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Net Amount</h3>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(transaction.net_amount)}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Status</h3>
                        <span className={`inline-flex px-3 py-1 text-sm rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {transaction.status}
                        </span>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Transaction Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Transaction Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(transaction.transaction_date).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(transaction.created_at).toLocaleString()}
                                </p>
                            </div>
                            {transaction.quantity && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Quantity</label>
                                    <p className="mt-1 text-sm text-gray-900">{transaction.quantity}</p>
                                </div>
                            )}
                            {transaction.price && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Price per Unit</label>
                                    <p className="mt-1 text-sm text-gray-900">{formatCurrency(transaction.price)}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Fees</label>
                                <p className="mt-1 text-sm text-gray-900">{formatCurrency(transaction.fees)}</p>
                            </div>
                        </div>
                        {transaction.notes && (
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Notes</label>
                                <p className="mt-1 text-sm text-gray-900">{transaction.notes}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Portfolio Information */}
                {transaction.portfolio && (
                    <div className="bg-white border rounded-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-medium">Portfolio Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Portfolio Name</label>
                                    <p className="mt-1 text-sm text-gray-900">{transaction.portfolio.portfolio_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Portfolio Number</label>
                                    <p className="mt-1 text-sm text-gray-900">{transaction.portfolio.portfolio_no}</p>
                                </div>
                                {transaction.portfolio.client && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Client Name</label>
                                            <p className="mt-1 text-sm text-gray-900">{transaction.portfolio.client.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Client Email</label>
                                            <p className="mt-1 text-sm text-gray-900">{transaction.portfolio.client.email}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Information */}
                {transaction.product && (
                    <div className="bg-white border rounded-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-medium">Product Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Product Name</label>
                                    <p className="mt-1 text-sm text-gray-900">{transaction.product.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Symbol</label>
                                    <p className="mt-1 text-sm text-gray-900">{transaction.product.symbol}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Product Type</label>
                                    <p className="mt-1 text-sm text-gray-900">{transaction.product.product_type}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Sector</label>
                                    <p className="mt-1 text-sm text-gray-900">{transaction.product.sector || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}