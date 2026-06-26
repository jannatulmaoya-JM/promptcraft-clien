'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.includes('dashboard')) {
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          setIsDropdownOpen(false);
          router.push("/");
        },
      },
    });
  };
    
     console.log("User Session Data:", user);
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/20 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PromptCraft
        </div>

        <ul className="hidden md:flex items-center gap-8">
          <li><Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link></li>
          <li><Link href="/all-prompts" className="text-gray-700 hover:text-blue-600 transition-colors">All Prompts</Link></li>
          {user && <li><Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link></li>}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
               

                <img 
                  src={user.image || "https://i.ibb.co/MBtjqXQ/no-avatar.png"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border p-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">My Profile</Link>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="flat" className="bg-gray-600 rounded-xl text-white hover:bg-gray-800">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="flat" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90">Sign Up</Button>
              </Link>
            </>
          )}
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
          {user ? (
            <>
              <Link href="/dashboard" className="block">Dashboard</Link>
              <Link href="/profile" className="block">My Profile</Link>
              <button onClick={handleLogout} className="block text-red-500">Logout</button>
            </>
          ) : (
            <div className="flex gap-4 pt-4">
              <Button as={Link} href="/login" variant="bordered" className="w-full">Login</Button>
              <Button as={Link} href="/register" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">Sign Up</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;


