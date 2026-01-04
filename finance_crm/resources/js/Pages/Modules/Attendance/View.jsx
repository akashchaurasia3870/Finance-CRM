import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function AttendanceView({ attendances = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAttendances = attendances.filter(attendance => 
        (attendance.user?.name && attendance.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (attendance.date && attendance.date.includes(searchTerm))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this attendance record?')) {
            router.delete(`/attendance/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Attendance</h1>
                        <p className="text-theme-secondary">Manage employee attendance</p>
                    </div>
                    <Link href="/attendance/new">
                        <ThemedButton variant="primary">Mark Attendance</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Attendance Records</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search attendance..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Employee</ThemedTableCell>
                                <ThemedTableCell header>Date</ThemedTableCell>
                                <ThemedTableCell header>Check In</ThemedTableCell>
                                <ThemedTableCell header>Check Out</ThemedTableCell>
                                <ThemedTableCell header>Hours</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredAttendances.length > 0 ? filteredAttendances.map((attendance) => (
                                <ThemedTableRow key={attendance.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{attendance.user?.name || 'N/A'}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {attendance.date ? new Date(attendance.date).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {attendance.check_in || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {attendance.check_out || 'Pending'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {attendance.total_hours || '0'}h
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            attendance.status === 'present' ? 'success' :
                                            attendance.status === 'late' ? 'warning' : 'error'
                                        }>
                                            {attendance.status || 'Present'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/attendance/${attendance.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/attendance/${attendance.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(attendance.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                ['John Doe', 'Jane Smith', 'Bob Johnson'].map((name, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{name}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {new Date().toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">09:00 AM</ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {index === 2 ? 'Pending' : '05:30 PM'}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {index === 2 ? '0' : '8.5'}h
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={index === 0 ? 'success' : index === 1 ? 'warning' : 'info'}>
                                                {index === 0 ? 'Present' : index === 1 ? 'Late' : 'Working'}
                                            </ThemedBadge>
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