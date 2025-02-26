import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-3xl font-bold text-blue-600">Clipote</span>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <NavLink to="/form">Summarize</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </nav>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink to="/form" onClick={toggleMenu}>Summarize</MobileNavLink>
                        <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
                        <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
                    </div>
                </div>
            )}
        </header>
    );
};

// Desktop Navigation Link component
const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
        {children}
    </Link>
);

// Mobile Navigation Link component
const MobileNavLink = ({ to, onClick, children }) => (
    <Link
        to={to}
        className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
        onClick={onClick}
    >
        {children}
    </Link>
);

export default Header;