"use client";

import MyProfilePage from "@/components/dashboard/Profile";

 

export default function CreatorProfilePage() {
 
  const creatorData = {
    name: "Creator Name",
    email: "creator@example.com",
    image: "", 
    plan: "FREE", 
    publishedCount: 5
  };

  return (
    <div>
      <MyProfilePage role="CREATOR" userData={creatorData} />
    </div>
  );
}