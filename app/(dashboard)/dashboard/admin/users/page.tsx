import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

async function getUsers() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    "http://localhost:5000/api/admin/users",
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch users");

  const json = await res.json();
  return json.data;
}

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const users = await getUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-zinc-900">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u: any) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                {u.isBanned ? "Banned" : "Active"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
