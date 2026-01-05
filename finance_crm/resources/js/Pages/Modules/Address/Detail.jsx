import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

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
                        <h1 className="text-2xl font-bold text-theme-primary">Address Details</h1>
                        <p className="text-theme-secondary">View address information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/address">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/address/${address.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Address Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            {address.user && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Associated User</label>
                                    <p className="mt-1 text-sm text-theme-primary">{address.user.name}</p>
                                    <p className="text-xs text-theme-secondary">{address.user.email}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Type</label>
                                <div className="mt-1">
                                    <ThemedBadge variant="info">
                                        {address.type}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-theme-muted">Address Line 1</label>
                                <p className="mt-1 text-sm text-theme-primary">{address.address_line_1}</p>
                            </div>
                            {address.address_line_2 && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-theme-muted">Address Line 2</label>
                                    <p className="mt-1 text-sm text-theme-primary">{address.address_line_2}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">City</label>
                                <p className="mt-1 text-sm text-theme-primary">{address.city}</p>
                            </div>
                            {address.state && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">State</label>
                                    <p className="mt-1 text-sm text-theme-primary">{address.state}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Country</label>
                                <p className="mt-1 text-sm text-theme-primary">{address.country}</p>
                            </div>
                            {address.postal_code && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Postal Code</label>
                                    <p className="mt-1 text-sm text-theme-primary">{address.postal_code}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(address.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(address.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {address.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{address.creator.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemedCard>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Full Address</h3>
                    </div>
                    <div className="p-6">
                        <div className="bg-theme-surface p-4 rounded-md">
                            <p className="text-theme-primary">
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
                </ThemedCard>
            </div>
        </Layout>
    );
}
