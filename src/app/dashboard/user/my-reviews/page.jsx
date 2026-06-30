
"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [session, setSession] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchUserAndReviews() {
      try {
       
        const sessionData = await authClient.getSession();
        if (!sessionData) {
          setLoading(false);
          return;
        }
        setSession(sessionData);

        const userId = sessionData.user?.id;
        if (userId) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/reviews/${userId}`);
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndReviews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!session) return <p>Please login to view your reviews.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r._id} className="p-4 bg-white border rounded-lg shadow-sm">
            <p className="font-semibold">{r.promptTitle}</p>
            <p className="text-gray-600 italic">"{r.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}