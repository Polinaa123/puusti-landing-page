
import React from 'react';
import { Users, Zap, Clock, DollarSign } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Freelancer Marketplace",
      description: "All the specialists you need in one place. Photographers, copywriters, marketers ready to work with your properties."
    },
    {
      icon: Zap,
      title: "Automated Descriptions",
      description: "Optimized texts and professional photos are created automatically based on your data."
    },
    {
      icon: Clock,
      title: "Quick Start",
      description: "Publish your property in 5 minutes. No complex setup or lengthy procedures required."
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Transparent pricing and fixed costs. Know the exact price before starting work."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Why <span className="text-green-500">PUUSTI?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine the best specialists and modern technology for your success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
