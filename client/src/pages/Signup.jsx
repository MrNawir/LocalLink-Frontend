import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('client');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await signup(username, email, password, role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                padding: '48px',
                width: '100%',
                maxWidth: '420px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                            <svg style={{ width: '40px', height: '40px', color: '#2563eb' }} viewBox="0 0 32 32" fill="none">
                                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="10" cy="14" r="3" fill="currentColor"/>
                                <circle cx="22" cy="14" r="3" fill="currentColor"/>
                                <path d="M10 14L16 20L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>LocalLink</span>
                        </div>
                    </Link>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                        Create an account
                    </h1>
                    <p style={{ color: '#6b7280' }}>
                        Join LocalLink to book or provide services
                    </p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="johndoe"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            I want to
                        </label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                type="button"
                                onClick={() => setRole('client')}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: role === 'client' ? '2px solid #2563eb' : '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    backgroundColor: role === 'client' ? '#eff6ff' : '#ffffff',
                                    color: role === 'client' ? '#2563eb' : '#374151',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                Book Services
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('provider')}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: role === 'provider' ? '2px solid #2563eb' : '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    backgroundColor: role === 'provider' ? '#eff6ff' : '#ffffff',
                                    color: role === 'provider' ? '#2563eb' : '#374151',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                Provide Services
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="At least 6 characters"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: loading ? '#93c5fd' : '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', color: '#6b7280', fontSize: '14px' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#2563eb', fontWeight: '500', textDecoration: 'none' }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
