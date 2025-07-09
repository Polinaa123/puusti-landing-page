import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import ReactDOM from 'react-dom';

const copyWriteEnabled = import.meta.env.VITE_ENABLE_COPYWRITE === 'true';

const BrutalistHeader = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMobile= useIsMobile();
  const [menuOpen, setMenuOpen]= useState(false);

  return (
    <header className="fixed inset-x-4 sm:inset-x-8 top-4 bg-black/10 backdrop-blur-md rounded-xl shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-8 py-4">
        <nav className="flex justify-between items-center">
          <img
            src="/puustilogo1.png"
            alt="Logo"
            className="h-7"
          />
          {!isMobile && (
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
              {copyWriteEnabled && (
                <Link
                  to="/copywrite"
                  className="text-[#3ab54a] transition-colors uppercase tracking-wider"
                >
                  COPYWRITE
                </Link>
              )}
            </div>
          )}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-2xl text-[#3ab54a]"
            >
              ☰
            </button>
          )}
          {isMobile && menuOpen && ReactDOM.createPortal(
            <div className="fixed top-[7rem] inset-x-4 bg-black/10 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-4 font-mono font-bold flex flex-col space-y-2 z-40">
              <button onClick={() => { scrollToSection('collabs'); setMenuOpen(false); }} className="text-[#3ab54a] uppercase">ABOUT</button>
              <button onClick={() => { scrollToSection('projects'); setMenuOpen(false); }} className="text-[#3ab54a] uppercase">PROJECTS</button>
              <button onClick={() => { scrollToSection('subscribe'); setMenuOpen(false); }} className="text-[#3ab54a] uppercase">SUBSCRIBE</button>
              <button onClick={() => { scrollToSection('contact'); setMenuOpen(false); }} className="text-[#3ab54a] uppercase">CONTACT</button>
              {copyWriteEnabled && (
                <Link to="/copywrite" onClick={() => setMenuOpen(false)} className="text-[#3ab54a] uppercase">
                  COPYWRITING TOOL
                </Link>
              )}
            </div>,
            document.body
          )}
        </nav>
      </div>
    </header>
  );
};

export default BrutalistHeader;
