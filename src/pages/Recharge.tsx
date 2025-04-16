
import { useNavigate, useParams } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Recharge = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]" 
          src="https://cdn-icons-png.flaticon.com/128/2953/2953536.png" 
          alt="" 
        />
        
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
                <h1 className="text-white text-[16px]">Top-up for TSLA</h1>
              </div>
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="" 
                />
              </div>
            </div>

            <div className="mt-[50px]">
              <div className="bg-white/50 backdrop-blur p-2 rounded-[10px]">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <h1 className="text-orange-500 font-semibold text-[16px]">Current Balance</h1>
                    <h1 className="text-orange-500 font-semibold text-[26px]">$0.00</h1>
                  </div>
                  <img 
                    className="w-[70px] h-[70px]" 
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/secure-wallet-3d-icon-download-in-png-blend-fbx-gltf-file-formats--balance-money-business-payment-shopping-pack-e-commerce-icons-5769610.png?f=webp" 
                    alt="" 
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-orange-600">
                  Amount
                </label>
                <div className="relative mb-2">
                  <Input
                    type="number"
                    className="bg-white/50 text-orange-400 ps-10 border-2 border-orange-500 focus:outline-none"
                    placeholder="Enter Amount to Deposit"
                    value="50"
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-orange-600">
                    Deposit Method
                  </label>
                  <select className="bg-white/50 text-orange-500 text-sm rounded-lg w-full p-[12px] border-2 border-orange-600 focus:outline-none">
                    <option>Select Deposit Method</option>
                    <option value="1000">bKash</option>
                    <option value="1001">Nagad</option>
                    <option value="1002">USDT</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <div className="border-2 border-orange-500 rounded-[10px] my-[20px]">
                  <div className="px-3 border-b-2 border-orange-500">
                    <h1 className="font-normal text-[14px] text-gray-500 mt-2">Our bKash Number:</h1>
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="font-bold text-sm text-orange-500 text-nowrap truncate">017xxxxxx66</h1>
                      <button className="text-orange-500 hover:text-orange-600 cursor-pointer">Copy</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 border-b-2 border-orange-500">
                    <h1 className="font-normal text-[14px] text-gray-500 my-2">Amount:</h1>
                    <h1 className="font-bold text-sm my-2 text-orange-500">50.00 USDT</h1>
                  </div>
                  <div className="flex items-center justify-between px-3 border-b-2 border-orange-500">
                    <h1 className="font-normal text-[14px] text-gray-500 my-2">Rate:</h1>
                    <h1 className="font-bold text-sm my-2 text-orange-500">1 USDT = 100.00 Taka</h1>
                  </div>
                  <div className="flex items-center justify-between px-3">
                    <h1 className="font-normal text-[14px] text-gray-500 my-2">You Need To Pay:</h1>
                    <h1 className="font-bold text-sm my-2 text-orange-500">5000.00 Taka</h1>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="bg-white/50 rounded-[20px] p-4">
                  <h1 className="text-center text-[16px] font-semibold text-orange-600 underline">
                    After Pay Fill This Form Carefully
                  </h1>
                  <div className="mt-[10px]">
                    <label className="block mb-2 text-sm font-medium text-orange-500">
                      Your Payment Transaction ID
                    </label>
                    <div className="relative mb-2">
                      <Input
                        type="text"
                        className="bg-white/50 text-orange-400 ps-10 border-2 border-orange-500 focus:outline-none"
                        placeholder="Enter your Payment Transaction ID"
                      />
                    </div>
                  </div>
                  <div className="mt-[10px] mb-[30px]">
                    <label className="block mb-2 text-sm font-medium text-orange-500">
                      Upload Payment Screenshot
                    </label>
                    <input
                      className="block w-full bg-transparent text-sm text-orange-500 border-2 border-orange-500 rounded-lg cursor-pointer bg-orange-50 py-[5px]"
                      type="file"
                      name="screenshot"
                    />
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-gradient-to-b from-orange-500 to-orange-400 hover:bg-gradient-to-t"
                    >
                      Send Deposit Request!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Recharge;
