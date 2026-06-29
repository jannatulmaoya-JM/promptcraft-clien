"use client";

import { 
  Bookmark, ChartAreaStacked, Circles3Plus, CodeFork, Factory, 
  FloppyDisk, FolderPlus, Person, Persons, ObjectsAlignBottom, 
  ObjectsAlignJustifyHorizontal, Bars 
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function DashboardSidebar({ role = "user" }) {
  const pathname = usePathname();
  const router = useRouter();
 const handleLogout = async () => {
  router.push("/login");
 };
  const dashboardItems = {
    user: [
      { icon: Person, label: "My Profile", link: '/dashboard/user' },
      { icon: Bookmark, label: "My Prompts", link: '/dashboard/user/my-prompts' },
      { icon: FloppyDisk, label: "Saved Prompts", link: '/dashboard/user/saved-prompts' },
      { icon: FolderPlus, label: "Add Prompt", link: '/dashboard/user/add-prompt' },
      { icon: Circles3Plus, label: "My Reviews", link: '/dashboard/user/my-reviews' },
    ],
    creator: [
      { icon: Person, label: "My Profile", link: '/dashboard/creator' },
      { icon: FolderPlus, label: "Dashboard Home", link: '/dashboard/creator/home' },
      { icon: Bookmark, label: "Add Prompt", link: '/dashboard/creator/add-prompt' },
      { icon: FloppyDisk, label: "My Prompts", link: '/dashboard/creator/my-prompts' },
    ],
    admin: [
      { icon: Person, label: "My Profile", link: '/dashboard/admin' },
      { icon: ObjectsAlignBottom, label: "All Users", link: '/dashboard/admin/all-users' },
      { icon: ObjectsAlignJustifyHorizontal, label: "All Prompts", link: '/dashboard/admin/all-prompts' },
      { icon: ChartAreaStacked, label: "All Payments", link: '/dashboard/admin/all-payments' },
      { icon: Factory, label: "Reported Prompts", link: '/dashboard/admin/reported-prompts' },
      { icon: CodeFork, label: "Analytics", link: '/dashboard/admin/analytics' },
    ],
  };

  const navItems = dashboardItems[role] || dashboardItems.user;

  return (
    <Drawer>
      <Drawer.Trigger>
        <div className="sm:hidden flex cursor-pointer p-2 border rounded">
         <Bars />
        </div>
      </Drawer.Trigger>

     
      <nav className="hidden sm:flex flex-col gap-1 w-64 border-r min-h-screen pt-7 px-4 text-gray-900 bg-white">
        <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 px-3">PromptCraft</h2>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              pathname === item.link ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
        </div>
        <div className="px-3 pb-6">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <FaArrowRightFromBracket className="size-5" />
            Logout
          </button>
        </div>
      </nav>

    
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog className="p-4">
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-gray-100"
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}