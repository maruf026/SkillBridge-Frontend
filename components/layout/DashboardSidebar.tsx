"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardSidebar({
  user,
}: {
  user: {
    name: string;
    role: "STUDENT" | "TUTOR" | "ADMIN";
  };
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

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

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">SkillBridge</h2>
        <p className="text-sm text-gray-400 mt-1">
          {user.name} ({user.role})
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="block px-3 py-2 rounded hover:bg-gray-800"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/dashboard/profile"
          className="block px-3 py-2 rounded hover:bg-gray-800"
        >
          👤 My Profile
        </Link>

        {/* STUDENT */}
        {user.role === "STUDENT" && (
          <>
            <Link
              href="/tutors"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              🔍 Browse Tutors
            </Link>

            <Link
              href="/dashboard/bookings"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              📖 My Bookings
            </Link>
          </>
        )}

        {/* TUTOR */}
        {user.role === "TUTOR" && (
          <>
            <Link
              href="/dashboard/tutor/bookings"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              📚 Booking Requests
            </Link>

            <Link
              href="/dashboard/tutor/profile"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              ✏️ Edit Profile
            </Link>
          </>
        )}

        {/* ADMIN */}
        {user.role === "ADMIN" && (
          <>
            <Link
              href="/dashboard/admin/users"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              👥 Manage Users
            </Link>

            <Link
              href="/dashboard/admin/bookings"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              📊 All Bookings
            </Link>

            <Link
              href="/dashboard/admin/categories"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              🗂️ Categories
            </Link>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          disabled={loggingOut}
          className="w-full text-left px-3 py-2 rounded text-red-400 hover:bg-gray-800 disabled:opacity-50"
        >
          {loggingOut ? "Logging out..." : "🚪 Logout"}
        </button>
      </div>
    </aside>
  );
}
