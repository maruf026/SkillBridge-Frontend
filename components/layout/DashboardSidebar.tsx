"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardSidebar({
  user,
}: {
  user: {
    name: string;
    role: "STUDENT" | "TUTOR" | "ADMIN";
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking a link (especially important for mobile)
  const closeSidebar = () => setIsOpen(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const logout = async () => {
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;
    setLoggingOut(true);
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  const navItemClasses = (href: string) => `
    flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm
    ${pathname === href 
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
      : "text-slate-400 hover:bg-slate-800 hover:text-white"}
  `;

  return (
    <>
      {/* --- MOBILE TOP BAR (Always Visible on Mobile) --- */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0B1120] border-b border-slate-800 sticky top-0 z-[60] w-full">
        <h2 className="text-white font-black tracking-tighter text-xl text-left">SkillBridge</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-xl"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-100 w-72 bg-[#0B1120] text-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto
      `}>
        {/* Sidebar Header */}
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter text-white mb-1">SkillBridge</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">
              {user.role} Mode
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <Link href="/dashboard" className={navItemClasses("/dashboard")} onClick={closeSidebar}>
             📊 Dashboard
          </Link>
          <Link href="/dashboard/profile" className={navItemClasses("/dashboard/profile")} onClick={closeSidebar}>
             👤 My Profile
          </Link>

          <div className="mt-8 pt-8 border-t border-slate-800/50">
            <p className="px-4 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Management</p>
            
            {user.role === "STUDENT" && (
              <>
                <Link href="/tutors" className={navItemClasses("/tutors")} onClick={closeSidebar}>🔍 Browse Tutors</Link>
                <Link href="/dashboard/bookings" className={navItemClasses("/dashboard/bookings")} onClick={closeSidebar}>📖 My Bookings</Link>
              </>
            )}

            {user.role === "TUTOR" && (
              <>
                <Link href="/dashboard/tutor/bookings" className={navItemClasses("/dashboard/tutor/bookings")} onClick={closeSidebar}>📚 Requests</Link>
                <Link href="/dashboard/tutor/profile" className={navItemClasses("/dashboard/tutor/profile")} onClick={closeSidebar}>✏️ Edit Profile</Link>
              </>
            )}

            {user.role === "ADMIN" && (
              <>
                <Link href="/dashboard/admin/users" className={navItemClasses("/dashboard/admin/users")} onClick={closeSidebar}>👥 Users</Link>
                <Link href="/dashboard/admin/bookings" className={navItemClasses("/dashboard/admin/bookings")} onClick={closeSidebar}>📊 All Bookings</Link>
              </>
            )}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-6 mt-auto border-t border-slate-800/50">
          <button
            onClick={logout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-400 font-bold hover:bg-rose-500/10 transition-colors disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "🚪 Logout Session"}
          </button>
        </div>
      </aside>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-80 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}