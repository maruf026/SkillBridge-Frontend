"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner"; // 1. Import toast

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 2. Use toast.promise for the registration flow
    toast.promise(
      async () => {
        const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Registration failed");
        }

        // Delay redirect so they can see the success toast
        setTimeout(() => {
          router.push("/login");
        }, 1500);

        return `Welcome, ${form.name.split(' ')[0]}! Your account is ready.`;
      },
      {
        loading: "Creating your SkillBridge account...",
        success: (msg) => `${msg}`,
        error: (err) => `${err.message}`,
      }
    );

    setIsLoading(false);
  };

  const inputStyles = "w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-900 font-semibold placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none bg-white";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <h2 className="mt-6 text-center text-4xl font-black text-slate-900 tracking-tight">
          Join SkillBridge
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 underline decoration-2 underline-offset-4">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-2xl shadow-slate-200/60 border border-slate-100 sm:rounded-[2.5rem] sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* ROLE SELECTION CARDS */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "STUDENT" })}
                className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center ${
                  form.role === "STUDENT" 
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner" 
                  : "border-slate-100 bg-slate-50/50 text-slate-400 hover:border-slate-200"
                }`}
              >
                <span className="text-3xl mb-1">🎓</span>
                <span className="text-xs font-black uppercase tracking-widest">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "TUTOR" })}
                className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center ${
                  form.role === "TUTOR" 
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner" 
                  : "border-slate-100 bg-slate-50/50 text-slate-400 hover:border-slate-200"
                }`}
              >
                <span className="text-3xl mb-1">👨‍🏫</span>
                <span className="text-xs font-black uppercase tracking-widest">Tutor</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
              <input
                required
                className={inputStyles}
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-700 mb-1 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                className={inputStyles}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-700 mb-1 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                className={inputStyles}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full flex justify-center py-5 px-4 rounded-2xl shadow-xl shadow-indigo-100 text-lg font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.97] disabled:opacity-70"
            >
              {isLoading ? (
                 <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                 </span>
              ) : "Create Free Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400 font-bold leading-relaxed">
            By signing up, you agree to our <br/>
            <span className="text-slate-600 underline">Terms of Service</span> and <span className="text-slate-600 underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}