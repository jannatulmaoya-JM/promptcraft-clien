"use client";

import { User } from "lucide-react";

export default function MyProfilePage({ role, userData }) {

  console.log("User Data Object:", userData);
  return (
    <div className="p-8">
    
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">User Account Profile</h1>
        <p className="text-gray-50">Manage your plan, credentials, and published prompt details.</p>
      </div>

      
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm max-w-4xl">
        <div className="flex items-center gap-6 mb-10">

          <div className="w-20 h-20 rounded-full border-2 border-blue-400 overflow-hidden bg-gray-100 flex items-center justify-center">
            {userData?.image ? (
              <img 
                src={userData.image} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-blue-500" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{userData?.name || "User"}</h2>
            <p className="text-gray-500 mb-3">{userData?.email}</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full uppercase font-bold border border-purple-200">ROLE: {role || "USER"}</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full uppercase font-bold border border-yellow-200">PLAN: FREE</span>
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-300 hover:border-blue-700">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Prompts Published</p>
            <p className="text-4xl b font-bold text-gray-900">0</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-300 hover:border-blue-700">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Account Status</p>
            <p className="text-xl font-bold text-green-600 mt-1">Verified Member</p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 hover:border-blue-700 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Upgrade to Pro Lifetime</h3>
            <p className="text-gray-500 text-sm">Unlock access to all private templates for $5.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md">
            Upgrade Now ($5)
          </button>
        </div>
      </div>
    </div>
  );
}