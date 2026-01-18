import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * ServiceDetail Page Component
 * Displays full details for a specific service, including provider info and booking button.
 */
function ServiceDetail() {
    // Retrieve URL parameters
    const { id } = useParams();
    const [service, setService] = useState(null);

    // Fetch service details on mount or ID change
    useEffect(() => {
        fetch(`/services/${id}`)
            .then(r => {
                if (r.ok) return r.json();
                throw new Error('Service not found');
            })
            .then(setService)
            .catch(console.error);
    }, [id]);

    // Loading state
    if (!service) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Split Layout: Image on Left, Info on Right (on desktop) */}
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Service Image */}
                <img
                    src={service.image_url}
                    alt={service.title}
                    style={{ width: '100%', borderRadius: 'var(--radius)', objectFit: 'cover', height: '400px' }}
                />

                {/* Service Details */}
                <div>
                    <span className="badge" style={{ marginBottom: '1rem' }}>{service.category?.name}</span>
                    <h1 style={{ marginBottom: '1rem' }}>{service.title}</h1>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>${service.price}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.7' }}>
                        {service.description}
                    </p>

                    {/* Provider Information Card */}
                    <div className="card" style={{ padding: '1.5rem', background: '#f8fafc', border: 'none' }}>
                        <h3>Provider Info</h3>
                        <p className="flex items-center gap-4" style={{ marginTop: '1rem' }}>
                            <img
                                src={service.provider?.image_url || 'https://via.placeholder.com/50'}
                                alt={service.provider?.username}
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            />
                            <span style={{ fontWeight: '500' }}>{service.provider?.username}</span>
                        </p>
                    </div>

                    {/* Booking Call to Action */}
                    <Link to={`/book/${service.id}`} className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;
