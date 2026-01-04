import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function ProductDetail({ product }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/product/${product.id}`, {
                onSuccess: () => {
                    router.visit('/product');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
                        <p className="text-gray-600">View product information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/product"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/product/${product.id}/edit`}
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

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Basic Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-sm text-gray-900">{product.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Symbol</label>
                                <p className="mt-1 text-sm text-gray-900">{product.symbol || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Product Type</label>
                                <span className="mt-1 inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                    {product.product_type}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Sector</label>
                                <p className="mt-1 text-sm text-gray-900">{product.sector || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Risk Level</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    product.risk_level === 'low' ? 'bg-green-100 text-green-800' :
                                    product.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    product.risk_level === 'high' ? 'bg-orange-100 text-orange-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {product.risk_level}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    product.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(product.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(product.updated_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        {product.description && (
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Description</label>
                                <p className="mt-1 text-sm text-gray-900">{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}