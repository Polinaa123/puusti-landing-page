
import React from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">PUUSTI</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-700 hover:text-green-500 transition-colors font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-gray-700 hover:text-green-500 transition-colors font-medium"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className="text-gray-700 hover:text-green-500 transition-colors font-medium"
          >
            Contacts
          </button>
          <button
            onClick={() => scrollToSection('wishlist')}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Wishlist
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 md:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-green-500 transition-colors font-medium text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-green-500 transition-colors font-medium text-left"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="text-gray-700 hover:text-green-500 transition-colors font-medium text-left"
              >
                Contacts
              </button>
              <button
                onClick={() => scrollToSection('wishlist')}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-center"
              >
                Wishlist
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
