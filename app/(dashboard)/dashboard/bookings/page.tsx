import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";

/*Fetch function*/





async function getStudentBookings() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(
      (cookie) => `${cookie.name}=${cookie.value}`
    )
    .join("; ");

  const res = await fetch(
    "http://localhost:5000/api/bookings/student",
    {
      headers: {
        Cookie: cookieHeader, // ✅ FIX
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const json = await res.json();
  return json.data;
}



/*Page component */

export default async function StudentBookingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  const bookings = await getStudentBookings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          You have no bookings yet.
        </p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Tutor</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking: any) => (
              <tr key={booking.id}>
                <td className="border p-2">
                  {booking.tutor?.name}
                </td>

                <td className="border p-2">
                  {new Date(booking.date).toLocaleString()}
                </td>

                <td className="border p-2">
                  <span
                    className={
                      booking.status === "PENDING"
                        ? "text-yellow-600"
                        : booking.status === "ACCEPTED"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

