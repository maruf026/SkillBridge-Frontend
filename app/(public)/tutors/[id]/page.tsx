import BookTutor from "@/components/booking/BookTutor";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getTutor(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

async function getTutorReviews(tutorId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/tutor/${tutorId}`,
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutor = await getTutor(id);
  if (!tutor) notFound();
  
  const user = await getCurrentUser();
  const reviews = await getTutorReviews(tutor.id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Navigation / Back Button */}
      <div className="max-w-5xl mx-auto pt-8 px-4">
        <Link href="/tutors" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
          ← Browse All Tutors
        </Link>
      </div>

      <div className="max-w-5xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-3">
                  {tutor.category?.name || "Expert Tutor"}
                </span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  {tutor.name}
                </h1>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center min-w-35">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hourly Rate</p>
                <p className="text-3xl font-black text-emerald-600">৳{tutor.hourlyRate}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-3">About the Tutor</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {tutor.bio}
            </p>
          </section>

          {/* Availability Section */}
          <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Weekly Schedule</h2>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(tutor.availability).map(([day, slots]: any) => (
                <div key={day} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="font-bold text-slate-700 w-24">{day}</p>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot: any, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600">
                        {slot.from} – {slot.to}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Student Reviews</h2>
            {reviews.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No reviews yet for this tutor.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {reviews.map((review: any) => (
                  <div key={review.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex justify-between items-start mb-3">
                      <strong className="text-slate-900 font-bold">{review.student?.name}</strong>
                      <div className="flex text-amber-400">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: Booking Sticky Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-indigo-900/5 overflow-hidden">
              <div className="p-1 bg-indigo-600"></div> {/* Accent top bar */}
              <div className="p-8">
                <BookTutor
                  tutorId={tutor.userId}
                  isLoggedIn={!!user}
                  role={user?.role}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}