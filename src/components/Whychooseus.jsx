import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-black text-center border-t border-gray-900">
      <h2 className="text-3xl font-bold text-white mb-10">Why Choose Our Platform?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {['High Quality', 'Easy Workflow', 'Community Driven'].map((title, i) => (
          <div key={i} className="p-8 border border-gray-800 rounded-2xl bg-gray-950 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">{title}</h3>
            <p className="text-gray-400">All prompts are curated and reviewed for excellence.</p>
          </div>
        ))}
      </div>
    </section>
  );
}