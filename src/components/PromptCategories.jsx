"use client";
import React from 'react';

export default function EngineCompatibility() {
  const engines = [
    { name: "ChatGPT", version: "GPT-4o / o1", desc: "Advanced reasoning for complex problem solving." },
    { name: "Claude", version: "Claude 3.5 Sonnet", desc: "Natural creative writing and code structuring." },
    { name: "Gemini", version: "Gemini 1.5 Pro", desc: "Long context processing and deep analysis." },
    { name: "Midjourney", version: "Version 6.1", desc: "Hyper-realistic artistic rendering." }
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center">

          <h2 className="text-5xl font-extrabold text-black tracking-tight">
             Prompt <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl text-lg mx-auto">
            Explore a vast library of expert-curated prompts, specifically fine-tuned to extract the best performance from every AI model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {engines.map((engine, i) => (
            <div key={i} className="group relative bg-gray-900/50 p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-900">
             
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{engine.name}</h3>
                <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-4">{engine.version}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{engine.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}