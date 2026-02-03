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

  const res = await fetch(
    "http://localhost:5000/api/tutors/profile/me",
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.data;
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
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Edit Tutor Profile
      </h1>

      <EditTutorProfileForm profile={profile} />
    </div>
  );
}
