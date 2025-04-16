
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaKey, FaPhone, FaGlobe, FaUserPlus } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { isValidEmail, isValidPhone, isStrongPassword } from '@/lib/utils';

// Countries data for the dropdown
const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AX", name: "Aland Islands" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "AmericanSamoa" },
  // This is shortened for brevity - in a real app we would include all countries
  // You can add more countries or import a complete list
];

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    referCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate all fields
    if (!formData.username || formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    if (!formData.country) {
      setError('Please select your country');
      return;
    }
    
    if (!isStrongPassword(formData.password)) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    // All validation passed
    console.log('Registration attempt with:', formData);
    // Here you would typically make an API call to your backend
  };

  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]"
        src="https://cdn-icons-png.flaticon.com/128/11069/11069063.png"
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
              REGISTER
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Username Input */}
              <div className="pb-[1px]">
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
                    placeholder="Enter any username"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <MdEmail className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter your email Address"
                    required
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaPhone className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* Country Select */}
              <div className="pb-[1px]">
                <div className="mb-2">
                  <div className="relative mb-2">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <FaGlobe className="text-orange-500 h-4 w-4" />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="bg-white text-orange-500 text-sm rounded-[15px] w-full ps-[36px] p-[12px] border-2 border-orange-600 focus:outline-none shadow-md py-[15px]"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="IN">India</option>
                      <option value="NG">Nigeria</option>
                      {/* We would normally map through all countries */}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="pb-[1px]">
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
                    placeholder="Enter any password"
                    required
                  />
                </div>
              </div>

              {/* Referral Code Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaUserPlus className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="referCode"
                    value={formData.referCode}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter a refer code (optional)"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button type="submit" className="auth-button">
                  Sign Up
                </button>
              </div>
            </form>

            {/* Login Link */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have account?
              <Link
                to="/"
                className="font-semibold leading-6 text-orange-500 hover:text-orange-400 ps-1"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
