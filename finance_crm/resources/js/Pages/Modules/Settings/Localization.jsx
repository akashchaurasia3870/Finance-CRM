import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';

export default function Localization() {
    const { data, setData, put, processing } = useForm({
        default_language: 'en',
        currency: 'USD',
        currency_symbol: '$',
        currency_position: 'before',
        date_format: 'MM/DD/YYYY',
        time_format: '12',
        timezone: 'America/New_York',
        number_format: 'US',
        multi_language_enabled: false
    });

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
        { code: 'fr', name: 'French', flag: '🇫🇷' },
        { code: 'de', name: 'German', flag: '🇩🇪' },
        { code: 'it', name: 'Italian', flag: '🇮🇹' },
        { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
        { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
        { code: 'ja', name: 'Japanese', flag: '🇯🇵' }
    ];

    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
    ];

    const timezones = [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Asia/Kolkata',
        'Australia/Sydney'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/api/settings/localization');
    };

    const handleCurrencyChange = (currencyCode) => {
        const currency = currencies.find(c => c.code === currencyCode);
        setData({
            ...data,
            currency: currencyCode,
            currency_symbol: currency.symbol
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
                    <h1 className="text-2xl font-bold text-gray-900">Localization & Regional Settings</h1>
                    <p className="text-gray-600">Configure language, currency, and regional preferences</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Language Settings */}
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Language Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Default Language
                                </label>
                                <select
                                    value={data.default_language}
                                    onChange={(e) => setData('default_language', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.multi_language_enabled}
                                        onChange={(e) => setData('multi_language_enabled', e.target.checked)}
                                        className="rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Enable Multi-language Support</span>
                                </label>
                                <p className="text-xs text-gray-500 mt-1 ml-6">Allow users to switch between languages</p>
                            </div>
                            {data.multi_language_enabled && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Available Languages
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {languages.map((lang) => (
                                            <label key={lang.code} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={lang.code === 'en'}
                                                    className="rounded border-gray-300"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{lang.flag} {lang.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Currency Settings */}
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Currency & Number Format</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Default Currency
                                </label>
                                <select
                                    value={data.currency}
                                    onChange={(e) => handleCurrencyChange(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    {currencies.map((currency) => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.symbol} {currency.name} ({currency.code})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Currency Symbol Position
                                </label>
                                <select
                                    value={data.currency_position}
                                    onChange={(e) => setData('currency_position', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="before">Before amount ({data.currency_symbol}1,234.56)</option>
                                    <option value="after">After amount (1,234.56{data.currency_symbol})</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number Format
                                </label>
                                <select
                                    value={data.number_format}
                                    onChange={(e) => setData('number_format', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="US">US Format (1,234.56)</option>
                                    <option value="EU">European Format (1.234,56)</option>
                                    <option value="IN">Indian Format (1,23,456.78)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preview
                                </label>
                                <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                                    <span className="text-sm text-gray-700">
                                        {data.currency_position === 'before' ? `${data.currency_symbol}1,234.56` : `1,234.56${data.currency_symbol}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time Settings */}
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Date & Time Format</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date Format
                                </label>
                                <select
                                    value={data.date_format}
                                    onChange={(e) => setData('date_format', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="MM/DD/YYYY">MM/DD/YYYY (01/15/2024)</option>
                                    <option value="DD/MM/YYYY">DD/MM/YYYY (15/01/2024)</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD (2024-01-15)</option>
                                    <option value="DD-MM-YYYY">DD-MM-YYYY (15-01-2024)</option>
                                    <option value="MMM DD, YYYY">MMM DD, YYYY (Jan 15, 2024)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time Format
                                </label>
                                <select
                                    value={data.time_format}
                                    onChange={(e) => setData('time_format', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="12">12-hour (2:30 PM)</option>
                                    <option value="24">24-hour (14:30)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Timezone
                                </label>
                                <select
                                    value={data.timezone}
                                    onChange={(e) => setData('timezone', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    {timezones.map((tz) => (
                                        <option key={tz} value={tz}>
                                            {tz.replace('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                            <span className="text-sm text-gray-600">Preview: </span>
                            <span className="text-sm font-medium">
                                {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: data.date_format.includes('MMM') ? 'short' : '2-digit',
                                    day: '2-digit'
                                })} {new Date().toLocaleTimeString('en-US', {
                                    hour12: data.time_format === '12',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Regional Settings */}
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Day of Week
                                </label>
                                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                                    <option value="0">Sunday</option>
                                    <option value="1">Monday</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Measurement System
                                </label>
                                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                                    <option value="imperial">Imperial (feet, pounds)</option>
                                    <option value="metric">Metric (meters, kilograms)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Localization Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}