
import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';

const InterfacePreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Simple <span className="text-green-500">interface</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Intuitive platform for quick property listing
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mock interface 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Monitor className="text-green-500 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Multi-step Form</h3>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                </div>
                <h4 className="font-bold text-gray-900 mb-3">Step 2: Property Description</h4>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-green-500 rounded w-1/3"></div>
                </div>
              </div>
            </div>
            
            {/* Mock interface 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Smartphone className="text-green-500 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Freelancer Profile</h3>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <div className="h-3 bg-gray-800 rounded w-20 mb-1"></div>
                    <div className="h-2 bg-gray-400 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                </div>
                <div className="mt-4 h-6 bg-green-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterfacePreview;
