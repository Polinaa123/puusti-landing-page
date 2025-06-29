
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToWishlist = () => {
    const element = document.getElementById('wishlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            PUUSTI
            <span className="block text-green-500">Complete Solution</span>
            <span className="block text-gray-700 text-3xl md:text-4xl font-bold mt-4">
              for Rental Business
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We make property listing and promotion simple, fast and affordable
          </p>
          
          <button
            onClick={scrollToWishlist}
            className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Join Wishlist
            <ArrowDown className="inline-block ml-2" size={20} />
          </button>
        </div>
        
        {/* Decorative geometric shapes */}
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-green-500/10 rounded-lg transform rotate-12 hidden lg:block"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-green-500/20 rounded-full hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-green-500/15 transform rotate-45 hidden lg:block"></div>
      </div>
    </section>
  );
};

export default Hero;
