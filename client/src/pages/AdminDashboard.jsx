import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminDashboard Page Component
 * Detailed overview of the application status, including statistics and management tables.
 */
function AdminDashboard() {
    const { token } = useAuth();
    
    // State for dashboard data
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings');

    // Fetch all needed data on load
    useEffect(() => {
        fetch('/categories')
            .then(r => r.json())
            .then(setCategories);

        fetch('/services')
            .then(r => r.json())
            .then(setServices);

        fetch('/bookings')
            .then(r => r.json())
            .then(setBookings);
            
        // Fetch users with auth token
        fetch('/admin/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(r => r.ok ? r.json() : [])
            .then(setUsers)
            .catch(() => setUsers([]));
    }, [token]);

    /**
     * Deletes a category by ID.
     * Prompts for confirmation before deletion.
     */
    const handleDeleteCategory = (id) => {
        if (window.confirm("Are you sure? This might delete associated services!")) {
            fetch(`/categories/${id}`, { method: 'DELETE' })
                .then(r => {
                    if (r.ok) setCategories(categories.filter(c => c.id !== id));
                });
        }
    };

    /**
     * Deletes a service by ID.
     * Prompts for confirmation before deletion.
     */
    const handleDeleteService = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(`/services/${id}`, { method: 'DELETE' })
                .then(r => {
                    if (r.ok) setServices(services.filter(s => s.id !== id));
                });
        }
    };

    /**
     * Updates the status of a booking.
     */
    const handleUpdateStatus = (id, newStatus) => {
        fetch(`/bookings/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
            .then(r => {
                if (r.ok) {
                    setBookings(bookings.map(b =>
                        b.id === id ? { ...b, status: newStatus } : b
                    ));
                }
            });
    };

    /**
     * Deletes a booking by ID.
     */
    const handleDeleteBooking = (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            fetch(`/admin/bookings/${id}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(r => {
                    if (r.ok) setBookings(bookings.filter(b => b.id !== id));
                });
        }
    };

    /**
     * Updates a user's role or status.
     */
    const handleUpdateUser = (id, updates) => {
        fetch(`/admin/users/${id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        })
            .then(r => r.json())
            .then(data => {
                if (data.user) {
                    setUsers(users.map(u => u.id === id ? data.user : u));
                }
            });
    };

    /**
     * Deletes a user by ID.
     */
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user? This will also delete their bookings.")) {
            fetch(`/admin/users/${id}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(r => {
                    if (r.ok) setUsers(users.filter(u => u.id !== id));
                });
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1>Dashboard Overview</h1>
            </div>

            {/* Statistics Section */}
            <section className="stat-grid">
                <div className="stat-card">
                    <h3>Total Services</h3>
                    <div className="stat-value">{services.length}</div>
                </div>
                <div className="stat-card">
                    <h3>Total Categories</h3>
                    <div className="stat-value">{categories.length}</div>
                </div>
                <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <div className="stat-value">{bookings.length}</div>
                </div>
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <div className="stat-value">{users.length}</div>
                </div>
            </section>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                {['bookings', 'users', 'services', 'categories'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: activeTab === tab ? '#2563eb' : '#ffffff',
                            color: activeTab === tab ? '#ffffff' : '#374151',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Bookings Management Table */}
            {activeTab === 'bookings' && (
            <section className="card" style={{ marginBottom: '2rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <h2>Manage Bookings</h2>
                </div>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>#{booking.id}</td>
                                    <td>{booking.service ? booking.service.title : 'Deleted Service'}</td>
                                    <td>
                                        <div>{booking.client ? booking.client.username : 'Unknown'}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{booking.contact_phone || 'No Phone'}</div>
                                    </td>
                                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                                    <td>{booking.location || 'N/A'}</td>
                                    <td>
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                                            style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                border: '1px solid #cbd5e1',
                                                background: booking.status === 'confirmed' ? '#dcfce7' :
                                                    booking.status === 'completed' ? '#f1f5f9' : 
                                                    booking.status === 'cancelled' ? '#fee2e2' : '#fff7ed',
                                                color: booking.status === 'confirmed' ? '#166534' :
                                                    booking.status === 'completed' ? '#334155' : 
                                                    booking.status === 'cancelled' ? '#dc2626' : '#c2410c',
                                                fontWeight: 500,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Approved</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteBooking(booking.id)} className="action-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', color: '#94a3b8' }}>No bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            )}

            {/* Users Management Table */}
            {activeTab === 'users' && (
            <section className="card" style={{ marginBottom: '2rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <h2>Manage Users</h2>
                </div>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>#{user.id}</td>
                                    <td style={{ fontWeight: 500 }}>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleUpdateUser(user.id, { role: e.target.value })}
                                            style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                border: '1px solid #cbd5e1',
                                                background: user.role === 'admin' ? '#fef3c7' : '#f1f5f9',
                                                fontWeight: 500,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="client">Client</option>
                                            <option value="provider">Provider</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdateUser(user.id, { is_active: !user.is_active })}
                                            style={{
                                                padding: '4px 12px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                background: user.is_active ? '#dcfce7' : '#fee2e2',
                                                color: user.is_active ? '#166534' : '#dc2626',
                                                fontWeight: 500,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user.id)} className="action-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8' }}>No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            )}

            {/* Services Management Table */}
            {activeTab === 'services' && (
            <section className="card" style={{ marginBottom: '2rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <h2>Manage Services</h2>
                    <Link to="/admin/services/new" className="btn btn-primary">+ Add New</Link>
                </div>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(svc => (
                                <tr key={svc.id}>
                                    <td>#{svc.id}</td>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{svc.title}</div>
                                    </td>
                                    <td>${svc.price.toFixed(2)}/hr</td>
                                    <td>
                                        <span className="badge">{svc.category ? svc.category.name : 'Uncategorized'}</span>
                                    </td>
                                    <td>
                                        <Link to={`/admin/services/${svc.id}/edit`} className="action-btn edit">Edit</Link>
                                        <button onClick={() => handleDeleteService(svc.id)} className="action-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8' }}>No services found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            )}

            {/* Categories Management Table */}
            {activeTab === 'categories' && (
            <section className="card">
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <h2>Manage Categories</h2>
                    <Link to="/admin/categories/new" className="btn btn-primary">+ Add New</Link>
                </div>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.id}>
                                    <td>#{cat.id}</td>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{cat.name}</div>
                                    </td>
                                    <td>
                                        <Link to={`/admin/categories/${cat.id}/edit`} className="action-btn edit">Edit</Link>
                                        <button onClick={() => handleDeleteCategory(cat.id)} className="action-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', color: '#94a3b8' }}>No categories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            )}
        </div>
    );
}

export default AdminDashboard;
