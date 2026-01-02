import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function EmailView({ emails = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmails = emails.filter(email => 
        (email.to_email && email.to_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (email.subject && email.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (email.from_email && email.from_email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this email?')) {
            router.delete(`/email/${id}`);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'queued': return 'bg-yellow-100 text-yellow-800';
            case 'sent': return 'bg-green-100 text-green-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Emails</h1>
                        <p className="text-gray-600">Manage emails</p>
                    </div>
                    <Link
                        href="/email/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Create
                    </Link>
                </div>
                
                <div className="bg-white border rounded-lg">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Email List</h3>
                            <input
                                type="text"
                                placeholder="Search emails..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border rounded-md px-3 py-2 w-64"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEmails.map((email) => (
                                    <tr key={email.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{email.to_email}</div>
                                            {email.from_email && (
                                                <div className="text-sm text-gray-500">From: {email.from_email}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900">{email.subject}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {email.template ? email.template.name : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(email.status)}`}>
                                                {email.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {email.sent_at ? new Date(email.sent_at).toLocaleString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={`/email/${email.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/email/${email.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(email.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredEmails.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No emails found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}