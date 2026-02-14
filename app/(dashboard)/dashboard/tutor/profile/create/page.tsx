import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default async function CreateTutorProfilePage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "TUTOR") redirect("/dashboard");

  async function createTutorProfile(formData: FormData) {
    "use server";

    const bio = formData.get("bio") as string;
    const categoryName = formData.get("categoryName") as string;
    const hourlyRate = Number(formData.get("hourlyRate"));

    const availabilityRaw = formData.get("availability") as string;
    const availability = JSON.parse(availabilityRaw || "{}");

    if (!bio || !categoryName || !hourlyRate || !availability) {
      return;
    }

    const incomingHeaders = await headers();
    const cookie = incomingHeaders.get("cookie") || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tutors/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie,
        },
        body: JSON.stringify({
          bio,
          categoryName,
          hourlyRate,
          availability,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to create tutor profile");
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Become an Instructor
          </h1>
          <p className="text-slate-600 font-medium">
            Set up your professional profile to start reaching students.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <form action={createTutorProfile} className="p-8 space-y-8">

            {/* Basic Info */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Teaching Category
              </label>
              <input
                name="categoryName"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200"
                placeholder="e.g. Mathematics"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Hourly Rate (৳)
              </label>
              <input
                type="number"
                name="hourlyRate"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Professional Bio
              </label>
              <textarea
                name="bio"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 h-32"
                placeholder="Describe your experience..."
              />
            </div>

            {/* Availability JSON */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Availability (JSON format)
              </label>
              <textarea
                name="availability"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 h-40"
                placeholder={`{
  "MONDAY": [{ "from": "09:00", "to": "12:00" }]
}`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all"
            >
              Publish Tutor Profile
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
