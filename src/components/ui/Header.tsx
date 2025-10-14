import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '~/stores/authStore';
import toast from 'react-hot-toast';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50" role="banner">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" aria-label="Mandate - Home">
            <span className="text-xl font-bold text-neutral-900">Mandate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link to="/how-it-works-ecosystem" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              How it works
            </Link>
            <Link to="/use-cases" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Use cases
            </Link>
            <Link to="/developers" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Developers
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/admin/blog">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
            <a 
              href="https://calendar.app.google/MuyapKxcpQXibsto7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors"
            >
              Book a demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4" role="navigation" aria-label="Mobile navigation">
              <Link 
                to="/how-it-works-ecosystem" 
                className="text-neutral-700 hover:text-neutral-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How it works
              </Link>
              <Link 
                to="/use-cases" 
                className="text-neutral-700 hover:text-neutral-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Use cases
              </Link>
              <Link 
                to="/developers" 
                className="text-neutral-700 hover:text-neutral-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Developers
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link to="/admin/blog" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Sign in
                    </Button>
                  </Link>
                )}
                <a 
                  href="https://calendar.app.google/MuyapKxcpQXibsto7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors w-full"
                >
                  Book a demo
                </a>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
