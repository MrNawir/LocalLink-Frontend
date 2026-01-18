import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

/**
 * AdminLayout Component
 * Provides the structural layout for the Admin Dashboard sections.
 * Includes a persistent sidebar and a dynamic content area.
 */
function AdminLayout() {
    return (
        <div className="admin-layout">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <h3>Menu</h3>
                <nav className="sidebar-nav">
                    {/* Dashboard Overview Link */}
                    <NavLink to="/admin" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <span>Overview</span>
                    </NavLink>

                    {/* Add Service Link */}
                    <NavLink to="/admin/services/new" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <span>+ Add Service</span>
                    </NavLink>

                    {/* Add Category Link */}
                    <NavLink to="/admin/categories/new" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <span>+ Add Category</span>
                    </NavLink>
                    {/* Add more links as needed for future sections like 'Users' */}
                </nav>
            </aside>

            {/* Main Content Area - Renders nested admin routes */}
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
