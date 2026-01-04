import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import './style.css';

export default function Edit({ auth, transaction, portfolios = [], products = [], transactionTypes = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        portfolio_id: transaction.portfolio_id || '',
        product_id: transaction.product_id || '',
        transaction_type: transaction.transaction_type || 'deposit',
        quantity: transaction.quantity || '',
        price: transaction.price || '',
        amount: transaction.amount || '',
        fees: transaction.fees || '0',
        transaction_date: transaction.transaction_date ? transaction.transaction_date.split('T')[0] : '',
        reference: transaction.reference || '',
        notes: transaction.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/transaction/${transaction.id}`);
    };

    const calculateAmount = () => {
        if (data.quantity && data.price) {
            const amount = parseFloat(data.quantity) * parseFloat(data.price);
            setData('amount', amount.toFixed(2));
        }
    };

    const requiresProduct = ['buy', 'sell', 'dividend'].includes(data.transaction_type);
    const requiresQuantityPrice = ['buy', 'sell'].includes(data.transaction_type);

    return (
        <Layout>
            <Head title="Edit Transaction" />
            
            <div className="transaction-container">
                <div className="transaction-header">
                    <h1>Edit Transaction</h1>
                    <p>Update transaction details</p>
                </div>

                <form onSubmit={handleSubmit} className="transaction-form">
                    <div className="form-group">
                        <label htmlFor="portfolio_id">Portfolio *</label>
                        <select
                            id="portfolio_id"
                            value={data.portfolio_id}
                            onChange={(e) => setData('portfolio_id', e.target.value)}
                            className={errors.portfolio_id ? 'error' : ''}
                        >
                            <option value="">Select Portfolio</option>
                            {portfolios.map((portfolio) => (
                                <option key={portfolio.id} value={portfolio.id}>
                                    {portfolio.portfolio_name} ({portfolio.portfolio_no})
                                </option>
                            ))}
                        </select>
                        {errors.portfolio_id && <span className="error-message">{errors.portfolio_id}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="transaction_type">Transaction Type *</label>
                        <select
                            id="transaction_type"
                            value={data.transaction_type}
                            onChange={(e) => setData('transaction_type', e.target.value)}
                            className={errors.transaction_type ? 'error' : ''}
                        >
                            {Object.entries(transactionTypes).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                        {errors.transaction_type && <span className="error-message">{errors.transaction_type}</span>}
                    </div>

                    {requiresProduct && (
                        <div className="form-group">
                            <label htmlFor="product_id">Product *</label>
                            <select
                                id="product_id"
                                value={data.product_id}
                                onChange={(e) => setData('product_id', e.target.value)}
                                className={errors.product_id ? 'error' : ''}
                            >
                                <option value="">Select Product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} ({product.symbol}) - {product.product_type}
                                    </option>
                                ))}
                            </select>
                            {errors.product_id && <span className="error-message">{errors.product_id}</span>}
                        </div>
                    )}

                    {requiresQuantityPrice && (
                        <>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity *</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    step="0.000001"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    onBlur={calculateAmount}
                                    className={errors.quantity ? 'error' : ''}
                                />
                                {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price per Unit *</label>
                                <input
                                    type="number"
                                    id="price"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    onBlur={calculateAmount}
                                    className={errors.price ? 'error' : ''}
                                />
                                {errors.price && <span className="error-message">{errors.price}</span>}
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="amount">Amount *</label>
                        <input
                            type="number"
                            id="amount"
                            step="0.01"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className={errors.amount ? 'error' : ''}
                        />
                        {errors.amount && <span className="error-message">{errors.amount}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="fees">Fees</label>
                        <input
                            type="number"
                            id="fees"
                            step="0.01"
                            value={data.fees}
                            onChange={(e) => setData('fees', e.target.value)}
                            className={errors.fees ? 'error' : ''}
                        />
                        {errors.fees && <span className="error-message">{errors.fees}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="transaction_date">Transaction Date</label>
                        <input
                            type="date"
                            id="transaction_date"
                            value={data.transaction_date}
                            onChange={(e) => setData('transaction_date', e.target.value)}
                            className={errors.transaction_date ? 'error' : ''}
                        />
                        {errors.transaction_date && <span className="error-message">{errors.transaction_date}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="reference">Reference</label>
                        <input
                            type="text"
                            id="reference"
                            value={data.reference}
                            onChange={(e) => setData('reference', e.target.value)}
                            className={errors.reference ? 'error' : ''}
                        />
                        {errors.reference && <span className="error-message">{errors.reference}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            rows="3"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            className={errors.notes ? 'error' : ''}
                        />
                        {errors.notes && <span className="error-message">{errors.notes}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing ? 'Updating...' : 'Update Transaction'}
                        </button>
                        <a href="/transaction" className="btn btn-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}