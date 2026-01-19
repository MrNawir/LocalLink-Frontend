import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ServiceCard Component
 * Displays a single service's details in a reusable card format.
 * @param {Object} service - The service object containing its details.
 */
function ServiceCard({ service }) {
    const { id, title, price, image_url, category, provider, description } = service;

    return (
        <Link 
            to={`/services/${id}`} 
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }}
            >
                {/* Image Container */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                        src={image_url || 'https://images.unsplash.com/photo-1581578731117-104f2a41bcbe?w=400'}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                        }}
                    />
                    {/* Category Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#2563eb',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        {category?.name || 'Service'}
                    </div>
                    {/* Price Badge */}
                    <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: '#1f2937',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#ffffff'
                    }}>
                        ${price?.toFixed(2)}
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '8px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginBottom: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.5'
                    }}>
                        {description?.substring(0, 100)}...
                    </p>
                    
                    {/* Provider & CTA */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151'
                            }}>
                                {provider?.username?.charAt(0)?.toUpperCase() || 'P'}
                            </div>
                            <span style={{ fontSize: '13px', color: '#6b7280' }}>
                                {provider?.username || 'Provider'}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#2563eb',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            View
                            <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ServiceCard;
