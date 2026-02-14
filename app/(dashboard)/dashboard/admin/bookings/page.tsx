import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/auth"; 

async function getAllBookings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`,
    {
      
      headers: await headers(),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Booking fetch failed:", res.status);
    return [];
  }

  const json = await res.json();
  return json.data || [];
}

export default async function AdminBookingsPage() {
  // 1. Use your existing helper to get the user
  const user = await getCurrentUser();

  // 2. Protection Logic
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const bookings = await getAllBookings();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "CANCELLED":
        return "bg-rose-50 text-rose-600 border-rose-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-indigo-600 pl-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            All Bookings
          </h1>
          <p className="text-slate-500 font-bold text-lg mt-1">
            Global session monitoring and management
          </p>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b-4 border-slate-200">
              <tr>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter">Student</th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter">Tutor</th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter">Schedule</th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {bookings.map((b: any) => (
                <tr key={b.id} className="hover:bg-indigo-50/20 transition-all group">
                  <td className="px-10 py-7">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-800">{b.student?.name}</span>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{b.student?.email}</span>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <span className="text-lg font-black text-indigo-700">{b.tutor?.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="text-base font-bold text-slate-700">
                      {new Date(b.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="text-sm font-black text-indigo-500 uppercase">
                      {new Date(b.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-10 py-7 text-center">
                    <span className={`px-6 py-2 rounded-2xl text-xs font-black tracking-widest uppercase border-2 shadow-sm ${getStatusStyle(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="py-32 text-center bg-slate-50/50">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-slate-400 text-xl font-black italic">No booking records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}