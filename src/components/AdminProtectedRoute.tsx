
import { ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { profile, isLoading } = useAuth();
  const location = useLocation();
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  if (isLoading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // Allow access if user has admin role
  if (profile && profile.email === 'admin@example.com') {
    return <>{children}</>;
  }

  // Redirect to admin login page
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export default AdminProtectedRoute;
