
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { Loader2 } from "lucide-react";

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'bonus' | 'referral' | 'withdrawal_refund';
  status: string;
  description: string;
  created_at: string;
}

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/");
          return;
        }
        
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setTransactions(data || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to load transaction history",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, [navigate]);
  
  const filteredTransactions = activeTab === "all"
    ? transactions
    : transactions.filter(transaction => transaction.type === activeTab);
    
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'deposit':
        return "https://cdn-icons-png.flaticon.com/128/9464/9464070.png";
      case 'withdrawal':
        return "https://cdn-icons-png.flaticon.com/128/9464/9464456.png";
      case 'bonus':
        return "https://cdn-icons-png.flaticon.com/128/5501/5501380.png";
      case 'referral':
        return "https://cdn-icons-png.flaticon.com/128/9464/9464290.png";
      case 'withdrawal_refund':
        return "https://cdn-icons-png.flaticon.com/128/5501/5501380.png";
      default:
        return "https://cdn-icons-png.flaticon.com/128/5501/5501410.png";
    }
  };
  
  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]" 
          src="https://cdn-icons-png.flaticon.com/128/3297/3297964.png" 
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
                <h1 className="text-white text-[16px]">Transaction History</h1>
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

          <div className="bg-white/50 backdrop-blur min-h-screen mx-auto px-[15px] pt-[30px] mt-[20px] rounded-t-[20px]">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-5 bg-orange-100 border-2 border-orange-300 rounded-full mb-6">
                <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="deposit" className="rounded-full data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Deposit
                </TabsTrigger>
                <TabsTrigger value="withdrawal" className="rounded-full data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Withdraw
                </TabsTrigger>
                <TabsTrigger value="referral" className="rounded-full data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Referral
                </TabsTrigger>
                <TabsTrigger value="bonus" className="rounded-full data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Bonus
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-2">
                {isLoading ? (
                  <div className="flex items-center justify-center h-52">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                  </div>
                ) : filteredTransactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-52 text-center">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/128/7486/7486744.png" 
                      alt="No transactions" 
                      className="w-20 h-20 mb-4 opacity-50"
                    />
                    <p className="text-gray-500 font-medium">No transactions found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
                        <div className="bg-orange-100 rounded-full p-3 mr-3">
                          <img 
                            src={getTypeIcon(transaction.type)} 
                            alt={transaction.type} 
                            className="w-8 h-8"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div className="font-medium capitalize">
                              {transaction.type.replace('_', ' ')}
                            </div>
                            <div className={`font-semibold ${transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'}`}>
                              {transaction.type === 'withdrawal' ? '-' : '+'} ${transaction.amount}
                            </div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <div className="text-xs text-gray-500">
                              {new Date(transaction.created_at).toLocaleString()}
                            </div>
                            <div className="text-xs">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {transaction.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default TransactionHistory;
