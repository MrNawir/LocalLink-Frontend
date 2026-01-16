import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ServiceCard Component
 * Renders a summary card for a specific service.
 * Used in grid layouts on Home and Marketplace pages.
 */
function ServiceCard({ service }) {
    // Destructure service properties for easier access
    const { id, title, price, image_url, category, provider } = service;

    return (
        <div className="card flex flex-col justify-between">
            <div>
                {/* Service Image Container */}
                <div style={{ height: '200px', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '1rem', background: '#f1f5f9' }}>
                    <img src={image_url || 'https://via.placeholder.com/300'} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Header: Category and Price */}
                <div className="flex justify-between items-start">
                    <span className="badge">{category?.name}</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${price}</span>
                </div>

                {/* Service Title */}
                <h3 style={{ margin: '0.5rem 0' }}>{title}</h3>

                {/* Provider Attribution */}
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    by {provider?.username}
                </p>
            </div>

            {/* Action Button: Link to Details Page */}
            <Link to={`/services/${id}`} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                View Details
            </Link>
        </div>
    );
}

export default ServiceCard;