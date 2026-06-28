import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function DashboardLayout({ children }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/signin");
    }

    const userRole = session?.user?.role || "user"; 

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <DashboardSidebar role={userRole} />

            <div className="flex-1 overflow-y-auto">
                <main className="p-5">{children}</main>
            </div>
        </div>
    );
}