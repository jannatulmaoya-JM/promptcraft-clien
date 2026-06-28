"use client";

import React, { useEffect, useState } from 'react';
import PromptCard from '@/components/PromptCard';

export default function FeaturedPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchPopularPrompts = async () => {
      try {
       
        const response = await fetch('http://localhost:5000/api/prompts/popular');
        const result = await response.json();
        
        setPrompts(result.data || []);
      } catch (err) {
        console.error("Error fetching popular prompts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPrompts();
}, []);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Popular Prompts
      </h2>

      {loading ? (
        <div className="text-white text-center">Loading popular prompts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {prompts.map((item) => (
            <PromptCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}