import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Provider Dashboard Component
 * Shows upcoming gigs and allows providers to manage their bookings
 */
function ProviderDashboard() {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');

    useEffect(() => {
        if (!user || user.role !== 'provider') {
            navigate('/login');
            return;
        }

        // Fetch provider's bookings and services
        Promise.all([
            fetch('/provider/bookings', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.ok ? r.json() : []),
            fetch('/provider/services', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.ok ? r.json() : [])
        ])
            .then(([bookingsData, servicesData]) => {
                setBookings(bookingsData);
                setServices(servicesData);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [user, token, navigate]);

    const handleUpdateStatus = (bookingId, newStatus) => {
        fetch(`/provider/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        })
            .then(r => r.json())
            .then(data => {
                if (data.booking) {
                    setBookings(bookings.map(b => 
                        b.id === bookingId ? data.booking : b
                    ));
                }
            });
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#6b7280' }}>Loading your dashboard...</p>
            </div>
        );
    }

    // Filter bookings by status
    const upcomingBookings = bookings.filter(b => ['pending', 'confirmed'].includes(b.status));
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

    const displayedBookings = activeTab === 'upcoming' ? upcomingBookings :
        activeTab === 'completed' ? completedBookings : cancelledBookings;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                        Welcome back, {user?.username}!
                    </h1>
                    <p style={{ color: '#6b7280' }}>
                        Manage your upcoming gigs and track your completed jobs.
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>My Services</p>
                        <p style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb' }}>{services.length}</p>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Upcoming Gigs</p>
                        <p style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b' }}>{upcomingBookings.length}</p>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Completed Jobs</p>
                        <p style={{ fontSize: '32px', fontWeight: '700', color: '#10b981' }}>{completedBookings.length}</p>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total Bookings</p>
                        <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{bookings.length}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                    {[
                        { key: 'upcoming', label: `Upcoming (${upcomingBookings.length})` },
                        { key: 'completed', label: `Completed (${completedBookings.length})` },
                        { key: 'cancelled', label: `Cancelled (${cancelledBookings.length})` }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: activeTab === tab.key ? '#2563eb' : '#ffffff',
                                color: activeTab === tab.key ? '#ffffff' : '#374151',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {displayedBookings.length === 0 ? (
                        <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
                            <svg style={{ width: '48px', height: '48px', margin: '0 auto 16px', color: '#d1d5db' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p>No {activeTab} bookings found.</p>
                        </div>
                    ) : (
                        <div>
                            {displayedBookings.map((booking, index) => (
                                <div
                                    key={booking.id}
                                    style={{
                                        padding: '20px 24px',
                                        borderBottom: index < displayedBookings.length - 1 ? '1px solid #e5e7eb' : 'none',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        gap: '16px'
                                    }}
                                >
                                    {/* Service Image */}
                                    <img
                                        src={booking.service?.image_url || 'https://images.unsplash.com/photo-1581578731117-104f2a41bcbe?w=100'}
                                        alt={booking.service?.title}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />

                                    {/* Booking Info */}
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                                            {booking.service?.title || 'Service'}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                                            <strong>Client:</strong> {booking.client?.username || 'Unknown'}
                                        </p>
                                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                                            <strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        <p style={{ fontSize: '14px', color: '#6b7280' }}>
                                            <strong>Location:</strong> {booking.location || 'Not specified'}
                                        </p>
                                        {booking.contact_phone && (
                                            <p style={{ fontSize: '14px', color: '#2563eb' }}>
                                                <strong>Phone:</strong> {booking.contact_phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Status & Actions */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            backgroundColor: 
                                                booking.status === 'confirmed' ? '#dcfce7' :
                                                booking.status === 'completed' ? '#dbeafe' :
                                                booking.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                                            color:
                                                booking.status === 'confirmed' ? '#166534' :
                                                booking.status === 'completed' ? '#1e40af' :
                                                booking.status === 'cancelled' ? '#dc2626' : '#b45309'
                                        }}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>

                                        {/* Action Buttons */}
                                        {activeTab === 'upcoming' && (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {booking.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: '#10b981',
                                                            color: '#ffffff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                                {booking.status === 'confirmed' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(booking.id, 'completed')}
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: '#2563eb',
                                                            color: '#ffffff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Mark Done
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                                                    style={{
                                                        padding: '8px 16px',
                                                        backgroundColor: '#ffffff',
                                                        color: '#dc2626',
                                                        border: '1px solid #fecaca',
                                                        borderRadius: '6px',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* My Services Section */}
                <div style={{ marginTop: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                        My Services
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                        {services.map(service => (
                            <div
                                key={service.id}
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                }}
                            >
                                <img
                                    src={service.image_url || 'https://images.unsplash.com/photo-1581578731117-104f2a41bcbe?w=400'}
                                    alt={service.title}
                                    style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '16px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                                        {service.title}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                                        {service.category?.name || 'Uncategorized'}
                                    </p>
                                    <p style={{ fontSize: '18px', fontWeight: '700', color: '#2563eb' }}>
                                        ${service.price?.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {services.length === 0 && (
                            <p style={{ color: '#6b7280', padding: '24px' }}>
                                You haven't listed any services yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProviderDashboard;
