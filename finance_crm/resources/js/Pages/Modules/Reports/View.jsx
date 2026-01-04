import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedSelect, ThemedBadge } from '@/Components/ThemedComponents';

export default function ReportsView({ reports = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            report.type?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || report.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Reports</h1>
                        <p className="text-theme-secondary">Generate and view financial reports</p>
                    </div>
                    <ThemedButton variant="primary">Generate Report</ThemedButton>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center gap-4">
                            <h3 className="text-lg font-medium text-theme-primary">Available Reports</h3>
                            <div className="flex gap-4">
                                <ThemedSelect
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-48"
                                >
                                    <option value="all">All Types</option>
                                    <option value="financial">Financial</option>
                                    <option value="client">Client</option>
                                    <option value="performance">Performance</option>
                                </ThemedSelect>
                                <ThemedInput
                                    type="text"
                                    placeholder="Search reports..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Report Name</ThemedTableCell>
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Last Generated</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredReports.length > 0 ? filteredReports.map((report, index) => (
                                <ThemedTableRow key={report.id || index}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{report.name || 'Sample Report'}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {report.type || 'Financial'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={report.status === 'ready' ? 'success' : 'warning'}>
                                            {report.status || 'Ready'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {report.last_generated ? new Date(report.last_generated).toLocaleDateString() : 'Never'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="flex space-x-2">
                                            <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            <ThemedButton variant="ghost" className="text-xs px-2 py-1">Download</ThemedButton>
                                            <ThemedButton variant="ghost" className="text-xs px-2 py-1">Generate</ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                // Sample data when no reports exist
                                ['Financial Summary', 'Client Portfolio', 'Performance Analysis'].map((name, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{name}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {index === 0 ? 'Financial' : index === 1 ? 'Client' : 'Performance'}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant="success">Ready</ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {new Date().toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="flex space-x-2">
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Download</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Generate</ThemedButton>
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