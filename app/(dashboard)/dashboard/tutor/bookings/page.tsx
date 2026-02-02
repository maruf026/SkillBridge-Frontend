import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import BookingActions from "@/components/booking/BookingActions";


async function getTutorBookings() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    "http://localhost:5000/api/bookings/tutor",
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tutor bookings");
  }

  const json = await res.json();
  return json.data;
}

export default async function TutorBookingsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "TUTOR") redirect("/dashboard");

  const bookings = await getTutorBookings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Booking Requests
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          No booking requests yet.
        </p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking: any) => (
              <tr key={booking.id}>
                <td className="border p-2">
                  {booking.student?.name}
                </td>

                <td className="border p-2">
                  {new Date(booking.date).toLocaleString()}
                </td>

                <td className="border p-2">
                  {booking.status}
                </td>

                <td className="border p-2">
                  <BookingActions
                    bookingId={booking.id}
                    status={booking.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
