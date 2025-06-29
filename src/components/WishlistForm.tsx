
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const WishlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section id="wishlist" className="py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <CheckCircle className="text-green-500 mx-auto mb-6" size={64} />
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Thank you!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              You have been successfully added to our wishlist. We'll contact you as soon as the platform is ready to launch.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-green-500 hover:text-green-600 font-medium"
            >
              Add another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="wishlist" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Want to be the first to try <span className="text-green-500">PUUSTI?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Leave your contact details and get early access to the platform
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none text-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none text-lg"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </span>
              ) : (
                <>
                  Subscribe for early access
                  <Send className="inline-block ml-2" size={20} />
                </>
              )}
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-6">
            We don't share your data with third parties and don't send spam
          </p>
        </div>
      </div>
    </section>
  );
};

export default WishlistForm;
