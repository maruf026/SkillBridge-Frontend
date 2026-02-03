import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <DashboardSidebar user={user} />

      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
