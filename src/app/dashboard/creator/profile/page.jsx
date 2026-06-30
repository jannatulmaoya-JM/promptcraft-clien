import MyProfilePage from "@/components/dashboard/Profile";



export default async function CreatorProfile() {
  const creatorData = await getCreatorData(); 

  return (
    <MyProfilePage
      role="CREATOR" 
      userData={creatorData} 
    />
  );
}