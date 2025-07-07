
import React from 'react';
import BrutalistHeader from '../components/BrutalistHeader';
import BrutalistHero from '../components/BrutalistHero';
import BrutalistCollabs from '../components/BrutalistCollabs';
import BrutalistProjects from '../components/BrutalistProjects';
import BrutalistSubscribe from '../components/BrutalistSubscribe';
import BrutalistFooter from '../components/BrutalistFooter';
import {Link} from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen font-mono bg-[#e3e5e6] text-black">
      <BrutalistHeader />
      <BrutalistHero />
      {import.meta.env.VITE_ENABLE_COPYWRITE === 'true' && (
        <div className="text-center my-8">
          <Link
            to="/copywrite"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition"
          >
            COPYWRITING TOOL
          </Link>
        </div>
      )}
      <BrutalistCollabs />
      <BrutalistProjects />
      <BrutalistSubscribe />
      <BrutalistFooter />
    </div>
  );
};

export default Index;
