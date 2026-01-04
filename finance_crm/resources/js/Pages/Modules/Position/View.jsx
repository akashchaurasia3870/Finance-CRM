import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import './style.css';

export default function View({ auth, positions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPositions = positions.filter(position =>
        position.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.portfolio?.portfolio_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.portfolio?.account?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this position?')) {
            router.delete(`/position/${id}`);
        }
    };

    return (
        <Layout>
            <Head title="Security Positions" />
            
            <div className="position-container">
                <div className="position-header">
                    <h1>Security Positions</h1>
                    <Link href="/position/new" className="btn btn-primary">
                        Add New Position
                    </Link>
                </div>

                <div className="position-controls">
                    <input
                        type="text"
                        placeholder="Search positions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="position-table-container">
                    <table className="position-table">
                        <thead>
                            <tr>
                                <th>Portfolio</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Avg Price</th>
                                <th>Market Value</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPositions.map((position) => (
                                <tr key={position.id}>
                                    <td>{position.portfolio?.portfolio_name}</td>
                                    <td>{position.product?.name}</td>
                                    <td>{position.quantity}</td>
                                    <td>${position.avg_price}</td>
                                    <td>${position.market_value}</td>
                                    <td>{new Date(position.last_updated).toLocaleDateString()}</td>
                                    <td className="actions">
                                        <Link href={`/position/${position.id}`} className="btn btn-sm btn-info">
                                            View
                                        </Link>
                                        <Link href={`/position/${position.id}/edit`} className="btn btn-sm btn-warning">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(position.id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}