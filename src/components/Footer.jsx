import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-gray-800 py-6 mt-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-blue-900 font-bold text-lg">Cerospace</h2>
          <p className="text-gray-700">Built for Codeflow by Anukiran & Koyelika</p>
        </div>

        <nav className="flex space-x-4">
          <a
            href="#about"
            className="text-pink-500 hover:underline"
          >
            About
          </a>
          <a
            href="#resources"
            className="text-pink-500 hover:underline"
          >
            Resources
          </a>
          <a
            href="#contact"
            className="text-pink-500 hover:underline"
          >
            Contact
          </a>
        </nav>
      </div>

      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Cerospace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
