import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link, usePage } from '@inertiajs/react';

export default function Branding() {
    const [activeTab, setActiveTab] = useState('themes');
    const { branding: existingBranding } = usePage().props;
    
    const { data, setData, put, processing } = useForm({
        primary_color: existingBranding?.primary_color || '#3B82F6',
        secondary_color: existingBranding?.secondary_color || '#10B981',
        accent_color: existingBranding?.accent_color || '#F59E0B',
        background_color: existingBranding?.background_color || '#F9FAFB',
        text_color: existingBranding?.text_color || '#111827',
        font_family: existingBranding?.font_family || 'Default',
        font_size: existingBranding?.font_size || 'medium',
        font_weight: existingBranding?.font_weight || 'normal',
        logo_url: existingBranding?.logo_url || '',
        favicon_url: existingBranding?.favicon_url || '',
        login_background: existingBranding?.login_background || '',
        company_name: existingBranding?.company_name || 'Finance CRM',
        theme: existingBranding?.theme || 'light',
        banner_template: existingBranding?.banner_template || 'default',
        banner_background: existingBranding?.banner_background || '',
        banner_quote: existingBranding?.banner_quote || 'Welcome to Finance CRM - Your Success is Our Priority'
    });

    // Apply theme changes immediately for preview
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', data.primary_color);
        root.style.setProperty('--secondary-color', data.secondary_color);
        root.style.setProperty('--accent-color', data.accent_color);
        root.style.setProperty('--background-color', data.background_color);
        root.style.setProperty('--text-color', data.text_color);
        
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${data.theme}`);
    }, [data.primary_color, data.secondary_color, data.accent_color, data.background_color, data.text_color, data.theme]);

    const themes = [
        { 
            name: 'Light', 
            value: 'light', 
            colors: { 
                primary: '#3B82F6', 
                secondary: '#10B981', 
                accent: '#F59E0B', 
                bg: '#FFFFFF', 
                text: '#111827', 
                cardBg: '#F9FAFB',
                buttonText: '#FFFFFF'
            } 
        },
        { 
            name: 'Dark', 
            value: 'dark', 
            colors: { 
                primary: '#60A5FA', 
                secondary: '#34D399', 
                accent: '#FBBF24', 
                bg: '#1F2937', 
                text: '#F9FAFB', 
                cardBg: '#374151',
                buttonText: '#111827'
            } 
        },
        { 
            name: 'Warm', 
            value: 'warm', 
            colors: { 
                primary: '#F59E0B', 
                secondary: '#EF4444', 
                accent: '#EC4899', 
                bg: '#FEF3C7', 
                text: '#92400E', 
                cardBg: '#FFFFFF',
                buttonText: '#FFFFFF'
            } 
        },
        { 
            name: 'Cool', 
            value: 'cool', 
            colors: { 
                primary: '#06B6D4', 
                secondary: '#3B82F6', 
                accent: '#8B5CF6', 
                bg: '#E0F7FA', 
                text: '#0E7490', 
                cardBg: '#FFFFFF',
                buttonText: '#FFFFFF'
            } 
        },
        { 
            name: 'Cozy', 
            value: 'cozy', 
            colors: { 
                primary: '#D97706', 
                secondary: '#DC2626', 
                accent: '#7C2D12', 
                bg: '#FDF4E6', 
                text: '#92400E', 
                cardBg: '#FFFFFF',
                buttonText: '#FFFFFF'
            } 
        },
        { 
            name: 'Sunny', 
            value: 'sunny', 
            colors: { 
                primary: '#FBBF24', 
                secondary: '#F59E0B', 
                accent: '#EF4444', 
                bg: '#FFFBEB', 
                text: '#92400E', 
                cardBg: '#FFFFFF',
                buttonText: '#111827'
            } 
        },
        { 
            name: 'Monsoon', 
            value: 'monsoon', 
            colors: { 
                primary: '#059669', 
                secondary: '#0D9488', 
                accent: '#0891B2', 
                bg: '#ECFDF5', 
                text: '#065F46', 
                cardBg: '#FFFFFF',
                buttonText: '#FFFFFF'
            } 
        }
    ];

    const bannerTemplates = [
        { name: 'Default', value: 'default' },
        { name: 'Gradient', value: 'gradient' },
        { name: 'Minimal', value: 'minimal' },
        { name: 'Corporate', value: 'corporate' },
        { name: 'Creative', value: 'creative' }
    ];

    const fontFamilies = [
        'Default',
        'Inter',
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Poppins',
        'Source Sans Pro',
        'Arial',
        'Helvetica'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/settings/branding');
    };

    const applyTheme = (theme) => {
        const selectedTheme = themes.find(t => t.value === theme.value);
        setData({
            ...data,
            theme: theme.value,
            primary_color: selectedTheme.colors.primary,
            secondary_color: selectedTheme.colors.secondary,
            accent_color: selectedTheme.colors.accent,
            background_color: selectedTheme.colors.bg,
            text_color: selectedTheme.colors.text,
            font_family: theme.value === 'dark' ? 'Roboto' : theme.value === 'warm' ? 'Montserrat' : theme.value === 'cool' ? 'Open Sans' : 'Default',
            banner_template: theme.value === 'dark' ? 'minimal' : theme.value === 'warm' ? 'creative' : theme.value === 'cool' ? 'corporate' : 'default'
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/settings" className="text-blue-600 hover:text-blue-800">
                        ← Back to Settings
                    </Link>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Branding & UI Settings</h1>
                    <p className="text-gray-600">Customize colors, fonts, and UI appearance</p>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {['themes', 'typography', 'logos', 'banners', 'layout'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Themes Tab */}
                    {activeTab === 'themes' && (
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Selection</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {themes.map((theme) => (
                                    <div
                                        key={theme.value}
                                        onClick={() => applyTheme(theme)}
                                        className={`cursor-pointer border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
                                            data.theme === theme.value ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        {/* Theme Preview Card */}
                                        <div 
                                            className="rounded-lg p-4 mb-3 relative overflow-hidden"
                                            style={{ backgroundColor: theme.colors.bg }}
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 
                                                    className="text-sm font-semibold"
                                                    style={{ color: theme.colors.text }}
                                                >
                                                    Finance CRM
                                                </h4>
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                                </div>
                                            </div>
                                            
                                            {/* Content Card */}
                                            <div 
                                                className="rounded p-3 mb-3"
                                                style={{ backgroundColor: theme.colors.cardBg }}
                                            >
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div 
                                                        className="w-3 h-3 rounded"
                                                        style={{ backgroundColor: theme.colors.primary }}
                                                    ></div>
                                                    <div 
                                                        className="h-2 bg-gray-300 rounded flex-1"
                                                        style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
                                                    ></div>
                                                </div>
                                                <div 
                                                    className="h-1 bg-gray-200 rounded mb-1"
                                                    style={{ backgroundColor: theme.colors.text, opacity: 0.2 }}
                                                ></div>
                                                <div 
                                                    className="h-1 bg-gray-200 rounded w-3/4"
                                                    style={{ backgroundColor: theme.colors.text, opacity: 0.2 }}
                                                ></div>
                                            </div>
                                            
                                            {/* Buttons */}
                                            <div className="flex space-x-2">
                                                <div 
                                                    className="px-3 py-1 rounded text-xs font-medium"
                                                    style={{ 
                                                        backgroundColor: theme.colors.primary,
                                                        color: theme.colors.buttonText
                                                    }}
                                                >
                                                    Primary
                                                </div>
                                                <div 
                                                    className="px-3 py-1 rounded text-xs font-medium"
                                                    style={{ 
                                                        backgroundColor: theme.colors.secondary,
                                                        color: theme.colors.buttonText
                                                    }}
                                                >
                                                    Secondary
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Theme Name */}
                                        <div className="text-center">
                                            <h5 className="font-semibold text-gray-900">{theme.name}</h5>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {theme.name === 'Light' ? 'Clean & Professional' :
                                                 theme.name === 'Dark' ? 'Modern & Sleek' :
                                                 theme.name === 'Warm' ? 'Cozy & Inviting' :
                                                 theme.name === 'Cool' ? 'Fresh & Calm' :
                                                 theme.name === 'Cozy' ? 'Comfortable & Earthy' :
                                                 theme.name === 'Sunny' ? 'Bright & Energetic' :
                                                 'Natural & Refreshing'}
                                            </p>
                                        </div>
                                        
                                        {/* Selected Indicator */}
                                        {data.theme === theme.value && (
                                            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Current Theme Preview */}
                            <div className="border rounded-lg p-4" style={{ backgroundColor: data.background_color }}>
                                <h4 style={{ color: data.text_color }} className="text-lg font-medium mb-4">Live Preview - {themes.find(t => t.value === data.theme)?.name} Theme</h4>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        style={{ backgroundColor: data.primary_color, color: data.text_color === '#F9FAFB' ? '#111827' : '#FFFFFF' }}
                                        className="px-4 py-2 rounded-md font-medium"
                                    >
                                        Primary Button
                                    </button>
                                    <button
                                        type="button"
                                        style={{ backgroundColor: data.secondary_color, color: data.text_color === '#F9FAFB' ? '#111827' : '#FFFFFF' }}
                                        className="px-4 py-2 rounded-md font-medium"
                                    >
                                        Secondary Button
                                    </button>
                                    <button
                                        type="button"
                                        style={{ backgroundColor: data.accent_color, color: data.text_color === '#F9FAFB' ? '#111827' : '#FFFFFF' }}
                                        className="px-4 py-2 rounded-md font-medium"
                                    >
                                        Accent Button
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Typography Tab */}
                    {activeTab === 'typography' && (
                        <div className="bg-white border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                            <h3 className="text-lg font-medium mb-4">Typography Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Family
                                    </label>
                                    <select
                                        value={data.font_family}
                                        onChange={(e) => setData('font_family', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        style={{ backgroundColor: data.background_color, color: data.text_color }}
                                    >
                                        {fontFamilies.map((font) => (
                                            <option key={font} value={font} style={{ fontFamily: font === 'Default' ? 'inherit' : font }}>
                                                {font}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Size
                                    </label>
                                    <select
                                        value={data.font_size}
                                        onChange={(e) => setData('font_size', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        style={{ backgroundColor: data.background_color, color: data.text_color }}
                                    >
                                        <option value="default">Default</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                        <option value="extra-large">Extra Large</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Weight
                                    </label>
                                    <select
                                        value={data.font_weight}
                                        onChange={(e) => setData('font_weight', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        style={{ backgroundColor: data.background_color, color: data.text_color }}
                                    >
                                        <option value="default">Default</option>
                                        <option value="light">Light</option>
                                        <option value="normal">Normal</option>
                                        <option value="medium">Medium</option>
                                        <option value="semibold">Semi Bold</option>
                                        <option value="bold">Bold</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h4 className="text-sm font-medium mb-2">Typography Preview</h4>
                                <div className="border rounded-lg p-4" style={{ backgroundColor: data.background_color, borderColor: data.text_color + '30' }}>
                                    <h1
                                        style={{
                                            fontFamily: data.font_family === 'Default' ? 'inherit' : data.font_family,
                                            fontSize: data.font_size === 'default' ? '1.875rem' : data.font_size === 'small' ? '1.5rem' : data.font_size === 'medium' ? '1.875rem' : data.font_size === 'large' ? '2.25rem' : '3rem',
                                            fontWeight: data.font_weight === 'default' ? '500' : data.font_weight === 'light' ? '300' : data.font_weight === 'normal' ? '400' : data.font_weight === 'medium' ? '500' : data.font_weight === 'semibold' ? '600' : '700',
                                            color: data.text_color
                                        }}
                                        className="mb-2"
                                    >
                                        Heading Example
                                    </h1>
                                    <p style={{ fontFamily: data.font_family === 'Default' ? 'inherit' : data.font_family, color: data.text_color, opacity: 0.8 }}>
                                        This is a sample paragraph text to demonstrate how the selected typography settings will appear in your application.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Logos Tab */}
                    {activeTab === 'logos' && (
                        <div className="space-y-6">
                            <div className="bg-white border rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Branding</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Logo URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.logo_url}
                                            onChange={(e) => setData('logo_url', e.target.value)}
                                            placeholder="https://example.com/logo.png"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Recommended size: 200x60 pixels</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Favicon URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.favicon_url}
                                            onChange={(e) => setData('favicon_url', e.target.value)}
                                            placeholder="https://example.com/favicon.ico"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Recommended size: 32x32 pixels (.ico format)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Login Screen Customization</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Login Background Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.login_background}
                                        onChange={(e) => setData('login_background', e.target.value)}
                                        placeholder="https://example.com/background.jpg"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Recommended size: 1920x1080 pixels</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Banners Tab */}
                    {activeTab === 'banners' && (
                        <div className="space-y-6">
                            <div className="bg-white border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                                <h3 className="text-lg font-medium mb-4">Banner Templates</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    {bannerTemplates.map((template) => (
                                        <button
                                            key={template.value}
                                            type="button"
                                            onClick={() => setData('banner_template', template.value)}
                                            className={`p-4 border rounded-lg ${
                                                data.banner_template === template.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                            }`}
                                            style={{
                                                backgroundColor: data.banner_template === template.value ? data.primary_color + '20' : 'transparent',
                                                borderColor: data.banner_template === template.value ? data.primary_color : data.text_color + '30'
                                            }}
                                        >
                                            <span className="text-sm font-medium" style={{ color: data.text_color }}>{template.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Banner Background Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.banner_background}
                                            onChange={(e) => setData('banner_background', e.target.value)}
                                            placeholder="https://example.com/banner.jpg"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Banner Quote/Message
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.banner_quote}
                                            onChange={(e) => setData('banner_quote', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                                <h3 className="text-lg font-medium mb-4">Banner Preview</h3>
                                <div 
                                    className="h-32 rounded-lg flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        backgroundColor: data.primary_color,
                                        backgroundImage: data.banner_background ? `url(${data.banner_background})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="text-center z-10">
                                        <h4 
                                            className="text-xl font-bold mb-2" 
                                            style={{ 
                                                fontFamily: data.font_family === 'Default' ? 'inherit' : data.font_family,
                                                color: data.theme === 'dark' || data.theme === 'monsoon' ? '#FFFFFF' : '#FFFFFF'
                                            }}
                                        >
                                            {data.company_name}
                                        </h4>
                                        <p 
                                            className="text-sm" 
                                            style={{ 
                                                fontFamily: data.font_family === 'Default' ? 'inherit' : data.font_family,
                                                color: data.theme === 'dark' || data.theme === 'monsoon' ? '#FFFFFF' : '#FFFFFF'
                                            }}
                                        >
                                            {data.banner_quote}
                                        </p>
                                    </div>
                                    {data.banner_background && <div className="absolute inset-0 bg-black bg-opacity-40"></div>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Layout Tab */}
                    {activeTab === 'layout' && (
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Layout & UI Features</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Dashboard Widgets</h4>
                                    <div className="space-y-2">
                                        {['Recent Activities', 'Quick Stats', 'Calendar Widget', 'Task Summary', 'Revenue Chart'].map((widget) => (
                                            <label key={widget} className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                <span className="ml-2 text-sm text-gray-700">{widget}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">UI Features</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Dark mode toggle</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Sidebar collapse</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Breadcrumb navigation</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Search functionality</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Branding Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}