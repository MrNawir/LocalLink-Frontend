import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, token, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/auth/my-bookings', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        
        setActionLoading(bookingId);
        try {
            const response = await fetch(`/auth/my-bookings/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'cancelled' })
            });
            
            if (response.ok) {
                fetchBookings();
            }
        } catch (error) {
            console.error('Failed to cancel booking:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleRequestReschedule = async (bookingId) => {
        const notes = window.prompt('Enter a note for your reschedule request:');
        if (notes === null) return;
        
        setActionLoading(bookingId);
        try {
            const response = await fetch(`/auth/my-bookings/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'reschedule_requested', notes })
            });
            
            if (response.ok) {
                fetchBookings();
            }
        } catch (error) {
            console.error('Failed to request reschedule:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return { bg: '#dcfce7', text: '#166534' };
            case 'pending': return { bg: '#fef3c7', text: '#92400e' };
            case 'cancelled': return { bg: '#fee2e2', text: '#dc2626' };
            case 'completed': return { bg: '#dbeafe', text: '#1d4ed8' };
            case 'reschedule_requested': return { bg: '#f3e8ff', text: '#7c3aed' };
            default: return { bg: '#f3f4f6', text: '#374151' };
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Header */}
            <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                                My Dashboard
                            </h1>
                            <p style={{ color: '#6b7280' }}>
                                Welcome back, {user?.username}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <Link
                                to="/marketplace"
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#2563eb',
                                    color: '#ffffff',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    fontSize: '14px'
                                }}
                            >
                                Book a Service
                            </Link>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#ffffff',
                                    color: '#dc2626',
                                    border: '1px solid #fecaca',
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
                {/* User Info Card */}
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontSize: '24px',
                            fontWeight: '600'
                        }}>
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
                                {user?.username}
                            </h2>
                            <p style={{ color: '#6b7280' }}>{user?.email}</p>
                            <span style={{
                                display: 'inline-block',
                                marginTop: '8px',
                                padding: '4px 12px',
                                backgroundColor: '#eff6ff',
                                color: '#2563eb',
                                borderRadius: '50px',
                                fontSize: '12px',
                                fontWeight: '500',
                                textTransform: 'capitalize'
                            }}>
                                {user?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                        My Bookings
                    </h2>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
                            Loading bookings...
                        </div>
                    ) : bookings.length === 0 ? (
                        <div style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            padding: '48px',
                            textAlign: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                                You haven't made any bookings yet.
                            </p>
                            <Link
                                to="/marketplace"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 24px',
                                    backgroundColor: '#2563eb',
                                    color: '#ffffff',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}
                            >
                                Browse Services
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {bookings.map(booking => {
                                const statusColor = getStatusColor(booking.status);
                                return (
                                    <div
                                        key={booking.id}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                                        {booking.service?.title}
                                                    </h3>
                                                    <span style={{
                                                        padding: '4px 12px',
                                                        backgroundColor: statusColor.bg,
                                                        color: statusColor.text,
                                                        borderRadius: '50px',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        {booking.status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>
                                                    {formatDate(booking.date)}
                                                </p>
                                                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                                                    {booking.location}
                                                </p>
                                                {booking.notes && (
                                                    <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '8px', fontStyle: 'italic' }}>
                                                        Note: {booking.notes}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        onClick={() => handleRequestReschedule(booking.id)}
                                                        disabled={actionLoading === booking.id}
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: '#ffffff',
                                                            color: '#2563eb',
                                                            border: '1px solid #2563eb',
                                                            borderRadius: '6px',
                                                            fontSize: '14px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Reschedule
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        disabled={actionLoading === booking.id}
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: '#ffffff',
                                                            color: '#dc2626',
                                                            border: '1px solid #fecaca',
                                                            borderRadius: '6px',
                                                            fontSize: '14px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
