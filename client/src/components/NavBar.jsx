import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * NavBar Component
 * Displays the localized application logo and primary navigation links.
 */
function NavBar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Brand Logo - Links to Homepage */}
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-2xl">🔗</span>
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
                    <Button asChild>
                        <Link to="/marketplace">Book a Service</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
