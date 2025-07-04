
import React, { useState } from 'react';

const BrutalistSubscribe = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
      setFormData({ email: '', name: '' });
    } catch (err) {
      console.error('Waitlist submission failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev =>({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  if (isSubmitted) {
    return (
      <section id="subscribe" className="py-32 bg-[#e6e7e8]">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-8xl md:text-9xl font-black font-mono mb-8 text-[#22170c]">
              THANK YOU!
            </h2>
            <p className="text-2xl font-mono mb-8 text-[#22170c]">
              You’ve been added to our waitlist. We’ll be in touch soon!
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-lg font-mono underline text-[#3ab54a] hover:text-[#22170c]"
            >
              Add another email
            </button>
          </div>
        </div>
      </section>
    );
  }
    return (
      <section id="subscribe" className="py-32 bg-[#e6e7e8]">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-8">
            <h2
              className="
              mb-12 text-center font-black font-mono text-3xl
              sm:text-4xl
              md:text-8xl
              lg:text-10xl
              px-4 sm:px-8
              max-w-full
              md:max-w-2xl
              mx-auto whitespace-normal
              text-[#22170c]
            "
          >
              JOIN THE WAITLIST
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
                disabled={isLoading}
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
