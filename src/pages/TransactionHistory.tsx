
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Transaction } from '@/types/transaction';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch with timeout
    const timeoutId = setTimeout(() => {
      // Mock transaction data
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          user_id: '123',
          amount: 100,
          type: 'deposit',
          status: 'completed',
          description: 'Initial deposit',
          created_at: '2025-03-15T12:00:00Z',
          updated_at: '2025-03-15T12:00:00Z'
        },
        {
          id: '2',
          user_id: '123',
          amount: 50,
          type: 'withdrawal',
          status: 'pending',
          description: 'Withdrawal request',
          created_at: '2025-04-01T10:30:00Z',
          updated_at: '2025-04-01T10:30:00Z'
        },
        {
          id: '3',
          user_id: '123',
          amount: 25,
          type: 'referral',
          status: 'completed',
          description: 'Referral bonus',
          created_at: '2025-04-10T15:45:00Z',
          updated_at: '2025-04-10T15:45:00Z'
        }
      ];
      
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [user]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      
      {isLoading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-2 px-4 border-b">{transaction.type}</td>
                  <td className="py-2 px-4 border-b">${transaction.amount}</td>
                  <td className="py-2 px-4 border-b">{transaction.status}</td>
                  <td className="py-2 px-4 border-b">{transaction.description || '-'}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
