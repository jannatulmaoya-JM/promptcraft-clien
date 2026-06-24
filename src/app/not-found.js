import Link from 'next/link';
import { ArrowShapeTurnUpLeft, ListUl } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-[120px] md:text-[150px] font-extrabold text-white leading-none">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
        Page Not Found
      </h2>
      
      
      <div className="mt-10 flex gap-4 justify-center">
        <Link 
          href="/" 
          className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition flex items-center gap-2"
        >
          <ArrowShapeTurnUpLeft size={20} />
          Go Back Home
        </Link>
        <Link 
          href="/all-prompts" 
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition flex items-center gap-2"
        >
          <ListUl size={20} />
          Browse Prompts
        </Link>
      </div>
    </div>
  );
}