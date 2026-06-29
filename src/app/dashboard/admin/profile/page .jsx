
import MyProfilePage from "@/components/MyProfilePage"; 

export default async function AdminProfile() {
  const adminData = await getAdminData();
  return (
    <MyProfilePage 
      role="ADMIN" 
      userData={adminData} 
    />
  );
}