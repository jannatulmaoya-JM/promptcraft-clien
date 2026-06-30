"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const session = await authClient.getSession();
      if (!session) return;
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/reviews/${session.user.id}`);
      const data = await res.json();
      setReviews(data);
    }
    fetchReviews();
  }, []);

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