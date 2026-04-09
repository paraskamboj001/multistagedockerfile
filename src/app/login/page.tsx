"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      const status = response.data.status;
      if (status !== 200) {
        toast.error(response.data.error || "Login failed");
        return;
      }
      toast.success("Welcome back!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden"
    >
      {/* Soft Light Blue Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: "url('/login-bg-light.png')" }}
      />
      
      {/* Subtle Glow Effects */}
      <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-blue-200/40 rounded-full blur-[80px]" />
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-sky-200/40 rounded-full blur-[80px]" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-10">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
              {loading ? "Processing..." : "Login"}
            </h1>
            <p className="text-slate-500 text-sm">Welcome back! Please enter your details.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="text-sm font-semibold text-slate-700 ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all shadow-sm"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="text-sm font-semibold text-slate-700 ml-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all shadow-sm"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={loading}
              onClick={onLogin}
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Login"
              )}
            </button>

            <div className="pt-6 text-center border-t border-slate-100 mt-4">
              <p className="text-slate-500 text-sm">
                Don't have an account?{" "}
                <Link 
                  href="/register" 
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-8 text-center text-slate-400 text-xs">
          © 2026 Your App. All rights reserved.
        </div>
      </div>
    </div>
  );
}
