import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import EditTutorProfileForm from "@/components/tutor/EditTutorProfileForm";

async function getTutorProfile() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tutors/profile/me`,
      {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default async function TutorProfilePage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "TUTOR") redirect("/dashboard");

  const profile = await getTutorProfile();

  if (!profile) {
    redirect("/dashboard/tutor/profile/create");
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Profile Settings
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Update your teaching details and availability for students.
        </p>
      </div>

      {/* If the error persists, check if EditTutorProfileForm 
         is exported as 'default' in its file. 
      */}
      <EditTutorProfileForm profile={profile} />
    </div>
  );
}