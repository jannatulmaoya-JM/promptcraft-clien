"use client";

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0e14]">
     
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <h2 className="text-white mt-6 text-lg font-semibold animate-pulse">
        Loading ...
      </h2>
    </div>
  );
}