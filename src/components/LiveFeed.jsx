

'use client'; 


import React, { useState } from 'react';

export default function LiveFeed() {
  const [isPaused, setIsPaused] = useState(false);

  const activities = [
    " User123 just copied 'Logo Design Prompt'",
    " New prompt 'SEO Master' added to category",
    " User456 saved 'React Component UI' to favorites",
    " 'System Assistant' prompt reached 100+ copies"
  ];

  return (
    <section className="py-4 bg-gray-150 border-y border-gray-800 overflow-hidden cursor-pointer">
      <div 
        className={`flex whitespace-nowrap gap-12 ${isPaused ? 'animate-none' : 'animate-marquee'}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {activities.concat(activities).map((act, i) => (
          <div key={i} className="flex items-center text-gray-200 hover:text-white font-medium text-sm transition-colors">
         
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            
            <span className="tracking-wide">
              {act}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}