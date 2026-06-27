"use client";
import React, { useState } from 'react';
import { FaRegBookmark, FaFlag, FaStar, FaEdit } from 'react-icons/fa';

export default function PromptDetails({ params }) {
    const { id } = params;
    const [isReportOpen, setIsReportOpen] = useState(false);

    // এখানে আপনার API থেকে ডাটা ফেচ করার লজিক হবে
    const promptData = {
        title: "Claude 3.5 Sonnet Fullstack Architect",
        description: "Creates optimal database schemas and corresponding backend route templates with security validations.",
        template: "Act as a Principal Software Architect...",
        category: "CODING",
        difficulty: "PRO"
    };

    return (
        <div className="p-8 max-w-6xl mx-auto text-white">
            <button className="mb-4 text-gray-400 hover:text-white">← Back to previous page</button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl font-bold">{promptData.title}</h1>
                        <div className="flex gap-3 text-xl">
                            <FaEdit className="cursor-pointer hover:text-blue-400" />
                            <FaRegBookmark className="cursor-pointer hover:text-yellow-400" />
                            <FaFlag 
                                className="cursor-pointer hover:text-red-500" 
                                onClick={() => setIsReportOpen(true)} 
                            />
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                        <h2 className="font-bold mb-2">Prompt Template</h2>
                        <pre className="bg-black p-4 rounded text-sm text-gray-300">{promptData.template}</pre>
                    </div>
                </div>

                {/* Right Side: Meta Info */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 h-fit space-y-4">
                    <h3 className="font-bold border-b border-gray-700 pb-2">Prompt Details</h3>
                    <p>Category: <span className="bg-blue-900 px-2 py-1 rounded text-xs">{promptData.category}</span></p>
                    <p>Difficulty: <span className="bg-purple-900 px-2 py-1 rounded text-xs">{promptData.difficulty}</span></p>
                </div>
            </div>

            {/* Review Section */}
            <div className="mt-10 bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="font-bold mb-4">Community Reviews (0)</h3>
                <textarea className="w-full bg-black border border-gray-700 p-3 rounded" placeholder="Write your review here..."></textarea>
                <button className="mt-3 bg-purple-600 px-6 py-2 rounded">Submit Review</button>
            </div>

            {/* Report Modal */}
            {isReportOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Report Prompt Template</h2>
                        <select className="w-full bg-black p-2 mb-4 border border-gray-700">
                            <option>Inappropriate Content</option>
                            <option>Plagiarism</option>
                        </select>
                        <textarea className="w-full bg-black p-2 mb-4 border border-gray-700" placeholder="Details..."></textarea>
                        <div className="flex gap-2">
                            <button onClick={() => setIsReportOpen(false)} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>
                            <button className="bg-red-600 px-4 py-2 rounded">Submit Report</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}