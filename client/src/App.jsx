import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ServiceDetail from './pages/ServiceDetail';
import BookingForm from './pages/BookingForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminCategoryForm from './pages/AdminCategoryForm';
import AdminServiceForm from './pages/AdminServiceForm';

// Protected Route Component
function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

/**
 * Main Application Component
 * Handles routing configuration and global layout.
 */
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      {/* Global Navigation Bar - hide on auth pages */}
      {!isAuthRoute && <NavBar />}

      {/* Route Definitions */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/book/:id" element={<BookingForm />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected User Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Admin Routes with Nested Routing */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="categories/new" element={<AdminCategoryForm />} />
          <Route path="categories/:id/edit" element={<AdminCategoryForm />} />
          <Route path="services/new" element={<AdminServiceForm />} />
          <Route path="services/:id/edit" element={<AdminServiceForm />} />
        </Route>
      </Routes>

      {/* Footer - Only show on public pages, not auth or admin */}
      {!isAdminRoute && !isAuthRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
