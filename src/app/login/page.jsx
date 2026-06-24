"use client";

import { useState } from "react";
import NextLink from "next/link"; 
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-hot-toast";
import * as Icons from "@gravity-ui/icons";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    
    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
      });

      if (authError) throw new Error(authError.message || "Invalid credentials");

      toast.success("Logged in successfully!");
      router.replace(from);
      router.refresh();
    } catch (err) {
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: from,
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-5 px-4 bg-gray-50/50">
      <div className="max-w-sm w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-extrabold text-center mb-1 text-gray-900">Welcome Back</h2>
        <p className="text-xs text-gray-500 text-center mb-6">Log in to manage your sessions</p>

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-xl">{error}</div>}



<form onSubmit={handleLogin} className="space-y-5">
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
    <input 
      type="email" 
      name="email" 
      required 
      placeholder="you@example.com" 
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900 placeholder-gray-400" 
    />
  </div>
 
  <div > 
    <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-900 mb-1">Password</label>
           <NextLink href="#" className="text-sm text-emerald-500 hover:underline">Forgot password?</NextLink>
  
    </div>
  <div className="relative flex items-center">
    <input 
      type={showPassword ? "text" : "password"} 
      name="password" 
      required 
      placeholder="••••••••" 
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900 placeholder-gray-400" 
    />
    
    <button 
      type="button" 
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3.5 text-gray-400 hover:text-blue-600 transition flex items-center justify-center cursor-pointer"
    >
      {showPassword ? (
        <Icons.EyeSlash size={20} />
      ) : (
        <Icons.Eye size={20} />
      )}
    </button>
  </div>
</div>

  <button type="submit" disabled={loading} className="w-full py-3 text-white font-medium rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-700 transition">
    {loading ? "Signing in..." : "Sign In"}
  </button>
</form>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-xs uppercase">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:border-blue-500 text-sm text-black font-medium">
          Continue with Google
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account? <NextLink href="/register" className="text-blue-600 font-semibold hover:underline">Register here</NextLink>
        </p>
      </div>
    </div>
  );
}