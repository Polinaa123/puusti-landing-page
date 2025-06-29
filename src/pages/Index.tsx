
import React from 'react';
import BrutalistHeader from '../components/BrutalistHeader';
import BrutalistHero from '../components/BrutalistHero';
import BrutalistCollabs from '../components/BrutalistCollabs';
import BrutalistProjects from '../components/BrutalistProjects';
import BrutalistSubscribe from '../components/BrutalistSubscribe';
import BrutalistFooter from '../components/BrutalistFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black">
      <BrutalistHeader />
      <BrutalistHero />
      <BrutalistCollabs />
      <BrutalistProjects />
      <BrutalistSubscribe />
      <BrutalistFooter />
    </div>
  );
};

export default Index;
