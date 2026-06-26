import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

 
  if (!session) {
    redirect("/signin");
  }

  const role = session?.user?.role;


  if (role === "admin") {
    redirect("/dashboard/admin");
  } else if (role === "creator") {
    redirect("/dashboard/creator");
  } else {
   
    redirect("/dashboard/user");
  }
}