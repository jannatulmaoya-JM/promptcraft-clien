"use client";
import { Card, Chip } from "@heroui/react";
import Image from "next/image"; 


export default function PromptCard({ item }) {
   if (!item) return null;

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
        <div className="flex gap-2 mb-1">
          <Chip size="sm" color="primary" variant="flat">{item.aiEngine}</Chip>
          {item.badge && (
            <Chip size="sm" color="warning" variant="solid">{item.badge}</Chip>
          )}
        </div>
        
        <h4 className="font-bold text-large text-slate-900">{item.title}</h4>
        <p className="text-small text-slate-500 line-clamp-2">{item.description}</p>
      </div>
      
      <div className="px-4 py-3 flex justify-between items-center border-t border-slate-100 mt-2">
        <p className="text-tiny text-slate-400">By {item.author}</p>
        <button className="bg-slate-900 text-white text-tiny px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
          View Details
        </button>
      </div>
    </Card>
  );
}