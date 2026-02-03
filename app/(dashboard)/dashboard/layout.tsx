import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
