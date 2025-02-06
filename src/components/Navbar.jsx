import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import Login from './Login';
import { supabase } from '../supabaseclient';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full bg-blue-50 backdrop-blur-sm z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-900">Cerospace</span>

            <div className="hidden md:flex items-center gap-6">
              <a href="#home" className="hover:text-pink-500 transition-colors">Home</a>
              <a href="#howitworks" className="hover:text-pink-500 transition-colors">How It Works</a>
              <a href="#resources" className="hover:text-pink-500 transition-colors">Resources</a>
              {isAuthenticated && <a href="/dashboard" className="hover:text-pink-500 transition-colors">Dashboard</a>}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Logout
                  <LogOut size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  Login
                  <LogIn size={20} />
                </button>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:border-gray-300 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-gray-800 mt-4">
              <a onClick={handleLinkClick} href="#home" className="block px-4 py-2 hover:bg-gray-300 rounded-lg transition-colors">Home</a>
              <a onClick={handleLinkClick} href="#howitworks" className="block px-4 py-2 hover:bg-gray-300 rounded-lg transition-colors">How It Works</a>
              <a onClick={handleLinkClick} href="#resources" className="block px-4 py-2 hover:bg-gray-300 rounded-lg transition-colors">Resources</a>
              {isAuthenticated && <a onClick={handleLinkClick} href="/dashboard" className="block px-4 py-2 hover:bg-gray-300 rounded-lg transition-colors">Dashboard</a>}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    handleLinkClick();
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Logout
                  <LogOut size={20} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    handleLinkClick();
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Login
                  <LogIn size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-md w-full m-4">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <Login onSuccess={() => {
              setIsAuthenticated(true);
              setShowLogin(false);
            }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
