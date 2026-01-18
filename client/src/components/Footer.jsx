import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl">🔗</span>
                            <span className="text-xl font-bold text-white">LocalLink</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Connecting communities with trusted local service providers. Find reliable professionals for all your home and business needs.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/marketplace" className="hover:text-white transition-colors">Home Cleaning</Link></li>
                            <li><Link to="/marketplace" className="hover:text-white transition-colors">IT Support</Link></li>
                            <li><Link to="/marketplace" className="hover:text-white transition-colors">Plumbing</Link></li>
                            <li><Link to="/marketplace" className="hover:text-white transition-colors">Gardening</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>support@locallink.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Service Street</li>
                            <li>San Francisco, CA 94102</li>
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
