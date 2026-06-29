"use client";

import MyProfilePage from "@/components/dashboard/Profile";



export default function AdminPage() {
  
  const adminData = {
    name: "Admin Name",
    email: "admin@example.com",
    image: "", 
    plan: "PREMIUM",
    publishedCount: 10
  };

  return (
    <div>
      <MyProfilePage role="ADMIN" userData={adminData} />
    </div>
  );
}