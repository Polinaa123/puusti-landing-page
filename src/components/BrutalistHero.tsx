import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const BrutalistHero = () => {
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url(/mattis-cottage.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <img
        src='/puustilogo1.png'
        alt="PUUSTI logo"
        className="relative w-[25rem] h-[15rem] md:w-[38rem] lg:w-[45rem] md:h-[20rem] lg:h-[25rem] object-contain z-20"
      />
    </section>
  );
};

export default BrutalistHero;