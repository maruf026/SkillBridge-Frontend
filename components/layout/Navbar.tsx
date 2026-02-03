"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: any }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("http://localhost:5000/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <nav className="border-b border-zinc-800 bg-black text-zinc-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LEFT */}
        <div className="flex gap-4 items-center">
          <Link href="/dashboard" className="font-bold">
            SkillBridge
          </Link>

          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/profile">My Profile</Link>

          {user.role === "STUDENT" && (
            <>
              <Link href="/tutors">Browse Tutors</Link>
              <Link href="/dashboard/bookings">My Bookings</Link>
            </>
          )}

          {user.role === "TUTOR" && (
            <>
              <Link href="/dashboard/tutor/bookings">
                Booking Requests
              </Link>
              <Link href="/dashboard/tutor/profile">
                Edit Profile
              </Link>
            </>
          )}

          {user.role === "ADMIN" && (
            <>
              <Link href="/dashboard/admin/users">
                Users
              </Link>
              <Link href="/dashboard/admin/bookings">
                Bookings
              </Link>
              <Link href="/dashboard/admin/categories">
                Categories
              </Link>
            </>
          )}
        </div>

        {/* RIGHT */}
        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
