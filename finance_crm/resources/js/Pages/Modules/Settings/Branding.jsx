import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link, usePage } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea, ThemedSelect } from '@/Components/ThemedComponents';

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
        // Default Theme Group
        { 
            name: 'Light', 
            value: 'light', 
            group: 'Default',
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
            group: 'Default',
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
            group: 'Default',
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
            group: 'Default',
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
            group: 'Default',
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
            group: 'Default',
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
            group: 'Default',
            colors: { 
                primary: '#059669', 
                secondary: '#0D9488', 
                accent: '#0891B2', 
                bg: '#ECFDF5', 
                text: '#065F46', 
                cardBg: '#FFFFFF',
                buttonText: '#FFFFFF'
            } 
        },
        
        // High-Impact Colors
        {
            name: 'High Contrast',
            value: 'high-contrast',
            group: 'High-Impact',
            colors: {
                primary: '#000000',
                secondary: '#FF0000',
                accent: '#FFFF00',
                bg: '#FFFFFF',
                text: '#000000',
                cardBg: '#F5F5F5',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Bold Palette',
            value: 'bold-palette',
            group: 'High-Impact',
            colors: {
                primary: '#FF4500',
                secondary: '#8A2BE2',
                accent: '#00CED1',
                bg: '#1C1C1C',
                text: '#FFFFFF',
                cardBg: '#2D2D2D',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Vivid Scheme',
            value: 'vivid-scheme',
            group: 'High-Impact',
            colors: {
                primary: '#FF1493',
                secondary: '#00FF7F',
                accent: '#FFD700',
                bg: '#1A1A2E',
                text: '#FFFFFF',
                cardBg: '#16213E',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Power Colors',
            value: 'power-colors',
            group: 'High-Impact',
            colors: {
                primary: '#DC143C',
                secondary: '#FF8C00',
                accent: '#32CD32',
                bg: '#2F4F4F',
                text: '#FFFFFF',
                cardBg: '#708090',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Statement Colors',
            value: 'statement-colors',
            group: 'High-Impact',
            colors: {
                primary: '#FF6347',
                secondary: '#4169E1',
                accent: '#FFD700',
                bg: '#2E2E2E',
                text: '#FFFFFF',
                cardBg: '#404040',
                buttonText: '#FFFFFF'
            }
        },
        
        // Nature / Weather
        {
            name: 'Rainy Night',
            value: 'rainy-night',
            group: 'Nature/Weather',
            colors: {
                primary: '#4682B4',
                secondary: '#708090',
                accent: '#87CEEB',
                bg: '#2F4F4F',
                text: '#E6E6FA',
                cardBg: '#36454F',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Storm',
            value: 'storm',
            group: 'Nature/Weather',
            colors: {
                primary: '#483D8B',
                secondary: '#696969',
                accent: '#B0C4DE',
                bg: '#2F2F2F',
                text: '#F5F5DC',
                cardBg: '#404040',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Autumn',
            value: 'autumn',
            group: 'Nature/Weather',
            colors: {
                primary: '#D2691E',
                secondary: '#CD853F',
                accent: '#FF8C00',
                bg: '#F5DEB3',
                text: '#8B4513',
                cardBg: '#FFEFD5',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Ocean Breeze',
            value: 'ocean-breeze',
            group: 'Nature/Weather',
            colors: {
                primary: '#20B2AA',
                secondary: '#48D1CC',
                accent: '#00CED1',
                bg: '#F0F8FF',
                text: '#2F4F4F',
                cardBg: '#E0FFFF',
                buttonText: '#FFFFFF'
            }
        },
        
        // Time / Mood
        {
            name: 'Midnight',
            value: 'midnight',
            group: 'Time/Mood',
            colors: {
                primary: '#191970',
                secondary: '#4169E1',
                accent: '#6495ED',
                bg: '#0C0C0C',
                text: '#E6E6FA',
                cardBg: '#1C1C1C',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Golden Hour',
            value: 'golden-hour',
            group: 'Time/Mood',
            colors: {
                primary: '#FFD700',
                secondary: '#FFA500',
                accent: '#FF8C00',
                bg: '#FFF8DC',
                text: '#8B4513',
                cardBg: '#FFFACD',
                buttonText: '#8B4513'
            }
        },
        {
            name: 'Serenity',
            value: 'serenity',
            group: 'Time/Mood',
            colors: {
                primary: '#87CEEB',
                secondary: '#B0E0E6',
                accent: '#ADD8E6',
                bg: '#F0F8FF',
                text: '#2F4F4F',
                cardBg: '#E6F3FF',
                buttonText: '#2F4F4F'
            }
        },
        
        // Professional / UI-Focused
        {
            name: 'Corporate',
            value: 'corporate',
            group: 'Professional',
            colors: {
                primary: '#003366',
                secondary: '#0066CC',
                accent: '#3399FF',
                bg: '#F8F9FA',
                text: '#212529',
                cardBg: '#FFFFFF',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Minimal',
            value: 'minimal',
            group: 'Professional',
            colors: {
                primary: '#6C757D',
                secondary: '#ADB5BD',
                accent: '#DEE2E6',
                bg: '#FFFFFF',
                text: '#212529',
                cardBg: '#F8F9FA',
                buttonText: '#FFFFFF'
            }
        },
        
        // Special / Creative
        {
            name: 'Cyberpunk',
            value: 'cyberpunk',
            group: 'Special/Creative',
            colors: {
                primary: '#FF00FF',
                secondary: '#00FFFF',
                accent: '#FFFF00',
                bg: '#0D0D0D',
                text: '#00FF41',
                cardBg: '#1A1A1A',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Galaxy',
            value: 'galaxy',
            group: 'Special/Creative',
            colors: {
                primary: '#9932CC',
                secondary: '#8A2BE2',
                accent: '#DA70D6',
                bg: '#191970',
                text: '#E6E6FA',
                cardBg: '#2E2E4F',
                buttonText: '#FFFFFF'
            }
        },
        {
            name: 'Sunset',
            value: 'sunset',
            group: 'Special/Creative',
            colors: {
                primary: '#FF4500',
                secondary: '#FF6347',
                accent: '#FFD700',
                bg: '#FFF8DC',
                text: '#8B0000',
                cardBg: '#FFEBCD',
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
        put('/settings/branding', {
            onSuccess: () => {
                console.log('Branding settings saved successfully');
            },
            onError: (errors) => {
                console.error('Failed to save branding settings:', errors);
            }
        });
    };

    const getThemeDescription = (themeName) => {
        const descriptions = {
            'Light': 'Clean & Professional',
            'Dark': 'Modern & Sleek',
            'Warm': 'Cozy & Inviting',
            'Cool': 'Fresh & Calm',
            'Cozy': 'Comfortable & Earthy',
            'Sunny': 'Bright & Energetic',
            'Monsoon': 'Natural & Refreshing',
            'High Contrast': 'Maximum Visibility',
            'Bold Palette': 'Aggressive & Striking',
            'Vivid Scheme': 'Electric & Dynamic',
            'Power Colors': 'Commanding & Strong',
            'Statement Colors': 'Bold & Confident',
            'Rainy Night': 'Moody & Atmospheric',
            'Storm': 'Dramatic & Intense',
            'Autumn': 'Warm & Natural',
            'Ocean Breeze': 'Fresh & Calming',
            'Midnight': 'Deep & Mysterious',
            'Golden Hour': 'Warm & Luxurious',
            'Serenity': 'Peaceful & Tranquil',
            'Corporate': 'Professional & Trustworthy',
            'Minimal': 'Clean & Simple',
            'Cyberpunk': 'Futuristic & Edgy',
            'Galaxy': 'Cosmic & Mystical',
            'Sunset': 'Vibrant & Energetic'
        };
        return descriptions[themeName] || 'Unique Style';
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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Branding & UI Settings</h1>
                        <p className="text-theme-secondary">Customize colors, fonts, and UI appearance</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-theme">
                    <nav className="-mb-px flex space-x-8">
                        {['themes', 'typography', 'logos', 'banners', 'layout'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-theme-accent text-theme-accent'
                                        : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
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
                        <div className="bg-theme-primary border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                            <h3 className="text-lg font-medium text-theme-primary mb-4">Theme Selection</h3>
                            
                            {/* Group themes by category */}
                            {['Default', 'High-Impact', 'Nature/Weather', 'Time/Mood', 'Professional', 'Special/Creative'].map(group => {
                                const groupThemes = themes.filter(theme => theme.group === group);
                                if (groupThemes.length === 0) return null;
                                
                                return (
                                    <div key={group} className="mb-8">
                                        <h4 className="text-md font-semibold text-theme-primary mb-4 border-b border-theme pb-2">
                                            {group} Themes
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {groupThemes.map((theme) => (
                                                <div
                                                    key={theme.value}
                                                    onClick={() => applyTheme(theme)}
                                                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all hover:shadow-lg relative ${
                                                        data.theme === theme.value ? 'border-blue-500 shadow-md ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
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
                                                                className="px-3 py-1 rounded text-xs font-bold"
                                                                style={{ 
                                                                    backgroundColor: theme.colors.primary,
                                                                    color: theme.colors.buttonText,
                                                                    fontWeight: group === 'High-Impact' ? '800' : '600'
                                                                }}
                                                            >
                                                                Primary
                                                            </div>
                                                            <div 
                                                                className="px-3 py-1 rounded text-xs font-bold"
                                                                style={{ 
                                                                    backgroundColor: theme.colors.secondary,
                                                                    color: theme.colors.buttonText,
                                                                    fontWeight: group === 'High-Impact' ? '800' : '600'
                                                                }}
                                                            >
                                                                Secondary
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Theme Name */}
                                                    <div className="text-center">
                                                        <h5 className={`font-semibold text-theme-primary ${
                                                            group === 'High-Impact' ? 'font-bold text-lg' : 'font-medium'
                                                        }`}>{theme.name}</h5>
                                                        <p className="text-xs text-theme-muted mt-1">
                                                            {getThemeDescription(theme.name)}
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
                                                    
                                                    {/* High-Impact Badge */}
                                                    {group === 'High-Impact' && (
                                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                                            BOLD
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            
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
                        <div className="bg-theme-primary border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                            <h3 className="text-lg font-medium mb-4">Typography Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Family
                                    </label>
                                    <ThemedSelect
                                        value={data.font_family}
                                        onChange={(e) => setData('font_family', e.target.value)}
                                        style={{ backgroundColor: data.background_color, color: data.text_color }}
                                    >
                                        {fontFamilies.map((font) => (
                                            <option key={font} value={font} style={{ fontFamily: font === 'Default' ? 'inherit' : font }}>
                                                {font}
                                            </option>
                                        ))}
                                    </ThemedSelect>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Size
                                    </label>
                                    <ThemedSelect
                                        value={data.font_size}
                                        onChange={(e) => setData('font_size', e.target.value)}
                                        style={{ backgroundColor: data.background_color, color: data.text_color }}
                                    >
                                        <option value="default">Default</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                        <option value="extra-large">Extra Large</option>
                                    </ThemedSelect>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Weight
                                    </label>
                                    <ThemedSelect
                                        value={data.font_weight}
                                        onChange={(e) => setData('font_weight', e.target.value)}
                                        style={{ backgroundColor: data.background_color, color: data.text_color }}
                                    >
                                        <option value="default">Default</option>
                                        <option value="light">Light</option>
                                        <option value="normal">Normal</option>
                                        <option value="medium">Medium</option>
                                        <option value="semibold">Semi Bold</option>
                                        <option value="bold">Bold</option>
                                    </ThemedSelect>
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
                            <div className="bg-theme-primary border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                                <h3 className="text-lg font-medium text-theme-primary mb-4">Company Branding</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <ThemedInput
                                            type="text"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Logo URL
                                        </label>
                                        <ThemedInput
                                            type="url"
                                            value={data.logo_url}
                                            onChange={(e) => setData('logo_url', e.target.value)}
                                            placeholder="https://example.com/logo.png"
                                        />
                                        <p className="text-xs text-theme-muted mt-1">Recommended size: 200x60 pixels</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Favicon URL
                                        </label>
                                        <ThemedInput
                                            type="url"
                                            value={data.favicon_url}
                                            onChange={(e) => setData('favicon_url', e.target.value)}
                                            placeholder="https://example.com/favicon.ico"
                                        />
                                        <p className="text-xs text-theme-muted mt-1">Recommended size: 32x32 pixels (.ico format)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-theme-primary border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                                <h3 className="text-lg font-medium text-theme-primary mb-4">Login Screen Customization</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Login Background Image URL
                                    </label>
                                    <ThemedInput
                                        type="url"
                                        value={data.login_background}
                                        onChange={(e) => setData('login_background', e.target.value)}
                                        placeholder="https://example.com/background.jpg"
                                    />
                                    <p className="text-xs text-theme-muted mt-1">Recommended size: 1920x1080 pixels</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Banners Tab */}
                    {activeTab === 'banners' && (
                        <div className="space-y-6">
                            <div className="bg-theme-primary border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
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
                                        <ThemedInput
                                            type="url"
                                            value={data.banner_background}
                                            onChange={(e) => setData('banner_background', e.target.value)}
                                            placeholder="https://example.com/banner.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Banner Quote/Message
                                        </label>
                                        <ThemedTextarea
                                            rows={2}
                                            value={data.banner_quote}
                                            onChange={(e) => setData('banner_quote', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-theme-primary border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
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
                        <div className="bg-theme-primary border rounded-lg p-6" style={{ backgroundColor: data.background_color, color: data.text_color }}>
                            <h3 className="text-lg font-medium text-theme-primary mb-4">Layout & UI Features</h3>
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
                        <ThemedButton
                            type="submit"
                            variant="primary"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Branding Settings'}
                        </ThemedButton>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
