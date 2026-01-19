import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', padding: '40px 0' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                    {/* Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg style={{ width: '24px', height: '24px', color: '#3b82f6' }} viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="10" cy="14" r="3" fill="currentColor"/>
                            <circle cx="22" cy="14" r="3" fill="currentColor"/>
                            <path d="M10 14L16 20L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>LocalLink</span>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '14px' }}>
                        <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</Link>
                        <Link to="/marketplace" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Services</Link>
                        <Link to="/marketplace?category=Home Cleaning" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Cleaning</Link>
                        <Link to="/marketplace?category=IT Support" style={{ color: '#cbd5e1', textDecoration: 'none' }}>IT Support</Link>
                        <Link to="/marketplace?category=Plumbing" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Plumbing</Link>
                        <Link to="/marketplace?category=Gardening" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Gardening</Link>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #334155', marginTop: '32px', paddingTop: '24px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    <p>&copy; 2026 LocalLink. All rights reserved. | Built with React & Flask</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
