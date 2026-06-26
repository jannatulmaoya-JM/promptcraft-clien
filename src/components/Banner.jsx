"use client";

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from "@gravity-ui/icons";

const Banner = () => {
  const trendingTags = ["#SEO", "#React", "#Creative", "#Midjourney", "#Code"];

  return (
  
    <section className="relative  min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-20 px-4 md:px-10">
      
      <div >
        
     
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 tracking-tighter">
            Elevate Your AI <br />
            <span className="text-blue-600">Productivity</span>
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Discover, bookmark, and share high-quality prompts. Create faster and automate your workflow with PromptCraft.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="flex items-center w-full h-20 px-8 bg-white border-2 border-gray-200 rounded-full shadow-2xl focus-within:border-blue-500 transition-all">
            <Icons.Magnifier size={28} className="text-gray-400 mr-6" />
            <input 
              type="text" 
              placeholder="Search prompts by title, tag, or AI tool..." 
              className="w-full h-full bg-transparent outline-none text-xl text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <span className="text-gray-500 font-medium text-lg">Trending:</span>
          {trendingTags.map((tag) => (
            <button 
              key={tag} 
              className="px-6 py-2 text-md bg-white border border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-700 rounded-full transition-all shadow-sm"
            >
              {tag}
            </button>
          ))}
        </motion.div>

      
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="px-12 py-5 bg-blue-600 text-white font-bold text-xl rounded-full hover:bg-blue-700 shadow-xl hover:shadow-blue-300 transition-all transform hover:scale-105">
            Explore All Prompts
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;


