
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
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
                <h1 className="text-white text-[16px]">Dashboard</h1>
              </div>
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full cursor-pointer" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="Avatar" 
                  onClick={() => navigate('/profile')}
                />
              </div>
            </div>

            <div className="mt-[50px]">
              <div className="bg-white/50 backdrop-blur p-4 rounded-[10px] mb-4">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <h1 className="text-orange-500 font-semibold text-[16px]">Welcome</h1>
                    <h1 className="text-orange-500 font-semibold text-[26px]">
                      {user?.name || 'User'}
                    </h1>
                  </div>
                  <img 
                    className="w-[70px] h-[70px]" 
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/secure-wallet-3d-icon-download-in-png-blend-fbx-gltf-file-formats--balance-money-business-payment-shopping-pack-e-commerce-icons-5769610.png?f=webp" 
                    alt="Wallet" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-white/50 backdrop-blur">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="text-orange-500 text-lg font-semibold">Balance</div>
                    <div className="text-orange-500 text-2xl font-bold">$0.00</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 backdrop-blur">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="text-orange-500 text-lg font-semibold">Total Deposit</div>
                    <div className="text-orange-500 text-2xl font-bold">$0.00</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mb-6">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 px-8 py-6"
                  onClick={() => navigate('/recharge')}
                >
                  Deposit Now
                </Button>
              </div>

              <Card className="bg-white/50 backdrop-blur mb-6">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-orange-500 mb-2">Recent Transactions</h2>
                  <div className="text-center py-4 text-gray-500">
                    No transactions found
                  </div>
                </CardContent>
              </Card>

              <Button 
                variant="outline" 
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
