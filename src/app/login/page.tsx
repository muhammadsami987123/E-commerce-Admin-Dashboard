"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  // Access environment variables
  const defaultEmail = process.env.NEXT_PUBLIC_DEFAULT_EMAIL ;
  const defaultPassword = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD;
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "UAE Admin Dashboard";
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "UAE E-commerce";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    setIsLoggingIn(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple demo authentication (replace with real auth in production)
    if (email === defaultEmail && password === defaultPassword) {
      setError("");
      localStorage.setItem("uae_admin_logged_in", "true");
      setIsLoggedIn(true);
    } else {
      setError("Invalid email or password.");
    }
    
    setIsLoggingIn(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">{appName}</h2>
          <p className="text-blue-200">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel - Hero/Brand section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">UAE</span>
          </div>
          <h1 className="text-white font-bold text-xl">{appName}</h1>
        </div>
        
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">Welcome back to UAE Admin Portal</h2>
          <p className="text-blue-100 text-lg">Manage your e-commerce business with our powerful dashboard.</p>
        </div>
        
        <div className="text-blue-200 text-sm">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
      
      {/* Right panel - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">UAE</span>
              </div>
              <h1 className="text-gray-800 font-bold text-xl">{appName}</h1>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-600 mb-8">Please sign in to access your dashboard</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoggingIn ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </button>
            
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Demo credentials: {defaultEmail} / {defaultPassword}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 