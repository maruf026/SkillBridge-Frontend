import BookTutor from "@/components/booking/BookTutor";
import ReviewForm from "@/components/review/ReviewForm";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

async function getTutor(id: string) {
  const res = await fetch(`http://localhost:5000/api/tutors/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data;
}

async function getTutorReviews(tutorId: string) {
  const res = await fetch(
    `http://localhost:5000/api/reviews/tutor/${tutorId}`,
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
  const reviews = await getTutorReviews(tutor.userId);

 

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="border-b border-zinc-800 pb-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {tutor.name}
              </h1>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                {tutor.category?.name || "Expert Tutor"}
              </span>
            </div>
            <div className="text-right">
              <p className="text-zinc-500 text-sm uppercase tracking-wider font-semibold">
                Hourly Rate
              </p>
              <p className="text-3xl font-bold text-green-400">
                ৳{tutor.hourlyRate}
              </p>
            </div>
          </div>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mt-4">
            {tutor.bio}
          </p>
        </div>

        {/* Availability Grid */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="Ref-8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-xl font-semibold">Availability Schedule</h2>
          </div>

          <div className="grid gap-4">
            {Object.entries(tutor.availability).map(([day, slots]: any) => (
              <div
                key={day}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-700"
              >
                <p className="font-medium text-zinc-300 min-w-25 mb-2 sm:mb-0">
                  {day}
                </p>

                <div className="flex flex-wrap gap-2">
                  {slots.map((slot: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-300 group-hover:border-blue-500/30 transition-all"
                    >
                      {slot.from} – {slot.to}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div key={review.id} className="border p-4 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <strong>{review.student?.name}</strong>
                    <span className="text-yellow-600">
                      {"★".repeat(review.rating)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        

        {/* Booking Component Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10"></div>
          <div className="relative">
            <BookTutor
              tutorId={tutor.userId}
              isLoggedIn={!!user}
              role={user?.role}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
