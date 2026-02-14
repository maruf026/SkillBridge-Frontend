import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import AvailabilityBuilder from "@/components/tutor/AvailabilityBuilder";


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

    if (!bio || !categoryName || !hourlyRate || !availabilityRaw) {
      throw new Error("All fields are required");
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
          availability: JSON.parse(availabilityRaw),
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
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border shadow-xl p-10">
        <h1 className="text-3xl font-extrabold mb-8">
          Create Tutor Profile
        </h1>

        <form action={createTutorProfile} className="space-y-8">

          <div>
            <label className="block font-bold mb-2">Category</label>
            <input
              name="categoryName"
              required
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Mathematics"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Hourly Rate (৳)</label>
            <input
              type="number"
              name="hourlyRate"
              required
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Bio</label>
            <textarea
              name="bio"
              required
              className="w-full px-4 py-3 border rounded-xl h-32"
            />
          </div>

          {/* Interactive Availability */}
          <AvailabilityBuilder />

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600"
          >
            Publish Profile
          </button>

        </form>
      </div>
    </div>
  );
}
