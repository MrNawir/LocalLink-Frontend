import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * AdminDashboard Page Component
 * Detailed overview of the application status, including statistics and management tables.
 */
function AdminDashboard() {
    // State for dashboard data
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);

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
    }, []);

    /**
     * Deletes a category by ID.
     * Prompts for confirmation before deletion.
     */
    const handleDeleteCategory = (id) => {
        if (window.confirm("Are you sure? This might delete associated services!")) {
            fetch(/categories/${id}, { method: 'DELETE' })
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
            fetch(/services/${id}, { method: 'DELETE' })
                .then(r => {
                    if (r.ok) setServices(services.filter(s => s.id !== id));
                });
        }
    };

    /**
     * Updates the status of a booking.
     */
    const handleUpdateStatus = (id, newStatus) => {
        fetch(/bookings/${id}, {
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
                    <h3>Recent Bookings</h3>
                    <div className="stat-value">{bookings.length}</div>
                </div>
            </section>

            {/* Bookings Management Table */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <h2>Recent Bookings</h2>
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
                                                    booking.status === 'completed' ? '#f1f5f9' : '#fff7ed',
                                                color: booking.status === 'confirmed' ? '#166534' :
                                                    booking.status === 'completed' ? '#334155' : '#c2410c',
                                                fontWeight: 500,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Approved</option>
                                            <option value="completed">Job Done</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8' }}>No bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Services Management Table */}
            <section className="card" style={{ marginBottom: '2rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <h2>Services</h2>
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
                                        <Link to={/admin/services/${svc.id}/edit} className="action-btn edit">Edit</Link>
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

            {/* Categories Management Table */}
            <section className="card">
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <h2>Categories</h2>
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
                                        <Link to={/admin/categories/${cat.id}/edit} className="action-btn edit">Edit</Link>
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
        </div>
    );
}

export default AdminDashboard;