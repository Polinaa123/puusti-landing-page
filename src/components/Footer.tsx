
import React from 'react';
import { Send, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacts" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold">PUUSTI</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Complete solution for rental business. We make property listing and promotion simple and effective.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection('about')}
                className="block text-gray-400 hover:text-green-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block text-gray-400 hover:text-green-500 transition-colors"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection('wishlist')}
                className="block text-gray-400 hover:text-green-500 transition-colors"
              >
                Wishlist
              </button>
            </nav>
          </div>
          
          {/* Social and legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <Send size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Puusti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
