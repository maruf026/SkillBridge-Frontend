"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ user }: { user: any }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {
      setLoggingOut(true);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } catch (err) {
      alert("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
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
          disabled={loggingOut}
          className={`text-sm ${
            loggingOut
              ? "text-zinc-500 cursor-not-allowed"
              : "text-red-400 hover:text-red-300"
          }`}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
}
