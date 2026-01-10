import React from 'react';
import { ThemedCard } from '@/Components/ThemedComponents';

const StatCard = ({ title, value, icon, color = 'primary', trend, subtitle }) => {
    const colorClasses = {
        primary: 'text-primary-color',
        secondary: 'text-secondary-color',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600',
        info: 'text-blue-600'
    };

    const bgColorClasses = {
        primary: 'bg-primary-color/10',
        secondary: 'bg-secondary-color/10',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        danger: 'bg-red-100',
        info: 'bg-blue-100'
    };

    return (
        <ThemedCard className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-theme-secondary mb-1">{title}</h3>
                    <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
                    {subtitle && (
                        <p className="text-xs text-theme-secondary mt-1">{subtitle}</p>
                    )}
                    {trend && (
                        <div className={`flex items-center mt-2 text-sm ${
                            trend.direction === 'up' ? 'text-green-600' : 
                            trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                            <span className="mr-1">
                                {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'}
                            </span>
                            {trend.value}% {trend.period}
                        </div>
                    )}
                </div>
                {icon && (
                    <div className={`p-3 rounded-lg ${bgColorClasses[color]}`}>
                        <div className={`text-2xl ${colorClasses[color]}`}>
                            {icon}
                        </div>
                    </div>
                )}
            </div>
        </ThemedCard>
    );
};

export default StatCard;