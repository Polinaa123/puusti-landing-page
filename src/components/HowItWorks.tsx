
import React from 'react';
import { FileText, Users, MousePointer, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Create Request",
      description: "Describe your property and requirements in a simple form"
    },
    {
      icon: Users,
      title: "Match Specialists",
      description: "System automatically finds freelancers nearby"
    },
    {
      icon: MousePointer,
      title: "Choose Contractor",
      description: "Book a specialist with just a few clicks"
    },
    {
      icon: FileCheck,
      title: "Get Results",
      description: "Receive ready solution and report in PDF format"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            How it <span className="text-green-500">works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple process from request to ready result
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-green-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                      <step.icon className="text-white" size={28} />
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
