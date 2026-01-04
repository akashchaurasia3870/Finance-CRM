import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function TasksView({ tasks = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.assigned_to && task.assigned_to.name && task.assigned_to.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        switch(status) {
            case 'pending': return 'warning';
            case 'in_progress': return 'info';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            default: return 'info';
        }
    };

    const getPriorityVariant = (priority) => {
        switch(priority) {
            case 'low': return 'success';
            case 'medium': return 'warning';
            case 'high': return 'error';
            default: return 'info';
        }
    };

    const isOverdue = (task) => {
        if (!task.due_date || task.status === 'completed' || task.status === 'cancelled') return false;
        return new Date(task.due_date) < new Date();
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Tasks</h1>
                        <p className="text-theme-secondary">Manage task information</p>
                    </div>
                    <Link href="/tasks/new">
                        <ThemedButton variant="primary">Add Task</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Tasks List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Title</ThemedTableCell>
                                <ThemedTableCell header>Assigned To</ThemedTableCell>
                                <ThemedTableCell header>Priority</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Due Date</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredTasks.map((task) => (
                                <ThemedTableRow key={task.id} className={isOverdue(task) ? 'bg-red-50' : ''}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{task.title}</div>
                                        {task.description && (
                                            <div className="text-sm text-theme-muted">{task.description.substring(0, 50)}...</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {task.assigned_to ? task.assigned_to.name : 'Unassigned'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getPriorityVariant(task.priority)}>
                                            {task.priority}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(task.status)}>
                                            {task.status.replace('_', ' ')}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className={`text-sm ${isOverdue(task) ? 'text-red-600 font-medium' : 'text-theme-primary'}`}>
                                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
                                            {isOverdue(task) && <span className="ml-1">(Overdue)</span>}
                                        </div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {new Date(task.created_at).toLocaleDateString()}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/tasks/${task.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/tasks/${task.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(task.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredTasks.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No tasks found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}