"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AddPromptForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const session = await authClient.getSession();
    console.log("Full Session Object:", session);
    console.log("Token Value:", session?.token);
    const token = session?.token;

    const formData = {
      title: e.target.title.value,
      details: e.target.details.value,
      price: parseFloat(e.target.price.value),
      category: e.target.category.value,
      status: "pending"
    };

    try {
      const res = await fetch('http://localhost:5000/api/prompts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        alert("Prompt submitted successfully!");
        e.target.reset();
      } else {
        alert("Submission failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Prompt</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt Title</label>
        <input name="title" type="text" required className="w-full px-4 py-2 border rounded-lg text-gray-900 outline-none" placeholder="Enter title" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt Details</label>
        <textarea name="details" required className="w-full px-4 py-2 border rounded-lg text-gray-900 outline-none h-32" placeholder="Enter your AI prompt here"></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input name="price" type="number" required className="w-full px-4 py-2 border rounded-lg text-gray-900 outline-none" placeholder="0.00" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select name="category" required className="w-full px-4 py-2 border rounded-lg text-gray-900 outline-none bg-white">
          <option value="coding">Coding</option>
          <option value="writing">Writing</option>
          <option value="design">Design</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Submit for Approval"}
      </button>
    </form>
  );
}