"use client"

import { Card, Chip } from "@heroui/react";
import Image from "next/image"; 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function PromptCard({ item }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
     
    useEffect(() => {
     const checkSession = async () => {
            const { data: session } = await authClient.getSession();
            setIsLoggedIn(!!session);
        };
        checkSession();
    }, []);

     if (!item) return null;
  const handleViewDetails = () => {
    if (isLoggedIn) {
            router.push(`/prompt/${item._id}`);
        } else {
            router.push("/login");
        }

  };
  return (
    <Card className="max-w-[340px] hover:scale-[1.02] transition-transform duration-300 bg-white border border-slate-200 p-0 overflow-hidden shadow-sm">
      <div className="relative w-full h-[200px]">
        <Image
          alt={item.title || "Prompt Image"}
          src={item.image || "/placeholder.jpg"}
          fill
          className="object-cover"
          sizes="(max-width: 340px) 100vw, 340px"
        />
      </div>
      
      <div className="px-4 py-3 flex flex-col gap-2">
        <div className="flex gap-2 mb-1 flex-wrap">
        
          <Chip size="sm" variant="flat" className="bg-blue-100 text-blue-700">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              {item.aiEngine}
            </span>
          </Chip>

        
          {item.badge && (
            <Chip 
              size="sm" 
              variant="solid" 
              className={item.badge === "Premium" ? "bg-yellow-500 text-white" : "bg-purple-500 text-white"}
            >
              {item.badge}
            </Chip>
          )}
        </div>
        
        <h4 className="font-bold text-large text-slate-900">{item.title}</h4>
        <p className="text-small text-slate-500 line-clamp-2">{item.description}</p>
      </div>
      
      <div className="px-4 py-3 flex justify-between items-center border-t border-slate-100 mt-2">
        <p className="text-tiny text-slate-400">By {item.author}</p>
        <button
         onClick={handleViewDetails}
         className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-tiny px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
          View Details
        </button>
      </div>
    </Card>
  );
}

