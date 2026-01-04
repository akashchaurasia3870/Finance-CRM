import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function NewReport() {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/reports', data, {
            onSuccess: () => {
                router.visit('/reports');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Create Report</h1>
                        <p className="text-theme-secondary">Generate a new report</p>
                    </div>
                    <Link href="/reports">
                        <ThemedButton variant="secondary">Back to Reports</ThemedButton>
                    </Link>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-end space-x-3">
                            <Link href="/reports">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton
                                type="submit"
                                disabled={processing}
                                variant="primary"
                            >
                                {processing ? 'Creating...' : 'Create Report'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
