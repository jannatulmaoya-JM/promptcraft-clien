"use client";
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function ReviewBar() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchReviews = async () => {
      try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/populer`);
       const data = await response.json();
       
        setReviews(data); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="py-20 text-center text-white">Loading reviews...</div>;

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-[#111118] p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">"{review.feedback || review.comment}"</p>
              
              <div className="border-t border-gray-800 pt-4 flex items-center gap-3">
               
                {review.image ? (
                  <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
                    {review.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}