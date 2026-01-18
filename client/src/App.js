import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ServiceDetail from './pages/ServiceDetail';
import BookingForm from './pages/BookingForm';
import AdminDashboard from './pages/AdminDashboard';
import AdminCategoryForm from './pages/AdminCategoryForm';
import AdminServiceForm from './pages/AdminServiceForm';



// Placeholder components to avoid build errors before full implementation
const Placeholder = ({ name }) => <div className="container" style={{ padding: '2rem' }}><h2>{name}</h2><p>Coming Soon...</p></div>;

/**
 * Main Application Component
 * Handles routing configuration and global layout.
 */
function App() {
  return (
    <div className="App">
      {/* Global Navigation Bar */}
      <NavBar />

      {/* Route Definitions */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/book/:id" element={<BookingForm />} />

        {/* Admin Routes with Nested Routing */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories/new" element={<AdminCategoryForm />} />
          <Route path="categories/:id/edit" element={<AdminCategoryForm />} />
          <Route path="services/new" element={<AdminServiceForm />} />
          <Route path="services/:id/edit" element={<AdminServiceForm />} />
        </Route>
      </Routes>

      {/* Floating Admin Button */}
      {/* Positioned fixed at top-right for easy access during development/demo */}
      <Link
        to="/admin"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          opacity: 1,
          fontSize: '0.8rem',
          color: 'white',
          background: '#64748b',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          border: 'none',
          textDecoration: 'none'
        }}
      >
        Admin
      </Link>
    </div >
  );
}

export default App;
