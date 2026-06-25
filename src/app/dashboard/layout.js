import DashbordSidebar from "@/components/dashbord/DashbordSidebar";

export default function RootLayout({ children }) {
  return (
     <div className="flex h-screen bg-gray-100 text-black">
        <div className="flex flex-1 overflow-hidden">
            <DashbordSidebar/>

            <div className=" flex-1 overflow-y-auto" >
                <div className="border-red-600" >
                    Navbar
                </div>
                <main className="p-5">
                    
                    {children}
                </main>
            </div>
        </div>
     </div>
  );
}