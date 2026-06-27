"use client";

import { useEffect, useState } from 'react';
import PromptCard from '@/components/PromptCard';

export default function AllPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const [activeEngine, setActiveEngine] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeSort, setActiveSort] = useState("Latest");

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
     
        const params = new URLSearchParams({
          category: activeCategory !== "All" ? activeCategory : "",
          engine: activeEngine !== "All" ? activeEngine : "",
          difficulty: activeDifficulty !== "All" ? activeDifficulty : "",
          sort: activeSort,
          search: searchTerm,
          page: currentPage, 
          limit: 10
        });

        const response = await fetch(`http://localhost:5000/api/prompts?${params.toString()}`);
        const result = await response.json();

        setPrompts(result.data || []);
        setTotalPages(result.totalPages || 1);
      } catch (err) {
        console.error("Error loading prompts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, [activeCategory, activeEngine, activeDifficulty, activeSort, searchTerm]);

  const engines = ["All", "ChatGPT", "Gemini", "Claude", "Midjourney", "Stable Diffusion", "Other"];
  const categories = ["All", "Coding", "Writing", "Marketing", "Graphics & Image", "Idea Generation", "System Assistant", "Other"];
  const difficulties = ["All", "Beginner", "Intermediate", "Pro"];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex p-6 gap-8">
     
      <aside className="w-64 p-4 bg-gray-850 rounded-xl h-fit border border-gray-800">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        
     
        <div className="mb-6">
          <h3 className="font-semibold text-gray-400 text-sm mb-2">AI TOOLS</h3>
          {engines.map(e => <button key={e} onClick={() => setActiveEngine(e)} className={`block w-full text-left px-4 py-1.5 rounded ${activeEngine === e ? 'text-blue-400' : 'text-gray-500'}`}>{e}</button>)}
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-400 text-sm mb-2">CATEGORY</h3>
          {categories.map(c => <button key={c} onClick={() => setActiveCategory(c)} className={`block w-full text-left px-4 py-1.5 rounded ${activeCategory === c ? 'text-blue-400' : 'text-gray-500'}`}>{c}</button>)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 text-sm mb-2">DIFFICULTY</h3>
          {difficulties.map(d => <button key={d} onClick={() => setActiveDifficulty(d)} className={`block w-full text-left px-4 py-1.5 rounded ${activeDifficulty === d ? 'text-blue-400' : 'text-gray-500'}`}>{d}</button>)}
        </div>
      </aside>

      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Prompts</h1>
          <input type="text" placeholder="Search..." className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 w-96" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="flex items-center gap-4 mb-8 bg-gray-900 p-2 rounded-lg border border-gray-800 w-fit">
          <span className="px-4 text-gray-400">Sort By:</span>
          {["Latest", "Most Popular", "Most Copied"].map((s) => (
            <button key={s} onClick={() => setActiveSort(s)} className={`px-4 py-1.5 rounded-md ${activeSort === s ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>{s}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            prompts.map((item) => (
             
              <PromptCard key={item._id} item={item} />
            ))
          )}
        </div>

         <div className="flex justify-center items-center gap-4 mt-10">
           <button 
             disabled={currentPage === 1}
             onClick={() => setCurrentPage(prev => prev - 1)}
             className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50"
           >
             Previous
           </button>
           
           <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
           
           <button 
             disabled={currentPage >= totalPages}
             onClick={() => setCurrentPage(prev => prev + 1)}
             className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50"
           >
             Next
           </button>
         </div>
      </main>
    </div>
  );
}