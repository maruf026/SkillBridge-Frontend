import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

async function getStudentBookings() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch("http://localhost:5000/api/bookings/student", {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch bookings");
  const json = await res.json();
  return json.data;
}

export default async function StudentBookingsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "STUDENT") redirect("/dashboard");

  const bookings = await getStudentBookings();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Learning Sessions
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Track your upcoming and past bookings with tutors.
          </p>
        </div>
        <Link 
          href="/tutors" 
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          Book New Session
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-lg font-bold text-slate-900">No bookings found</h3>
          <p className="text-slate-500">You haven't scheduled any lessons yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking: any) => (
            <div 
              key={booking.id} 
              className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Header: Tutor Info & Status Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {booking.tutor?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Tutor
                    </p>
                    <h3 className="font-bold text-slate-900 text-lg line-clamp-1">
                      {booking.tutor?.name}
                    </h3>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase ${getStatusStyles(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              {/* Time Details: Clean and compact */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <svg className="text-indigo-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span className="text-sm font-bold text-slate-700">Date</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <svg className="text-indigo-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span className="text-sm font-bold text-slate-700">Time</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {new Date(booking.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Decorative accent that appears on hover */}
              <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}