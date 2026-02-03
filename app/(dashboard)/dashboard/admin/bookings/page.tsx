import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

async function getAllBookings() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    "http://localhost:5000/api/admin/bookings",
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch bookings");

  const json = await res.json();
  return json.data;
}

export default async function AdminBookingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const bookings = await getAllBookings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-zinc-900">
            <th className="border p-2">Student</th>
            <th className="border p-2">Tutor</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b: any) => (
            <tr key={b.id}>
              <td className="border p-2">{b.student?.name}</td>
              <td className="border p-2">{b.tutor?.name}</td>
              <td className="border p-2">
                {new Date(b.date).toLocaleString()}
              </td>
              <td className="border p-2">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
