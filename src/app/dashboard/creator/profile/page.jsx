
import MyProfilePage from "@/components/MyProfilePage";

export default async function CreatorProfile() {
  const creatorData = await getCreatorData(); 

  return (
    <MyProfilePage 
      role="CREATOR" 
      userData={creatorData} 
    />
  );
}