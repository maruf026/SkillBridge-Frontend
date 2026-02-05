import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

async function getStudentBookings() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    "http://localhost:5000/api/bookings/student",
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch bookings");

  const json = await res.json();
  return json.data;
}

export default async function StudentBookingsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "STUDENT") redirect("/dashboard");

  const bookings = await getStudentBookings();

  const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-100",
    ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    REJECTED: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-8">
        My Learning Sessions
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
          No bookings yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking: any) => (
            <div
              key={booking.id}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs uppercase text-slate-400 font-bold">
                    Tutor
                  </p>
                  <h3 className="text-lg font-bold">
                    {booking.tutor?.name}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full border ${statusStyles[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="text-sm text-slate-600 mb-4">
                {new Date(booking.date).toLocaleString()}
              </p>

              {/* ✅ REVIEW ACTION */}
              {booking.status === "ACCEPTED" && (
                <Link
                  href={`/dashboard/bookings/${booking.id}/review`}
                  className="block text-center bg-indigo-600 text-white py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  Leave Review
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
