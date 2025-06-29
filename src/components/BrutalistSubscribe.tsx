
import React, { useState } from 'react';

const BrutalistSubscribe = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="subscribe" className="py-32 bg-[#e6e7e8]">
      <div className="container mx-auto px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-8xl md:text-9xl font-black font-mono mb-16 text-center text-[#22170c]">
            SUBSCRIBE.
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b-2 border-black pb-4 text-2xl font-mono placeholder-[#22170c] focus:outline-none focus:border-[#3ab54a] text-black"
                required
              />
            </div>
            
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b-2 border-black pb-4 text-2xl font-mono placeholder-[#22170c] focus:outline-none focus:border-[#3ab54a] text-black"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#3ab54a] text-[#22170c] py-6 text-2xl font-black font-mono hover:bg-[#22170c] hover:text-[#3ab54a] transition-colors duration-300"
            >
              SUBMIT
            </button>
          </form>
          
          <p className="text-xs font-mono text-gray-600 mt-8 text-center">
            WE DON'T SHARE YOUR DATA WITH THIRD PARTIES
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrutalistSubscribe;
