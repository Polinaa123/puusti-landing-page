
import React from 'react';

const BrutalistFooter = () => {
  return (
    <footer id="contact" className="bg-[#22170c] py-16 border-t-2 border-[#3ab54a]">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <h3 className="text-6xl font-black font-mono mb-4 text-white">
              PUUSTI
            </h3>
            <div className="w-16 h-1 bg-[#3ab54a]"></div>
          </div>
          
          <div className="space-y-4 font-mono">
            <h4 className="text-xl font-black mb-6 text-white">CONNECT</h4>
            <div className="space-y-2">
              <a href="mailto:hellopuusti@gmail.com" className="block text-gray-400 hover:text-[#3ab54a] transition-colors">
                EMAIL
              </a>
              <a href="https://www.instagram.com/puusterit/" className="block text-gray-400 hover:text-[#3ab54a] transition-colors">
                INSTAGRAM
              </a>
              <a href="https://www.linkedin.com/company/puusti/" className="block text-gray-400 hover:text-[#3ab54a] transition-colors">
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-xs font-mono text-gray-400">
            © 2025 PUUSTI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BrutalistFooter;
