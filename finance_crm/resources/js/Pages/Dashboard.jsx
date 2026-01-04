import React from 'react';
import Layout from '@/Layouts/Layout';
import { ThemedCard } from '@/Components/ThemedComponents';

export default function Dashboard() {
    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-theme-primary">Dashboard</h1>
                    <p className="text-theme-secondary">Welcome to Finance CRM Dashboard</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-semibold text-theme-primary">Total Users</h3>
                        <p className="text-3xl font-bold text-primary-color">1,234</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-semibold text-theme-primary">Active Clients</h3>
                        <p className="text-3xl font-bold text-secondary-color">856</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-semibold text-theme-primary">Pending Tasks</h3>
                        <p className="text-3xl font-bold text-accent">42</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-semibold text-theme-primary">Total Revenue</h3>
                        <p className="text-3xl font-bold text-primary-color">$125K</p>
                    </ThemedCard>
                </div>
            </div>
        </Layout>
    );
}