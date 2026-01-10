import React from 'react';
import { ThemedCard } from '@/Components/ThemedComponents';

const Chart = ({ title, type = 'line', data, options = {}, height = '300px' }) => {
    // Simple chart implementation - in production, you'd use Chart.js or similar
    const renderLineChart = () => {
        if (!data || !data.labels || !data.data) return null;
        
        const maxValue = Math.max(...data.data);
        const points = data.data.map((value, index) => {
            const x = (index / (data.labels.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 80;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    points={points}
                    className="text-primary-color"
                />
                {data.data.map((value, index) => {
                    const x = (index / (data.labels.length - 1)) * 100;
                    const y = 100 - (value / maxValue) * 80;
                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="2"
                            fill="currentColor"
                            className="text-primary-color"
                        />
                    );
                })}
            </svg>
        );
    };

    const renderBarChart = () => {
        if (!data || !data.labels || !data.data) return null;
        
        const maxValue = Math.max(...data.data);
        
        return (
            <div className="flex items-end justify-between h-full px-4">
                {data.data.map((value, index) => {
                    const height = (value / maxValue) * 100;
                    return (
                        <div key={index} className="flex flex-col items-center flex-1 mx-1">
                            <div
                                className="bg-primary-color rounded-t w-full min-w-[20px]"
                                style={{ height: `${height}%` }}
                            />
                            <span className="text-xs text-theme-secondary mt-2 truncate">
                                {data.labels[index]}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderPieChart = () => {
        if (!data || !data.labels || !data.data) return null;
        
        const total = data.data.reduce((sum, value) => sum + value, 0);
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        
        return (
            <div className="flex items-center justify-center h-full">
                <div className="relative">
                    <svg viewBox="0 0 100 100" className="w-32 h-32">
                        {data.data.map((value, index) => {
                            const percentage = (value / total) * 100;
                            const angle = (percentage / 100) * 360;
                            const startAngle = data.data.slice(0, index).reduce((sum, v) => sum + (v / total) * 360, 0);
                            
                            const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                            const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                            const x2 = 50 + 40 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
                            const y2 = 50 + 40 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
                            
                            const largeArcFlag = angle > 180 ? 1 : 0;
                            
                            return (
                                <path
                                    key={index}
                                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                    fill={colors[index % colors.length]}
                                />
                            );
                        })}
                    </svg>
                </div>
                <div className="ml-4">
                    {data.labels.map((label, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <div
                                className="w-3 h-3 rounded mr-2"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <span className="text-sm text-theme-secondary">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderChart = () => {
        switch (type) {
            case 'bar':
                return renderBarChart();
            case 'pie':
                return renderPieChart();
            case 'line':
            default:
                return renderLineChart();
        }
    };

    return (
        <ThemedCard className="p-6">
            <h3 className="text-lg font-semibold text-theme-primary mb-4">{title}</h3>
            <div style={{ height }} className="w-full">
                {renderChart()}
            </div>
        </ThemedCard>
    );
};

export default Chart;