import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function NewPosition({ portfolios = [], products = [] }) {
    const [data, setData] = useState({
        portfolio_id: '',
        product_id: '',
        quantity: 0,
        avg_price: 0,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/position', data, {
            onSuccess: () => {
                router.visit('/position');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    const marketValue = (data.quantity * data.avg_price).toFixed(2);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create</h1>
                        <p className="text-gray-600">Add a new security position to the system</p>
                    </div>
                    <Link
                        href="/position"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Portfolio *
                            </label>
                            <select
                                value={data.portfolio_id}
                                onChange={(e) => setData({...data, portfolio_id: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Portfolio</option>
                                {portfolios.map((portfolio) => (
                                    <option key={portfolio.id} value={portfolio.id}>
                                        {portfolio.portfolio_name} ({portfolio.portfolio_no})
                                    </option>
                                ))}
                            </select>
                            {errors.portfolio_id && <p className="text-red-500 text-sm mt-1">{errors.portfolio_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product *
                            </label>
                            <select
                                value={data.product_id}
                                onChange={(e) => setData({...data, product_id: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} ({product.symbol})
                                    </option>
                                ))}
                            </select>
                            {errors.product_id && <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                step="0.000001"
                                value={data.quantity}
                                onChange={(e) => setData({...data, quantity: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Average Price *
                            </label>
                            <input
                                type="number"
                                step="0.000001"
                                value={data.avg_price}
                                onChange={(e) => setData({...data, avg_price: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.avg_price && <p className="text-red-500 text-sm mt-1">{errors.avg_price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Market Value (Calculated)
                            </label>
                            <input
                                type="text"
                                value={`$${marketValue}`}
                                disabled
                                className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/position"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}