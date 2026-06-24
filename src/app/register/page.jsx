// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { authClient } from "../../lib/auth-client"; 
// import { toast } from "react-hot-toast";

//  function SignUpPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
  

//   const from = searchParams.get("from") || "/";

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     setLoading(true);

//     try {
//       const { data, error: authError } = await authClient.signUp.email({
//         email,
//         password,
//         name,
//         callbackURL: "/login" 
//       });

//       if (authError) {
//         throw new Error(authError.message || "Registration failed");
//       }

//       toast.success("Account created successfully! Please login.");
//       router.push(`/login?from=${encodeURIComponent(from)}`);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//       toast.error(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await authClient.signIn.social({
//         provider: "google",
//         callbackURL: from, 
//         dontRedirect: true, 
//         onSuccess: () => {
//           toast.success("Signed up with Google successfully!");
//           router.replace(from);
//           router.refresh();
//         },
//         onError: (ctx) => {
//           toast.error(ctx.error.message || "Google registration failed");
//         }
//       });
//     } catch (err) {
//       toast.error("Google registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white  p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mx-auto my-10">
//       <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Create Account</h2>
//       <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">Join MediQueue today to start your learning journey</p>
//       {error && <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-xl">{error}</div>}
//       <form onSubmit={handleRegister} className="space-y-5">
//         <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label><input type="text" name="name" required placeholder="John Doe" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 text-sm bg-white dark:bg-gray-700 dark:text-white" /></div>
//         <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label><input type="email" name="email" required placeholder="you@example.com" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 text-sm bg-white dark:bg-gray-700 dark:text-white" /></div>
//         <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label><div className="relative flex items-center"><input type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••" className="w-full px-4 py-2.5 pr-11 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 text-sm bg-white dark:bg-gray-700 dark:text-white" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-gray-400 hover:text-emerald-600 transition focus:outline-none flex items-center justify-center cursor-pointer">{showPassword ? (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>) : (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>)}</button></div></div>
//         <button type="submit" disabled={loading} className="w-full py-3 text-white font-medium rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 transition disabled:opacity-60 cursor-pointer text-sm">{loading ? "Creating Account..." : "Sign Up"}</button>
//       </form>
//       <div className="relative flex py-5 items-center"><div className="flex-grow border-t border-gray-100 dark:border-gray-600"></div><span className="mx-4 text-gray-400 text-xs uppercase">or</span><div className="flex-grow border-t border-gray-100 dark:border-gray-600"></div></div>
//       <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium dark:text-white cursor-pointer"><svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.115-5.166 4.115-3.414 0-6.182-2.768-6.182-6.182s2.768-6.182 6.182-6.182c1.482 0 2.839.524 3.905 1.39l3.052-3.052C18.91 2.502 15.82 1.333 12.24 1.333 6.353 1.333 1.572 6.114 1.572 12s4.781 10.667 10.668 10.667c6.143 0 10.457-4.305 10.457-10.667 0-.714-.076-1.257-.21-1.714H12.24z" /></svg>Sign up with Google</button>
//       <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">Already have an account? <Link href={`/login?from=${encodeURIComponent(from)}`} className="text-emerald-600 font-semibold hover:underline">Log in here</Link></p>
//     </div>
//   );
// }
// export default SignUpPage;

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-hot-toast";
import * as Icons from "@gravity-ui/icons";

 function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: from,
      });
    } catch (err) {
      toast.error("Google registration failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (authError) throw new Error(authError.message || "Registration failed");

      toast.success("Account created successfully!");
      router.push(`/login?from=${encodeURIComponent(from)}`);
    } catch (err) {
      setError(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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
          <button type="submit" disabled={loading} className="w-full py-3 text-white font-medium rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition">
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="relative flex py-5 items-center"><div className="flex-grow border-t border-gray-200"></div><span className="mx-4 text-gray-400 text-xs uppercase">or</span><div className="flex-grow border-t border-gray-200"></div></div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm text-black font-medium cursor-pointer">
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

export default  SignUpPage;