import React, { useState } from 'react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

const FilterPanel = ({ onFilterChange, filters = {} }) => {
    const [activeFilters, setActiveFilters] = useState({
        dateRange: '30',
        status: 'all',
        type: 'all',
        ...filters
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...activeFilters, [key]: value };
        setActiveFilters(newFilters);
        onFilterChange(newFilters);
    };

    const dateRangeOptions = [
        { value: '7', label: 'Last 7 days' },
        { value: '30', label: 'Last 30 days' },
        { value: '90', label: 'Last 3 months' },
        { value: '365', label: 'Last year' }
    ];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const typeOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'meeting', label: 'Meetings' },
        { value: 'task', label: 'Tasks' },
        { value: 'event', label: 'Events' },
        { value: 'call', label: 'Calls' }
    ];

    return (
        <ThemedCard className="p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-theme-secondary">Date Range:</label>
                    <select
                        value={activeFilters.dateRange}
                        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-color"
                    >
                        {dateRangeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-theme-secondary">Status:</label>
                    <select
                        value={activeFilters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-color"
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-theme-secondary">Type:</label>
                    <select
                        value={activeFilters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-color"
                    >
                        {typeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                        <ThemedButton
                            onClick={() => {
                                const resetFilters = { dateRange: '30', status: 'all', type: 'all' };
                                setActiveFilters(resetFilters);
                                onFilterChange(resetFilters);
                            }}
                            variant="secondary"
                            size="sm"
                        >
                            Reset Filters
                        </ThemedButton>
            </div>
        </ThemedCard>
    );
};

export default FilterPanel;