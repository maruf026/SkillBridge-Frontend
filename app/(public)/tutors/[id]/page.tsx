import { notFound } from "next/navigation";
import BookTutor from "@/components/booking/BookTutor";
import { getCurrentUser } from "@/lib/auth";


async function getTutor(id: string) {
  const res = await fetch(
    `http://localhost:5000/api/tutors/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

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
  const user = await getCurrentUser();

  if (!tutor) notFound();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold">{tutor.name}</h1>

      <p className="mt-2 text-gray-700">{tutor.bio}</p>

      <p className="mt-4">
        <strong>Hourly Rate:</strong> ৳{tutor.hourlyRate}
      </p>

      <p className="mt-2">
        <strong>Category:</strong> {tutor.category?.name}
      </p>

      <div className="mt-4">
        <strong>Availability:</strong>
        <pre className="bg-gray-100 p-3 mt-2 rounded text-sm">
          {JSON.stringify(tutor.availability, null, 2)}
        </pre>
      </div>

      {/* 👇 BOOKING COMPONENT */}
      <BookTutor
        tutorId={tutor.userId}
        isLoggedIn={!!user}
        role={user?.role}
      />
    </div>
  );
}


