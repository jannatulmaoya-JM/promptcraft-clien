
'use client';

import { Link } from "@heroui/react";
import * as Icons from "@gravity-ui/icons";
import { usePathname } from "next/navigation";

function Footer() {

  const pathname = usePathname()
     if (pathname.includes('dashboard')){
      return null;
     }


  return (
    <footer className="w-full border-t border-gray-200 bg-gray-300 py-16">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            PromptCraft
          </h2>
          <p className="text-sm text-gray-700 font-medium leading-relaxed">
              PromptCraft is your ultimate hub for discovering, creating, and sharing optimized AI prompts. 
            
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Navigation</h3>
          <ul className="space-y-4 text-sm text-gray-800">
            <li><Link href="/" className="text-gray-800 hover:text-blue-600">Home</Link></li>
            <li><Link href="/all-prompts" className="text-gray-800 hover:text-blue-600">All Prompts</Link></li>
          </ul>
        </div>

      
        <div>
          <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Resources</h3>
          <ul className="space-y-4 text-sm text-gray-800">
            <li><Link href="#" className="text-gray-800 hover:text-blue-600">Documentation</Link></li>
            <li><Link href="#" className="text-gray-800 hover:text-blue-600">Community</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Contact</h3>
          <div className="flex flex-col gap-4 text-sm text-gray-800">
            <Link href="mailto:info@promptcraft.com" className="flex items-center gap-2 text-gray-800 hover:text-blue-600">
              <Icons.Envelope size={18} /> info@promptcraft.com
            </Link>
            
            <div className="flex gap-3">
         
              {[
                { Icon: Icons.Xmark },
                { Icon: Icons.LogoFacebook },
                { Icon: Icons.LogoLinkedin },
                { Icon: Icons.LogoGithub },
              ].map((item, index) => (
                <div key={index} className="p-2 bg-gray-500 rounded-full text-gray-100">
                  <item.Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-gray-700 text-center text-xs text-gray-800">
        © {new Date().getFullYear()} PromptCraft. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;