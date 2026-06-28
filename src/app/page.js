import React from 'react';
import Banner from "@/components/Banner";
import FeaturedPrompts from "@/components/Featuredprompts ";
import WhyChooseUs from "@/components/Whychooseus";
import LiveFeed from '@/components/LiveFeed';
import PromptCategories from '@/components/PromptCategories';
import ReviewBar from '@/components/ReviewBar';


export default function Home() {
  return (
    <div className="  justify-center  font-sans ">
      <main className=" w-full  items-center justify-between bg-gray-700 sm:items-start">
         <Banner/>
         <FeaturedPrompts />
         <PromptCategories/>
         <WhyChooseUs />
         <ReviewBar/>
         <LiveFeed/>
        {/* admin@gmail.com 
        Admin1234

        maoyauser@gmail.com
        User@1234

        janatulmaoyacreator@gmail.com
        Creator@1234 */}
      </main>
    </div>
  );
}

