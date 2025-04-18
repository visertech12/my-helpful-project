
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full px-6 py-2 bg-white border-t border-gray-200 max-w-[480px] left-[50%] translate-x-[-50%] z-[10000]">
      <div className="flex justify-around items-center">
        <div 
          className={`flex flex-col items-center cursor-pointer ${isActive('/dashboard') ? 'text-orange-500' : 'text-gray-500'}`}
          onClick={() => navigate('/dashboard')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-xs">Home</span>
        </div>
        
        <div 
          className={`flex flex-col items-center cursor-pointer ${isActive('/recharge') ? 'text-orange-500' : 'text-gray-500'}`}
          onClick={() => navigate('/recharge')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9.75m18-10.5V.75a.75.75 0 0 0-.75-.75h-.75m0 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a.75.75 0 0 0-.75-.75h-2.25m0 0H5.625" />
          </svg>
          <span className="text-xs">Deposit</span>
        </div>
        
        <div
          className={`flex flex-col items-center cursor-pointer ${isActive('/profile') ? 'text-orange-500' : 'text-gray-500'}`}
          onClick={() => navigate('/profile')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span className="text-xs">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
