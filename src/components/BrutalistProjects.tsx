
import React, {useRef} from 'react';

const BrutalistProjects = () => {
  const projects = [
    { id: 1, title: "MARKETPLACE", label: "FREELANCERS"},
    { id: 2, title: " COPYWRITING", label: "DESCRIPTIONS"},
    { id: 3, title: "QUICK START", label: "5 MINUTES"},
    { id: 4, title: "COST SAVING", label: "TRANSPARENT"},
    { id: 5, title: "REPORTING", label: "PDF FORMAT"}
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
        <div className="flex items-center px-8 mb-4 space-x-6">
          <h2 className="text-3xl text-center text-[#22170c] font-mono whitespace-nowrap">SERVICES</h2>

        <div
          ref={containerRef}
          className="flex space-x-4 overflow-x-auto no-scrollbar pl-24 pr-8 pb-4"
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
      </section>
    );
  };

 export default BrutalistProjects;