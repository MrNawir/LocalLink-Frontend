import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="10" cy="14" r="3" fill="currentColor"/>
                                <circle cx="22" cy="14" r="3" fill="currentColor"/>
                                <path d="M10 14L16 20L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span className="text-xl font-bold text-white">LocalLink</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Connecting communities with trusted local service providers. Find reliable professionals for all your home and business needs.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/marketplace?category=Home Cleaning" className="hover:text-white transition-colors">Home Cleaning</Link></li>
                            <li><Link to="/marketplace?category=IT Support" className="hover:text-white transition-colors">IT Support</Link></li>
                            <li><Link to="/marketplace?category=Plumbing" className="hover:text-white transition-colors">Plumbing</Link></li>
                            <li><Link to="/marketplace?category=Gardening" className="hover:text-white transition-colors">Gardening</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/marketplace" className="hover:text-white transition-colors">Browse Services</Link></li>
                            <li><Link to="/admin" className="hover:text-white transition-colors">Provider Dashboard</Link></li>
                        </ul>
                    </div>
                </div>
                <Separator className="bg-slate-700" />
                <div className="pt-6 text-center text-sm">
                    <p>&copy; 2026 LocalLink. All rights reserved. | Built with React & Flask</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
