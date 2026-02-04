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

  const res = await fetch("http://localhost:5000/api/bookings/tutor", {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch tutor bookings");
  const json = await res.json();
  return json.data;
}

export default async function TutorBookingsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "TUTOR") redirect("/dashboard");

  const bookings = await getTutorBookings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-100 text-amber-700 ring-amber-600/20";
      case "ACCEPTED": return "bg-emerald-100 text-emerald-700 ring-emerald-600/20";
      case "REJECTED": return "bg-rose-100 text-rose-700 ring-rose-600/20";
      default: return "bg-slate-100 text-slate-700 ring-slate-600/20";
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Booking Requests
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Manage your upcoming lessons and student inquiries.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem]">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl mb-4">
            📬
          </div>
          <h3 className="text-lg font-bold text-slate-900">Your inbox is empty</h3>
          <p className="text-slate-500">New student requests will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking: any) => (
            <div 
              key={booking.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Student Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
                  {booking.student?.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {booking.student?.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black uppercase ring-1 ring-inset ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex flex-col md:items-end gap-1">
                <div className="flex items-center gap-2 text-slate-700">
                   <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   <span className="font-bold">
                    {new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                   </span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <span>{new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Actions Section */}
              <div className="pt-4 md:pt-0 border-t md:border-none border-slate-100">
                <BookingActions
                  bookingId={booking.id}
                  status={booking.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}