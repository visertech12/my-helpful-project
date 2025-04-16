
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Deposit {
  id: string;
  user_id: string;
  amount: number;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  status: string;
  screenshot_url: string;
  username: string;
}

const DepositsManagement = () => {
  const navigate = useNavigate();
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin/login");
        return;
      }
      
      // Check if user has admin role
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (error || data?.role !== 'admin') {
        navigate("/admin/login");
      } else {
        fetchDeposits();
      }
    };
    
    checkAdmin();
  }, [navigate]);
  
  const fetchDeposits = async () => {
    try {
      // Using a join to get username from profiles
      const { data, error } = await supabase
        .from('deposits')
        .select(`
          *,
          profiles:user_id (username)
        `);
        
      if (error) {
        throw error;
      }
      
      // Transform the data to include username directly
      const formattedDeposits = data.map(item => ({
        ...item,
        username: item.profiles?.username || 'Unknown',
      }));
      
      setDeposits(formattedDeposits || []);
    } catch (error) {
      console.error('Error fetching deposits:', error);
      toast({
        title: "Error",
        description: "Failed to load deposits",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const approveDeposit = async (depositId: string) => {
    try {
      // First, get the deposit details
      const { data: depositData, error: depositError } = await supabase
        .from('deposits')
        .select('*')
        .eq('id', depositId)
        .single();
        
      if (depositError) throw depositError;
      
      // Start a transaction
      // 1. Update deposit status to approved
      const { error: updateError } = await supabase
        .from('deposits')
        .update({ status: 'approved' })
        .eq('id', depositId);
        
      if (updateError) throw updateError;
      
      // 2. Update user's balance
      const { error: balanceError } = await supabase
        .rpc('increment_balance', { 
          user_id_param: depositData.user_id,
          amount_param: depositData.amount
        });
        
      if (balanceError) throw balanceError;
      
      // 3. Create a transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: depositData.user_id,
            amount: depositData.amount,
            type: 'deposit',
            status: 'completed',
            description: `Deposit of $${depositData.amount} approved`,
            reference_id: depositId
          }
        ]);
        
      if (transactionError) throw transactionError;
      
      // Update local state
      setDeposits(deposits.map(deposit => 
        deposit.id === depositId ? { ...deposit, status: 'approved' } : deposit
      ));
      
      toast({
        title: "Success",
        description: "Deposit approved and balance updated",
      });
    } catch (error) {
      console.error('Error approving deposit:', error);
      toast({
        title: "Error",
        description: "Failed to approve deposit",
        variant: "destructive",
      });
    }
  };
  
  const rejectDeposit = async (depositId: string) => {
    try {
      // Update deposit status to rejected
      const { error } = await supabase
        .from('deposits')
        .update({ status: 'rejected' })
        .eq('id', depositId);
        
      if (error) throw error;
      
      // Get the deposit to create transaction record
      const { data: depositData } = await supabase
        .from('deposits')
        .select('*')
        .eq('id', depositId)
        .single();
      
      // Create a transaction record for the rejection
      await supabase.from('transactions').insert([
        {
          user_id: depositData.user_id,
          amount: depositData.amount,
          type: 'deposit',
          status: 'rejected',
          description: `Deposit of $${depositData.amount} rejected`,
          reference_id: depositId
        }
      ]);
      
      // Update local state
      setDeposits(deposits.map(deposit => 
        deposit.id === depositId ? { ...deposit, status: 'rejected' } : deposit
      ));
      
      toast({
        title: "Success",
        description: "Deposit rejected",
      });
    } catch (error) {
      console.error('Error rejecting deposit:', error);
      toast({
        title: "Error",
        description: "Failed to reject deposit",
        variant: "destructive",
      });
    }
  };
  
  const filteredDeposits = deposits.filter(deposit => 
    deposit.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.payment_method?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <AdminHeader title="Deposits Management" />
        
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">All Deposits</h2>
              
              <div className="w-full md:w-64">
                <Input
                  placeholder="Search deposits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-orange-200 focus-visible:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading deposits...
                      </TableCell>
                    </TableRow>
                  ) : filteredDeposits.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No deposits found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDeposits.map((deposit) => (
                      <TableRow key={deposit.id}>
                        <TableCell>{deposit.username}</TableCell>
                        <TableCell>${deposit.amount}</TableCell>
                        <TableCell>{deposit.payment_method}</TableCell>
                        <TableCell>{deposit.transaction_id}</TableCell>
                        <TableCell>
                          {new Date(deposit.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            deposit.status === 'approved' 
                              ? 'bg-green-100 text-green-700' 
                              : deposit.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {deposit.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedDeposit(deposit)}
                                >
                                  <Eye className="h-4 w-4 text-blue-500" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Deposit Details</DialogTitle>
                                </DialogHeader>
                                {selectedDeposit && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="font-semibold">User:</div>
                                      <div>{selectedDeposit.username}</div>
                                      
                                      <div className="font-semibold">Amount:</div>
                                      <div>${selectedDeposit.amount}</div>
                                      
                                      <div className="font-semibold">Method:</div>
                                      <div>{selectedDeposit.payment_method}</div>
                                      
                                      <div className="font-semibold">Transaction ID:</div>
                                      <div>{selectedDeposit.transaction_id}</div>
                                      
                                      <div className="font-semibold">Date:</div>
                                      <div>{new Date(selectedDeposit.created_at).toLocaleString()}</div>
                                      
                                      <div className="font-semibold">Status:</div>
                                      <div>{selectedDeposit.status}</div>
                                    </div>
                                    
                                    {selectedDeposit.screenshot_url && (
                                      <div className="mt-4">
                                        <h4 className="font-semibold mb-2">Payment Screenshot</h4>
                                        <img 
                                          src={selectedDeposit.screenshot_url} 
                                          alt="Payment Screenshot" 
                                          className="w-full rounded-md border border-gray-200"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {deposit.status === 'pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => approveDeposit(deposit.id)}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => rejectDeposit(deposit.id)}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepositsManagement;
