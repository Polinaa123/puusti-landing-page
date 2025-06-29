
import React from 'react';

const BrutalistHeader = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-8 top-4 bg-black/10 backdrop-blur-md rounded-xl shadow-lg z-50">
      <div className="container mx-auto px-8 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-black font-mono text-[#3ab54a]">
            PUUSTI
          </div>
          
          <div className="flex space-x-8 font-mono text-sm font-bold">
            <button
              onClick={() => scrollToSection('collabs')}
              className="text-[#3ab54a] transition-colors uppercase tracking-wider"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-[#3ab54a] transition-colors uppercase tracking-wider"
            >
              PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('subscribe')}
              className="text-[#3ab54a] transition-colors uppercase tracking-wider"
            >
              SUBSCRIBE
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#3ab54a] transition-colors uppercase tracking-wider"
            >
              CONTACT
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default BrutalistHeader;
