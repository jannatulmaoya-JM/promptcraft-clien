// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';

// const Banner = () => {
//   return (
//     <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
//       {/* ব্যাকগ্রাউন্ড এলিমেন্ট */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 0.1, scale: 1 }}
//         transition={{ duration: 2 }}
//         className="absolute w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px]"
//       />

//       <div className="relative z-10 text-center px-4">
//         <motion.h1 
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-5xl md:text-7xl font-extrabold text-white mb-6"
//         >
//           Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Prompts</span>
//         </motion.h1>
        
//         <motion.p 
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
//         >
//           Create, share, and discover the most powerful AI prompts. Your creative journey starts here at PromptCraft.
//         </motion.p>

//         <motion.button 
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition"
//         >
//           Get Started Now
//         </motion.button>
//       </div>
//     </section>
//   );
// };

// export default Banner;

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from "@gravity-ui/icons";

const Banner = () => {
  const trendingTags = ["#SEO", "#React", "#Creative", "#Midjourney", "#Code"];

  return (
    // পুরো স্ক্রিন জুড়ে ব্যানার (w-full)
    <section className="relative  min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-20 px-4 md:px-10">
      
      <div >
        
        {/* হেডলাইন সেকশন */}
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

        {/* ফুল উইডথ সার্চ বার */}
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

        {/* ট্রেন্ডিং ট্যাগস */}
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

        {/* কল টু অ্যাকশন বাটন */}
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

// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Magnifier } from "@gravity-ui/icons";

// const Banner = () => {
//   const trendingTags = ["#SEO Optimize", "#React Component", "#Copywriter", "#Midjourney V6", "#Gemini Code Helper", "#Claude Architect"];

//   return (
//     // এখানে py-20 কমিয়ে py-12 করা হয়েছে যাতে হাইট কমে আসে
//     <section className="w-full py-12 px-4 md:px-10 bg-[#0a0a0c] flex flex-col items-center justify-center text-center">
      
//       {/* হেডলাইন - w-full ব্যবহার করা হয়েছে */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-full" 
//       >
//         <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
//           Unlock the True Potential of <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//             Generative AI
//           </span>
//         </h1>
//         <p className="text-gray-400 text-lg md:text-xl mt-4">
//           Discover, bookmark, and run engineering-grade prompts for ChatGPT, Gemini, Claude, and Midjourney. Boost your productivity today.
//         </p>
//       </motion.div>

//       {/* সার্চ বক্স - এখানে w-full নিশ্চিত করা হয়েছে */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="w-full md:w-[700px] mt-8 p-1.5 bg-gray-800/50 rounded-2xl border border-gray-700 flex items-center shadow-2xl"
//       >
//         <div className="pl-4 text-gray-400">
//           <Magnifier size={24} />
//         </div>
//         <input 
//           type="text" 
//           placeholder="Search by title, tag, or AI tool..." 
//           className="w-full bg-transparent p-4 text-white outline-none placeholder:text-gray-500 text-lg"
//         />
//         <button className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition">
//           Explore
//         </button>
//       </motion.div>

//       {/* ট্রেন্ডিং ট্যাগস */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="mt-6 w-full"
//       >
//         <p className="text-gray-500 text-sm mb-3">Trending:</p>
//         <div className="flex flex-wrap justify-center gap-2">
//           {trendingTags.map((tag) => (
//             <button key={tag} className="px-3 py-1 text-sm bg-gray-800/60 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition">
//               {tag}
//             </button>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Banner;