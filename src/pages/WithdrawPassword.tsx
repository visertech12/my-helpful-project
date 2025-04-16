
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { Lock } from "lucide-react";

const WithdrawPassword = () => {
  const navigate = useNavigate();
  const [withdrawPin, setWithdrawPin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate pin
    if (!withdrawPin) {
      toast({
        title: "Error",
        description: "Withdraw pin is required",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically make an API call to update the withdraw pin
    toast({
      title: "Success",
      description: "Your withdraw pin has been updated successfully",
    });
  };

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]" 
          src="https://cdn-icons-png.flaticon.com/128/6195/6195699.png" 
          alt="" 
        />
        
        <div className="relative z-[2]">
          <div className="pt-[15px]">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
                <img 
                  className="w-[20px] cursor-pointer" 
                  src="https://cdn-icons-png.flaticon.com/128/507/507257.png" 
                  alt="back"
                  onClick={() => navigate(-1)}
                />
                <h1 className="text-white text-[16px]">Withdraw Password</h1>
              </div>
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="avatar" 
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur min-h-screen mx-auto px-[15px] pt-[30px] mt-[60px] rounded-t-[20px]">
            <div className="mb-2">
              <label htmlFor="withdrawPin" className="block mb-2 text-sm font-medium text-orange-600">
                Withdraw Pin
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Lock className="w-4 h-5 text-orange-400" />
                </div>
                <Input
                  type="password"
                  id="withdrawPin"
                  name="withdrawPin"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Your Withdraw Pin"
                  value={withdrawPin}
                  onChange={(e) => setWithdrawPin(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full py-3 font-semibold text-white rounded-[10px] shadow-lg my-2 bg-gradient-to-r hover:bg-gradient-to-l from-orange-500 to-orange-400 shadow-md shadow-orange-700/40"
            >
              Update Pin
            </Button>
          </form>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default WithdrawPassword;
