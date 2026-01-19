import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * NavBar Component
 * Displays the localized application logo and primary navigation links.
 */
function NavBar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Brand Logo - Links to Homepage */}
                <Link to="/" className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-blue-600" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="10" cy="14" r="3" fill="currentColor"/>
                        <circle cx="22" cy="14" r="3" fill="currentColor"/>
                        <path d="M10 14L16 20L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        LocalLink
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/marketplace" 
                        className={({ isActive }) => 
                            `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                        }
                    >
                        Services
                    </NavLink>
                    
                    {isAuthenticated ? (
                        <>
                            <NavLink 
                                to={user?.role === 'provider' ? '/provider' : user?.role === 'admin' ? '/admin' : '/dashboard'} 
                                className={({ isActive }) => 
                                    `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                                }
                            >
                                {user?.role === 'provider' ? 'My Gigs' : 'Dashboard'}
                            </NavLink>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                                    Hi, {user?.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login"
                                style={{
                                    padding: '8px 16px',
                                    color: '#374151',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    textDecoration: 'none'
                                }}
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup"
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#2563eb',
                                    color: '#ffffff',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    textDecoration: 'none'
                                }}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
