import Profile from "@/components/dashboard/Profile";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export default async function UserDashboardPage() {

  const session = await auth.api.getSession({ headers: await headers() });
  
 
  const userData = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "No email found",
    image: session?.user?.image || "" 
  };

  return (
    <div>
      <Profile role={session?.user?.role || "user"} userData={userData} />
    </div>
  );
}