import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="10" cy="14" r="3" fill="currentColor"/>
                            <circle cx="22" cy="14" r="3" fill="currentColor"/>
                            <path d="M10 14L16 20L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-lg font-bold text-white">LocalLink</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/marketplace" className="hover:text-white transition-colors">Services</Link>
                        <Link to="/marketplace?category=Home Cleaning" className="hover:text-white transition-colors">Cleaning</Link>
                        <Link to="/marketplace?category=IT Support" className="hover:text-white transition-colors">IT Support</Link>
                        <Link to="/marketplace?category=Plumbing" className="hover:text-white transition-colors">Plumbing</Link>
                        <Link to="/marketplace?category=Gardening" className="hover:text-white transition-colors">Gardening</Link>
                        <Link to="/admin" className="hover:text-white transition-colors">Dashboard</Link>
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-500">
                    <p>&copy; 2026 LocalLink. All rights reserved. | Built with React & Flask</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
