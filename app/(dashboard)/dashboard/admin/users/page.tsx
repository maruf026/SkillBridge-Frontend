import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { BanButton } from "@/components/layout/BanButton";

async function getUsers() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  const json = await res.json();
  return json.data;
}

async function toggleBan(userId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/ban`, {
    method: "PATCH",
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

 
  revalidatePath("/dashboard/admin/users");
}

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const users = await getUsers();

  // Hide other admins
  const filteredUsers = users.filter(
    (u: any) => u.role === "STUDENT" || u.role === "TUTOR"
  );

  async function handleToggle(id: string) {
    "use server";
    await toggleBan(id);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-indigo-600 pl-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            User Management
          </h1>
          <p className="text-slate-500 font-bold text-lg mt-1">
            Manage permissions and access for all members
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border-2 border-slate-200 rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
           
            <thead className="bg-slate-50 border-b-4 border-slate-200">
              <tr>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter">
                  User Details
                </th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter text-center">
                  Role
                </th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter text-center">
                  Status
                </th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y-2 divide-slate-100">
              {filteredUsers.map((u: any) => (
                <tr key={u.id} className="hover:bg-indigo-50/20 transition-all group">
                  <td className="px-10 py-7">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-800 leading-tight">
                        {u.name}
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        {u.email}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-10 py-7 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border-2 ${
                      u.role === 'TUTOR' 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="px-10 py-7 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${u.isBanned ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className={`text-sm font-black uppercase tracking-tight ${u.isBanned ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {u.isBanned ? "Banned" : "Active"}
                      </span>
                    </div>
                  </td>

                  <td className="px-10 py-7 text-right">
                    <BanButton 
                userId={u.id} 
                isBanned={u.isBanned} 
                userName={u.name}
                onToggle={handleToggle} 
              />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-32 text-center bg-slate-50/50">
            <p className="text-slate-400 text-xl font-black italic">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}