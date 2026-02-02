import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";


import { hasTutorProfile } from "@/lib/tutor";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // STUDENT
  if (user.role === "STUDENT") {
    return (
      <div>
        <h1 className="text-xl font-bold">
          Student Dashboard
        </h1>
      </div>
    );
  }

  // TUTOR
  if (user.role === "TUTOR") {
    const profileExists = await hasTutorProfile();

    if (!profileExists) {
      redirect("/dashboard/tutor/profile/create");
    }

    return (
      <div>
        <h1 className="text-xl font-bold">
          Tutor Dashboard
        </h1>
      </div>
    );
  }

  // ADMIN
  if (user.role === "ADMIN") {
    redirect("/dashboard/admin");
  }

  return null;
}
