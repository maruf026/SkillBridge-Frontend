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
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Sidebar - responsive behavior handled internally */}
      <DashboardSidebar user={user} />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}