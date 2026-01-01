import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function AddressDetail({ address }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this address?')) {
            router.delete(`/address/${address.id}`, {
                onSuccess: () => {
                    router.visit('/address');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Address Details</h1>
                        <p className="text-gray-600">View address information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/address"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/address/${address.id}/edit`}
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
                        <h3 className="text-lg font-medium">Address Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            {address.user && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Associated User</label>
                                    <p className="mt-1 text-sm text-gray-900">{address.user.name}</p>
                                    <p className="text-xs text-gray-500">{address.user.email}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Type</label>
                                <span className="mt-1 inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                    {address.type}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-500">Address Line 1</label>
                                <p className="mt-1 text-sm text-gray-900">{address.address_line_1}</p>
                            </div>
                            {address.address_line_2 && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">Address Line 2</label>
                                    <p className="mt-1 text-sm text-gray-900">{address.address_line_2}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">City</label>
                                <p className="mt-1 text-sm text-gray-900">{address.city}</p>
                            </div>
                            {address.state && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">State</label>
                                    <p className="mt-1 text-sm text-gray-900">{address.state}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Country</label>
                                <p className="mt-1 text-sm text-gray-900">{address.country}</p>
                            </div>
                            {address.postal_code && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Postal Code</label>
                                    <p className="mt-1 text-sm text-gray-900">{address.postal_code}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(address.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(address.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {address.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{address.creator.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Full Address</h3>
                    </div>
                    <div className="p-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-gray-900">
                                {address.address_line_1}
                                {address.address_line_2 && <><br />{address.address_line_2}</>}
                                <br />
                                {address.city}
                                {address.state && `, ${address.state}`}
                                {address.postal_code && ` - ${address.postal_code}`}
                                <br />
                                {address.country}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}