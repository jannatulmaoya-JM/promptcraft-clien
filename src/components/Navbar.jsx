'use client';

import { useState } from "react";
import { Link, Button } from "@heroui/react";

 function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/20 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PromptCraft
        </div>

        <ul className="hidden md:flex items-center gap-8">
          <li><Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link></li>
          <li><Link href="/all-prompts" className="text-gray-700 hover:text-blue-600 transition-colors">All Prompts</Link></li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
        <Button 
        as={Link} 
        href="/login" 
        variant="flat" 
        className="bg-gray-600 rounded-xl text-white hover:bg-gray-800"
      
      >
        Login
      </Button>
          <Button 
            as={Link} 
            href="/register" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90"
          >
            Sign Up
          </Button>
        </div>

   
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-6 space-y-4">
          <Link href="/" className="block">Home</Link>
          <Link href="/all-prompts" className="block">All Prompts</Link>
          <div className="flex gap-4 pt-4">
            <Button as={Link} href="/login" variant="bordered" className="w-full">Login</Button>
            <Button as={Link} href="/register" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;