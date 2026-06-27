
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from "@gravity-ui/icons";
import Link from 'next/link';

const Banner = () => {
  const trendingTags = ["#SEO", "#React", "#Creative", "#Midjourney", "#Code"];

  return (
    <section className="relative flex flex-col items-center justify-center bg-[url('/images/banner.png')] bg-cover bg-center py-20 px-4 text-center">
   
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
          Elevate Your AI <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Productivity</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Discover, bookmark, and share high-quality prompts. Create faster and automate your workflow.
        </p>
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-2xl mt-8">
        <div className="flex items-center w-full h-16 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
          <Icons.Magnifier size={24} className="text-gray-300 mr-4" />
          <input type="text" placeholder="Search prompts..." className="w-full bg-transparent outline-none text-lg text-white placeholder:text-gray-400" />
        </div>
      </motion.div>

      <motion.div className="relative z-10 flex gap-4 mt-8">
       <Link href="/all-prompts">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-800 text-white font-semibold rounded-full hover:bg-blue-700 transition">
          Explore Prompts
        </button>
        </Link> 
       
        <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition">
          Learn More
        </button>
   
      </motion.div>

     
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-8">
        <span className="text-gray-400 font-medium self-center">Trending:</span>
        {trendingTags.map((tag) => (
          <button key={tag} className="px-4 py-1 text-sm bg-black/30 border border-white/10 text-gray-300 rounded-full hover:border-blue-400 transition">
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};
export default Banner;