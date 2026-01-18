import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * NavBar Component
 * Displays the localized application logo and primary navigation links.
 */
function NavBar() {
    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center">
                {/* Brand Logo - Links to Homepage */}
                <Link to="/" className="logo">LocalLink</Link>

                {/* Navigation Links */}
                <div className="flex gap-4 items-center">
                    {/* Home Link */}
                    <NavLink to="/" className="nav-link">Home</NavLink>


                    {/* Call to Action Button */}
                    <Link to="/marketplace" className="btn btn-primary">Book a Service</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;