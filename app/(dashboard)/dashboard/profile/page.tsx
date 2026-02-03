import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

async function getTutorProfile() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    "http://localhost:5000/api/tutors/profile/me",
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function MyProfilePage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  /* ================= ADMIN ================= */
  if (user.role === "ADMIN") {
    redirect("/dashboard");
  }

  /* ================= STUDENT ================= */
  if (user.role === "STUDENT") {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          My Profile
        </h1>

        <div className="border p-4 rounded">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> Student</p>
        </div>

        <div className="flex gap-4">
          <a
            href="/dashboard/bookings"
            className="border p-3 rounded hover:bg-zinc-900"
          >
            📖 My Bookings
          </a>

          <a
            href="/tutors"
            className="border p-3 rounded hover:bg-zinc-900"
          >
            🔍 Browse Tutors
          </a>
        </div>
      </div>
    );
  }

  /* ================= TUTOR ================= */
  if (user.role === "TUTOR") {
    const profile = await getTutorProfile();

    if (!profile) {
      redirect("/dashboard/tutor/profile/create");
    }

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          My Tutor Profile
        </h1>

        <div className="border p-4 rounded space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Category:</strong> {profile.category?.name}</p>
          <p><strong>Hourly Rate:</strong> ৳{profile.hourlyRate}</p>
          <p><strong>Verified:</strong> {profile.isVerified ? "Yes" : "No"}</p>
        </div>

        <div className="flex gap-4">
          <a
            href="/dashboard/tutor/profile"
            className="border p-3 rounded hover:bg-zinc-900"
          >
            ✏️ Edit Profile
          </a>

          <a
            href="/dashboard/tutor/bookings"
            className="border p-3 rounded hover:bg-zinc-900"
          >
            📚 Booking Requests
          </a>
        </div>
      </div>
    );
  }

  return null;
}
