import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasTutorProfile } from "@/lib/tutor";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  /* ================= STUDENT ================= */
  if (user.role === "STUDENT") {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Welcome, {user.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/tutors"
          className="border p-5 rounded-lg hover:bg-zinc-900 transition"
        >
          <h2 className="font-semibold mb-1">
            🔍 Browse Tutors
          </h2>
          <p className="text-sm text-zinc-400">
            Find tutors by category and availability
          </p>
        </a>

        <a
          href="/dashboard/bookings"
          className="border p-5 rounded-lg hover:bg-zinc-900 transition"
        >
          <h2 className="font-semibold mb-1">
            📖 My Bookings
          </h2>
          <p className="text-sm text-zinc-400">
            View booking status and history
          </p>
        </a>

        <a
          href="/dashboard/profile"
          className="border p-5 rounded-lg hover:bg-zinc-900 transition"
        >
          <h2 className="font-semibold mb-1">
            👤 My Profile
          </h2>
          <p className="text-sm text-zinc-400">
            View your account information
          </p>
        </a>
      </div>
    </div>
  );
}


  /* ================= TUTOR ================= */
  if (user.role === "TUTOR") {
    const profileExists = await hasTutorProfile();

    if (!profileExists) {
      redirect("/dashboard/tutor/profile/create");
    }

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Tutor Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/dashboard/tutor/bookings"
            className="border p-4 rounded hover:bg-zinc-900"
          >
            📚 Booking Requests
          </a>

          <a
            href="/dashboard/tutor/profile"
            className="border p-4 rounded hover:bg-zinc-900"
          >
            ✏️ Edit Profile
          </a>
        </div>
      </div>
    );
  }

  /* ================= ADMIN ================= */
  if (user.role === "ADMIN") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/dashboard/admin/users"
            className="border p-4 rounded hover:bg-zinc-900"
          >
            👥 Manage Users
          </a>

          <a
            href="/dashboard/admin/bookings"
            className="border p-4 rounded hover:bg-zinc-900"
          >
            📊 View All Bookings
          </a>

          <a
            href="/dashboard/admin/categories"
            className="border p-4 rounded hover:bg-zinc-900"
          >
            🗂️ Manage Categories
          </a>
        </div>
      </div>
    );
  }

  return null;
}
