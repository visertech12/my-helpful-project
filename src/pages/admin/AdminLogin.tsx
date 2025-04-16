
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { FaUser, FaKey } from "react-icons/fa";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      // Check if user has admin role
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        throw userError;
      }

      if (userData.role !== 'admin') {
        throw new Error('Not authorized as admin');
      }

      toast({
        title: "Success",
        description: "Welcome to admin panel",
      });
      
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-orange-500">Admin Login</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your platform</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaUser className="text-orange-500 h-4 w-4" />
              </div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
                placeholder="Admin Email"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaKey className="text-orange-500 h-4 w-4" />
              </div>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
                placeholder="Admin Password"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to Admin Panel"}
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Default Admin Credentials</h3>
          <p className="text-xs text-gray-500">Email: admin@example.com</p>
          <p className="text-xs text-gray-500">Password: Admin@123</p>
          <p className="text-xs text-gray-500 mt-2">Please change these credentials after first login.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
