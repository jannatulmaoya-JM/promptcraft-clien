import Profile from "@/components/dashboard/Profile";
import { auth } from "@/lib/auth"; // আপনার অথেনটিকেশন পাথ অনুযায়ী
import { headers } from "next/headers";

export default async function UserDashboardPage() {
  // সেশন থেকে ডাটা ফেচ করুন
  const session = await auth.api.getSession({ headers: await headers() });
  
  // সেশনে ডাটা থাকলে তা ব্যবহার করুন, না থাকলে ডিফল্ট
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