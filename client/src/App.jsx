import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
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
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

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

      {/* Footer - Only show on public pages */}
      {!isAdminRoute && <Footer />}
    </div >
  );
}

export default App;
