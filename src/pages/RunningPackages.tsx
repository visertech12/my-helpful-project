
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserPackage {
  id: string;
  package: {
    name: string;
    price: number;
    daily_profit_percentage: number;
    duration_days: number;
    total_return_percentage: number;
  };
  purchase_amount: number;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

const RunningPackages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserPackages = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('user_packages')
          .select(`
            id,
            purchase_amount,
            status,
            start_date,
            end_date,
            created_at,
            package:package_id (
              name, 
              price, 
              daily_profit_percentage, 
              duration_days, 
              total_return_percentage
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          toast({
            variant: "destructive",
            title: "Error fetching packages",
            description: error.message
          });
          return;
        }

        setPackages(data || []);
      } catch (error) {
        console.error("Error fetching user packages:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your stocks. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPackages();
  }, [user, toast]);

  // Calculate days remaining between now and end date
  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days > 0 ? days : 0;
  };

  // Calculate daily profit amount
  const calculateDailyProfit = (purchaseAmount: number, dailyProfitPercentage: number) => {
    return (purchaseAmount * dailyProfitPercentage) / 100;
  };

  // Calculate total profit
  const calculateTotalProfit = (purchaseAmount: number, totalReturnPercentage: number) => {
    return (purchaseAmount * totalReturnPercentage) / 100;
  };

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        {/* Background gradient */}
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        
        {/* Decorative image */}
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]"
          src="https://cdn-icons-png.flaticon.com/128/9226/9226554.png" 
          alt="decorative"
        />
        
        <div className="relative z-[2]">
          <div className="p-[15px]">
            {/* Header with back button and avatar */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
                <div>
                  <img 
                    className="w-[20px] cursor-pointer" 
                    src="https://cdn-icons-png.flaticon.com/128/507/507257.png" 
                    alt="back"
                    onClick={() => navigate(-1)}
                  />
                </div>
                <h1 className="text-white text-[16px]">My Stocks</h1>
              </div>
              
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="user avatar"
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-[8px] mt-4 mb-20">
            {isLoading ? (
              <div className="h-[65vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : packages.length === 0 ? (
              <div className="container h-[65vh] grid grid-cols-1 content-center justify-items-center">
                <div className="grid content-center justify-items-center">
                  <img width="60px" className="hue-rotate-[224deg]" src="https://cdn-icons-png.flaticon.com/128/16504/16504070.png" alt="no packages" />
                  <h1 className="text-gray-500 text-sm mt-2">No Running Stocks Found!</h1>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold text-orange-600">{pkg.package.name}</h2>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          pkg.status === 'active' ? 'bg-green-100 text-green-800' : 
                          pkg.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                        <Timer className="h-4 w-4" />
                        <span>
                          {pkg.status === 'active' ? 
                            `${calculateDaysRemaining(pkg.end_date)} days remaining` : 
                            'Completed'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div className="bg-orange-50 p-2 rounded">
                          <p className="text-orange-700">Purchase Amount</p>
                          <p className="font-semibold">${pkg.purchase_amount.toFixed(2)}</p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded">
                          <p className="text-orange-700">Daily Profit</p>
                          <p className="font-semibold">${calculateDailyProfit(pkg.purchase_amount, pkg.package.daily_profit_percentage).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-orange-50 p-2 rounded">
                          <p className="text-orange-700">Total Profit</p>
                          <p className="font-semibold">${calculateTotalProfit(pkg.purchase_amount, pkg.package.total_return_percentage).toFixed(2)}</p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded">
                          <p className="text-orange-700">Duration</p>
                          <p className="font-semibold">{pkg.package.duration_days} Days</p>
                        </div>
                      </div>
                      
                      {pkg.status === 'active' && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-orange-600 h-2.5 rounded-full" 
                              style={{ 
                                width: `${100 - (calculateDaysRemaining(pkg.end_date) / pkg.package.duration_days) * 100}%` 
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Started: {new Date(pkg.start_date).toLocaleDateString()}</span>
                            <span>Ends: {new Date(pkg.end_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default RunningPackages;
