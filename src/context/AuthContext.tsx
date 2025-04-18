
import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  id: string; // Added id to match what's used in other components
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simple mock authentication
      if (email && password) {
        // For demo purposes only - create user with id
        const mockUser = { 
          name: 'Demo User', 
          email,
          id: '12345'  // Add mock id
        };
        setUser(mockUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
