
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden pb-20">
      <div className="relative overflow-x-hidden">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        
        <div className="relative z-[2]">
          <div className="p-[15px]">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
                <img 
                  className="w-[20px] cursor-pointer" 
                  src="https://cdn-icons-png.flaticon.com/128/507/507257.png" 
                  alt="back"
                  onClick={() => navigate(-1)}
                />
                <h1 className="text-white text-[16px]">Profile</h1>
              </div>
            </div>

            <div className="mt-[50px] flex flex-col items-center">
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[100px] w-[100px] rounded-full p-[2px] mb-4">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="Avatar" 
                />
              </div>
              
              <h1 className="text-2xl font-bold text-orange-500">{user?.name || 'User'}</h1>
              <p className="text-gray-600">{user?.email || 'user@example.com'}</p>

              <div className="w-full mt-8">
                <div className="bg-white/50 backdrop-blur rounded-lg p-4 mb-4">
                  <h2 className="text-lg font-semibold text-orange-500 mb-4">Account Information</h2>
                  
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="font-medium text-gray-500">Username:</div>
                    <div className="col-span-2">{user?.name || 'User'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="font-medium text-gray-500">Email:</div>
                    <div className="col-span-2">{user?.email || 'user@example.com'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="font-medium text-gray-500">Status:</div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 mb-4"
                >
                  Edit Profile
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Profile;
