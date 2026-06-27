
// async function getPendingPrompts() {

//   const res = await fetch("http://localhost:5000/api/prompts", { 
//     cache: "no-store" 
//   });
//   return res.json();
// }

// export default async function AdminDashboard() {
//   const data = await getPendingPrompts();
//   const prompts = data?.data || [];                                             

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Pending Prompts</h1>
      
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="p-4">Title</th>
//               <th className="p-4">Creator</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prompts.map((prompt) => (
//               <tr key={prompt._id} className="border-b">
//                 <td className="p-4">{prompt.title}</td>
//                 <td className="p-4">{prompt.creatorEmail}</td>
//                 <td className="p-4">${prompt.price}</td>
//                 <td className="p-4">
//                   <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
//                     {prompt.status}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <button className="text-green-600 font-bold mr-3">Approve</button>
//                   <button className="text-red-600 font-bold">Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React from 'react';
async function getPendingPrompts() {
  try {
    const res = await fetch("http://localhost:5000/api/prompts", { 
      cache: "no-store" 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
   
    return Array.isArray(data) ? data : (data?.data || []);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const prompts = await getPendingPrompts();

  if (prompts.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
       
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Prompts</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Creator</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Price</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((prompt) => (
              <tr key={prompt._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{prompt.title}</td>
                <td className="p-4">{prompt.creatorEmail}</td>
                <td className="p-4">${prompt.price}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    {prompt.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="text-green-600 hover:text-green-800 font-medium text-sm">Approve</button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}