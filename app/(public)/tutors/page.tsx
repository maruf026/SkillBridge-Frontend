import Link from "next/link";

async function getTutors() {
  const res = await fetch("http://localhost:5000/api/tutors", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();
  return json.data;
}

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Available Tutors</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutors.map((tutor: any) => (
          <div
            key={tutor.id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-semibold text-lg">
              {tutor.name}
            </h2>

            <p className="text-sm text-gray-600">
              Hourly Rate: ৳{tutor.hourlyRate}
            </p>

            <Link
              href={`/tutors/${tutor.id}`}
              className="text-blue-600 mt-2 inline-block"
            >
              View Profile →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

