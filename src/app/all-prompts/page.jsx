"use client";
import { useEffect, useState } from 'react';
import PromptCard from '@/components/PromptCard';

export default function AllPromptsPage() {
  
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/prompts');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setPrompts(result.data || []);
      } catch (err) {
        console.error("Error loading prompts:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchPrompts();
  }, []);

  return (
  <div className=' bg-gray-900'>
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Prompts</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : prompts.length > 0 ? (
          prompts.map((item) => (
            <PromptCard key={item._id || item.title} item={item} />
          ))
        ) : (
          <p>No prompts found.</p>
        )}
      </div>
    </div>
    </div>
  );
}