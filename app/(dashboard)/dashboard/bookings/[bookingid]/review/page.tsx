import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import ReviewForm from "@/components/review/ReviewForm";
import Link from "next/link";

async function getBooking(bookingId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function ReviewBookingPage({
  params,
}: {
  params: Promise<{ bookingid: string }>;
}) {
  const { bookingid } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "STUDENT") redirect("/dashboard");

  const booking = await getBooking(bookingid);

  if (!booking) notFound();
  if (booking.studentId !== user.id) notFound();
  if (booking.status !== "ACCEPTED") notFound();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      {/* Breadcrumb / Back Link */}
      <div className="w-full max-w-lg mb-6">
        <Link 
          href="/dashboard/bookings" 
          className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2"
        >
          ← Back to Bookings
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-10 w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">
            Leave a Review
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Share your experience to help others in the community.
          </p>
        </div>

        {/* Tutor Info Card */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
            {booking.tutor?.name?.charAt(0) || "T"}
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Reviewing Tutor</p>
            <p className="text-lg font-bold text-slate-900">{booking.tutor?.name}</p>
          </div>
        </div>

        <ReviewForm tutorId={booking.tutorId} />
      </div>

      {/* Trust Badge */}
      <p className="mt-8 text-xs text-slate-400 font-medium">
        Your feedback is verified and helps us maintain high quality tutoring.
      </p>
    </div>
  );
}