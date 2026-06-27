import React from 'react';
import PromptCard from '@/components/PromptCard'; 

export default function FeaturedPrompts() {
  const prompts = [{ _id: '1', title: 'Claude 3.5 Architect' }, { _id: '2', title: 'React Performance Guide' }, { _id: '3', title: 'Next.js Auth System' }];

  return (
    <section className="py-16 px-4 bg-black max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-10">Popular Prompts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {prompts.map((item) => <PromptCard key={item._id} item={item} />)}
      </div>
    </section>
  );
}