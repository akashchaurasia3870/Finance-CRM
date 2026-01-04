import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function CampaignsView({ campaigns = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCampaigns = campaigns.filter(campaign => 
        (campaign.name && campaign.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (campaign.type && campaign.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this campaign?')) {
            router.delete(`/campaigns/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        switch(status) {
            case 'draft': return 'info';
            case 'active': return 'success';
            case 'paused': return 'warning';
            case 'completed': return 'primary';
            case 'cancelled': return 'error';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Campaigns</h1>
                        <p className="text-theme-secondary">Manage marketing campaigns</p>
                    </div>
                    <Link href="/campaigns/new">
                        <ThemedButton variant="primary">Create Campaign</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Campaigns List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search campaigns..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Name</ThemedTableCell>
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Budget</ThemedTableCell>
                                <ThemedTableCell header>Start Date</ThemedTableCell>
                                <ThemedTableCell header>End Date</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredCampaigns.length > 0 ? filteredCampaigns.map((campaign) => (
                                <ThemedTableRow key={campaign.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{campaign.name}</div>
                                        {campaign.description && (
                                            <div className="text-sm text-theme-muted">{campaign.description.substring(0, 50)}...</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {campaign.type || 'Email'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(campaign.status || 'draft')}>
                                            {campaign.status || 'Draft'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {campaign.budget ? `$${campaign.budget}` : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {campaign.start_date ? new Date(campaign.start_date).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/campaigns/${campaign.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/campaigns/${campaign.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(campaign.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                // Sample data when no campaigns exist
                                ['Email Newsletter', 'Social Media Ads', 'Product Launch'].map((name, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{name}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {index === 0 ? 'Email' : index === 1 ? 'Social' : 'Product'}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={index === 0 ? 'success' : index === 1 ? 'warning' : 'info'}>
                                                {index === 0 ? 'Active' : index === 1 ? 'Paused' : 'Draft'}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            ${(index + 1) * 1000}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {new Date().toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="space-x-2">
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1 text-red-600 hover:text-red-800">Delete</ThemedButton>
                                            </div>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
