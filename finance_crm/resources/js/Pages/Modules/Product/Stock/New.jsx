import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function NewStock() {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/stock', data, {
            onSuccess: () => {
                router.visit('/stock');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Create Stock</h1>
                        <p className="text-theme-secondary">Add a new stock product</p>
                    </div>
                    <Link href="/stock">
                        <ThemedButton variant="secondary">Back to Stocks</ThemedButton>
                    </Link>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-end space-x-3">
                            <Link href="/stock">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton
                                type="submit"
                                disabled={processing}
                                variant="primary"
                            >
                                {processing ? 'Creating...' : 'Create Stock'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
