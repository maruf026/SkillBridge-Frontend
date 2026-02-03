import TutorsClient from "@/components/tutor/TutorsClient";


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
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header Section */}
      <header className="bg-white border-b border-slate-200 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-50 text-indigo-600 mb-4">
              Expert Mentors
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Find your perfect tutor
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Browse through our verified community of educators, filters by subject, 
              and start your journey toward mastering new skills today.
            </p>
          </div>
        </div>
      </header>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-8">
          {/* TutorsClient handles the filters and grid internally */}
          <TutorsClient tutors={tutors} />
        </div>
      </main>
    </div>
  );
}