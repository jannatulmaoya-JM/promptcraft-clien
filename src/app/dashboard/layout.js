import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
      
    if (!session) {
        redirect("/signin");
    }

    const userRole = session?.user?.role || "user"; 
    const pathname = (await headers()).get("x-invoke-path") || "";

    if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
        redirect("/dashboard/user"); 
    }
    

      console.log("Full Session Object:", session);
    //  console.log("Checking Role before passing to Sidebar:", userRole); // এটি যোগ করুন

    return (
        <div className="flex h-screen bg-gray-100 text-black">
            <div className="flex flex-1 overflow-hidden">
                
                <DashboardSidebar role={userRole} />

                <div className="flex-1 overflow-y-auto">
                    <div className="p-5">Navbar</div>
                    <main className="p-5">{children}</main>
                </div>
            </div>
        </div>
    );
}