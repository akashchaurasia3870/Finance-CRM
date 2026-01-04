import React from 'react';
import { useTheme } from './ThemeProvider';

// Theme-aware Card component
export const ThemedCard = ({ children, className = '', ...props }) => {
    return (
        <div 
            className={`bg-theme-primary border border-theme rounded-lg shadow-sm ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// Theme-aware Button component
export const ThemedButton = ({ 
    children, 
    variant = 'primary', 
    className = '', 
    ...props 
}) => {
    const variantClasses = {
        primary: 'bg-primary text-white hover:opacity-90',
        secondary: 'bg-secondary text-white hover:opacity-90',
        accent: 'bg-accent text-white hover:opacity-90',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-primary text-primary-color hover:bg-primary hover:text-white',
        ghost: 'text-theme-primary hover:bg-theme-tertiary border border-theme'
    };

    return (
        <button 
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Theme-aware Table component
export const ThemedTable = ({ children, className = '', ...props }) => {
    return (
        <div className={`overflow-x-auto ${className}`}>
            <table 
                className="min-w-full divide-y divide-theme border border-theme"
                {...props}
            >
                {children}
            </table>
        </div>
    );
};

export const ThemedTableHeader = ({ children, className = '', ...props }) => {
    return (
        <thead className={`bg-theme-tertiary ${className}`} {...props}>
            {children}
        </thead>
    );
};

export const ThemedTableBody = ({ children, className = '', ...props }) => {
    return (
        <tbody className={`bg-theme-primary divide-y divide-theme ${className}`} {...props}>
            {children}
        </tbody>
    );
};

export const ThemedTableRow = ({ children, className = '', ...props }) => {
    return (
        <tr className={`hover:bg-theme-secondary transition-colors ${className}`} {...props}>
            {children}
        </tr>
    );
};

export const ThemedTableCell = ({ children, className = '', header = false, ...props }) => {
    const Tag = header ? 'th' : 'td';
    const baseClasses = header 
        ? 'px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider'
        : 'px-6 py-4 whitespace-nowrap text-sm text-theme-primary';
    
    return (
        <Tag className={`${baseClasses} ${className}`} {...props}>
            {children}
        </Tag>
    );
};

// Theme-aware Input component
export const ThemedInput = ({ className = '', ...props }) => {
    return (
        <input 
            className={`w-[50%] px-3 py-2 border border-theme rounded-md bg-theme-primary text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...props}
        />
    );
};

// Theme-aware Select component
export const ThemedSelect = ({ children, className = '', ...props }) => {
    return (
        <select 
            className={`w-full px-3 py-2 border border-theme rounded-md bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...props}
        >
            {children}
        </select>
    );
};

// Theme-aware Badge component
export const ThemedBadge = ({ 
    children, 
    variant = 'primary', 
    className = '', 
    ...props 
}) => {
    const variantClasses = {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        accent: 'bg-accent text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    return (
        <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};