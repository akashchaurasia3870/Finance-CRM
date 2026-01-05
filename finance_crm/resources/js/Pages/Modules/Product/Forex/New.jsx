import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function NewForex() {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/forex', data, {
            onSuccess: () => {
                router.visit('/forex');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Create Forex</h1>
                        <p className="text-theme-secondary">Add a new forex product</p>
                    </div>
                    <Link href="/forex">
                        <ThemedButton variant="secondary">Back to Forex</ThemedButton>
                    </Link>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-end space-x-3">
                            <Link href="/forex">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton
                                type="submit"
                                disabled={processing}
                                variant="primary"
                            >
                                {processing ? 'Creating...' : 'Create Forex'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
