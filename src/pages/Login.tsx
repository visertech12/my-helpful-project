
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaKey } from 'react-icons/fa';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Basic validation
      if (!formData.username) {
        throw new Error('Username or email is required');
      }
      
      if (!formData.password) {
        throw new Error('Password is required');
      }
      
      await signIn(formData.username, formData.password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]"
        src="https://cdn-icons-png.flaticon.com/128/684/684930.png"
        alt="decorative"
      />
      
      <div className="relative z-10">
        <div className="p-[15px]"></div>
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 mt-[40px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Logo */}
            <img
              className="mx-auto h-[80px] w-auto"
              src="https://mystock-admin.scriptbasket.com/assets/images/logoIcon/logo.png"
              alt="myStock"
            />
            
            {/* Heading */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white drop-shadow-md">
              LOGIN
            </h2>
          </div>

          <div className="mt-[50px] sm:mx-auto sm:w-full sm:max-w-sm">
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Username/Email Input */}
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaUser className="text-orange-500 h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Enter your email or username"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div className="pt-[10px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaKey className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="auth-button flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <Link 
                to="/register" 
                className="font-semibold leading-6 text-orange-400 hover:text-orange-500 ps-1"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
