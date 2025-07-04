import {useIsMobile} from '../hooks/use-mobile';
import React, {useRef} from 'react';

const BrutalistProjects = () => {
  const isMobile = useIsMobile();
  const projects = [
    { id: 1, title: "MARKETPLACE", label: "FREELANCER'S BEATING"},
    { id: 2, title: "COPYWRITING TOOL", label: "DESCRIPTIONS"},
    { id: 3, title: "A/B TESTING", label: "CHOOSE THE BEST OUT OF THE BEST"},
    { id: 4, title: "DECORATION TOOLS", label: "MAKE YOUR VISUALS BETTER"},
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const move = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({
      left: dir === 'left' ? -move : move,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="pt-8 pb-16 bg-[#e6e7e8]">
      <div className={`
        mb-4
        ${isMobile
          ? 'flex flex-col space-y-2 px-4'
          : 'flex items-center px-8 space-x-6'
        }
      `}>
        <h2 className="text-3xl text-[#22170c] font-mono">COMING SOON</h2>
        <div
          ref={containerRef}
          className={`
            flex space-x-4 overflow-x-auto no-scrollbar pb-4
            ${isMobile ? '' : 'pl-24 pr-8'}
          `}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-72 h-80 bg-white rounded-lg shadow-inner"
            >
                <div className="w-full h-3/4 bg-[#22170c] flex items-center justify-center">
                  <span className="text-3xl font-black font-mono text-white">
                    [{project.id}]
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-black font-mono">{project.title}</h3>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">
                    {project.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
          <div className="flex justify-end px-8 mt-4 space-x-2">
            <button
              onClick={() => scroll('left')}
              className="px-3 py-2 text-2xl font-bold shadow-inner hover:bg-gray-100 transition">
              «
            </button>
            <button
              onClick={() => scroll('right')}
              className="px-3 py-2 text-2xl font-bold shadow-inner hover:bg-gray-100 transition">
              »
            </button>
          </div>
        )}
      </section>
    );
  };

 export default BrutalistProjects;