import React from 'react';
import { Star, Zap, Users } from 'lucide-react'; 

export default function WhyChooseUs() {
  const features = [
    { 
      title: 'High Quality', 
      desc: 'All prompts are curated and reviewed for excellence.', 
      icon: <Star className="w-8 h-8 text-yellow-400" /> 
    },
    { 
      title: 'Easy Workflow', 
      desc: 'Simplify your AI interactions with our intuitive design.', 
      icon: <Zap className="w-8 h-8 text-blue-400" /> 
    },
    { 
      title: 'Community Driven', 
      desc: 'Join a vibrant network of prompt engineers and creators.', 
      icon: <Users className="w-8 h-8 text-purple-400" /> 
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-950 border-t ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-16">Why Choose Our Platform?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div key={i} className="p-8 border border-gray-800 rounded-3xl bg-gray-900/50 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center text-center">
         
              <div className="mb-6 p-4 bg-gray-800 rounded-2xl">
                {item.icon}
              </div>
              
             
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}