"use client";

import { useState ,useEffect} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-hot-toast";
import * as Icons from "@gravity-ui/icons";


export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await authClient.getSession();
      if (session) {
        router.push("/dashboard");
      } else {
        setIsChecking(false);
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL:"/dashboard",
      });
    } catch (err) {
      toast.error("Google registration failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");
    const role = formData.get("role");

    try {
      const {  error: authError } = await authClient.signUp.email({
        email,
        password,
        name: name,
        additionalFields: {
           image: image,
           role: role,
          plan: 'free',
        },
        callbackURL: "/login",
      });

      if (authError) throw new Error(authError.message || "Registration failed");

      toast.success("Account created successfully!");
      
     
        router.push("/login");
      
    } catch (err) {
      setError(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  if (isChecking) return null;
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 bg-gray-50/50">
      <div className="max-w-sm w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-extrabold text-center mb-1 text-gray-900">Create Account</h2>
        <p className="text-xs text-gray-500 text-center mb-6">Join PromptCraft and start your creative journey</p>

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-xl">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name" required placeholder="Enter Your Name" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" name="image" required placeholder="Image URL" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" required placeholder="Enter Your Email" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative flex items-center">
              <input type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-gray-400 hover:text-blue-600 transition">
                {showPassword ? <Icons.EyeSlash size={20} /> : <Icons.Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Signup Role</label>
            <select name="role" required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900 bg-white">
              <option value="user">User</option>
              <option value="creator">Creator</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="w-full py-3 text-white font-medium rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition">
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="relative flex py-5 items-center"><div className="flex-grow border-t border-gray-200"></div><span className="mx-4 text-gray-400 text-xs uppercase">or</span><div className="flex-grow border-t border-gray-200"></div></div>

        <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm text-black font-medium cursor-pointer">
          <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.115-5.166 4.115-3.414 0-6.182-2.768-6.182-6.182s2.768-6.182 6.182-6.182c1.482 0 2.839.524 3.905 1.39l3.052-3.052C18.91 2.502 15.82 1.333 12.24 1.333 6.353 1.333 1.572 6.114 1.572 12s4.781 10.667 10.668 10.667c6.143 0 10.457-4.305 10.457-10.667 0-.714-.076-1.257-.21-1.714H12.24z" /></svg>
          Sign up with Google
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
}
