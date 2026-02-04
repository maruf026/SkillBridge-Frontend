import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasTutorProfile } from "@/lib/tutor";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const commonCardStyles = "group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all duration-200";
  const iconBoxStyles = "w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xl mb-4 group-hover:bg-indigo-50 transition-colors";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* HEADER SECTION */}
      <header className="mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Overview</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
          {user.role === "ADMIN" ? "System Control" : `Welcome back, ${user.name.split(' ')[0]}!`}
        </h1>
        <p className="text-slate-500 font-medium">Manage your activities and account settings.</p>
      </header>

      {/* STUDENT DASHBOARD */}
      {user.role === "STUDENT" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/tutors" className={commonCardStyles}>
            <div className={iconBoxStyles}>🔍</div>
            <h2 className="font-bold text-slate-900 mb-1">Browse Tutors</h2>
            <p className="text-sm text-slate-500 leading-relaxed">Find expert educators based on subject and budget.</p>
          </Link>

          <Link href="/dashboard/bookings" className={commonCardStyles}>
            <div className={iconBoxStyles}>📖</div>
            <h2 className="font-bold text-slate-900 mb-1">My Bookings</h2>
            <p className="text-sm text-slate-500 leading-relaxed">Check your upcoming lessons and session history.</p>
          </Link>

          <Link href="/dashboard/profile" className={commonCardStyles}>
            <div className={iconBoxStyles}>👤</div>
            <h2 className="font-bold text-slate-900 mb-1">Account Settings</h2>
            <p className="text-sm text-slate-500 leading-relaxed">Update your personal information and preferences.</p>
          </Link>
        </div>
      )}

      {/* TUTOR DASHBOARD */}
      {user.role === "TUTOR" && (() => {
        // Handle logic inside the component flow
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/dashboard/tutor/bookings" className={commonCardStyles}>
              <div className={iconBoxStyles}>📚</div>
              <h2 className="font-bold text-slate-900 mb-1">Booking Requests</h2>
              <p className="text-sm text-slate-500 leading-relaxed">Manage new student requests and schedule sessions.</p>
            </Link>

            <Link href="/dashboard/tutor/profile" className={commonCardStyles}>
              <div className={iconBoxStyles}>✏️</div>
              <h2 className="font-bold text-slate-900 mb-1">Profile Manager</h2>
              <p className="text-sm text-slate-500 leading-relaxed">Keep your bio, rates, and availability up to date.</p>
            </Link>
          </div>
        )
      })()}

      {/* ADMIN DASHBOARD */}
      {user.role === "ADMIN" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard/admin/users" className={commonCardStyles}>
            <div className={iconBoxStyles}>👥</div>
            <h2 className="font-bold text-slate-900 mb-1">Manage Users</h2>
            <p className="text-sm text-slate-500 leading-relaxed">Approve tutors and manage account permissions.</p>
          </Link>

          <Link href="/dashboard/admin/bookings" className={commonCardStyles}>
            <div className={iconBoxStyles}>📊</div>
            <h2 className="font-bold text-slate-900 mb-1">Global Bookings</h2>
            <p className="text-sm text-slate-500 leading-relaxed">Monitor all platform transactions and schedules.</p>
          </Link>

          <Link href="/dashboard/admin/categories" className={commonCardStyles}>
            <div className={iconBoxStyles}>🗂️</div>
            <h2 className="font-bold text-slate-900 mb-1">Categories</h2>
            <p className="text-sm text-slate-500 leading-relaxed">Organize subjects and teaching departments.</p>
          </Link>
        </div>
      )}
    </div>
  );
}