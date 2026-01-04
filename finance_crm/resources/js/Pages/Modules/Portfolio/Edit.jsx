import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function EditPortfolio({ portfolio, accounts = [] }) {
    const [data, setData] = useState({
        portfolio_name: portfolio.portfolio_name || '',
        portfolio_no: portfolio.portfolio_no || '',
        account_id: portfolio.account_id || '',
        status: portfolio.status || 'active',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/portfolio/${portfolio.id}`, data, {
            onSuccess: () => {
                router.visit('/portfolio');
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
                        <h1 className="text-2xl font-bold text-gray-900">Edit</h1>
                        <p className="text-gray-600">Update portfolio information</p>
                    </div>
                    <Link
                        href="/portfolio"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Portfolio Name *
                            </label>
                            <input
                                type="text"
                                value={data.portfolio_name}
                                onChange={(e) => setData({...data, portfolio_name: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.portfolio_name && <p className="text-red-500 text-sm mt-1">{errors.portfolio_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Portfolio Number
                            </label>
                            <input
                                type="text"
                                value={data.portfolio_no}
                                onChange={(e) => setData({...data, portfolio_no: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.portfolio_no && <p className="text-red-500 text-sm mt-1">{errors.portfolio_no}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account *
                            </label>
                            <select
                                value={data.account_id}
                                onChange={(e) => setData({...data, account_id: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Account</option>
                                {accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.name} ({account.account_no})
                                    </option>
                                ))}
                            </select>
                            {errors.account_id && <p className="text-red-500 text-sm mt-1">{errors.account_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status *
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData({...data, status: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="closed">Closed</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/portfolio"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}