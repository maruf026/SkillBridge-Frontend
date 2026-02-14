import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

async function getCategories() {
  const incomingHeaders = await headers();
  const cookie = incomingHeaders.get("cookie") || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
    {
      headers: { cookie },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const json = await res.json();
  return json.data || [];
}

export default async function AdminCategoriesPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const categories = await getCategories();

  async function createCategory(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    if (!name) return;

    const incomingHeaders = await headers();
    const cookie = incomingHeaders.get("cookie") || "";

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie,
        },
        body: JSON.stringify({ name }),
      }
    );

    revalidatePath("/dashboard/admin/categories");
  }

  async function deleteCategory(id: string) {
    "use server";

    const incomingHeaders = await headers();
    const cookie = incomingHeaders.get("cookie") || "";

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`,
      {
        method: "DELETE",
        headers: { cookie },
      }
    );

    revalidatePath("/dashboard/admin/categories");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-indigo-600 pl-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Categories
          </h1>
          <p className="text-slate-500 font-bold text-lg mt-1">
            Organize subjects and tutoring expertise
          </p>
        </div>
      </div>

      {/* CREATE FORM */}
      <form action={createCategory} className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            name="name"
            required
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-400"
            placeholder="Type new category name (e.g. Mathematics, Music...)"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            Create Category
          </button>
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white border-2 border-slate-200 rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b-4 border-slate-200">
              <tr>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter w-full">
                  Category Name
                </th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 tracking-tighter text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y-2 divide-slate-100">
              {categories.map((c: any) => (
                <tr key={c.id} className="hover:bg-indigo-50/20 transition-all group">
                  <td className="px-10 py-7">
                    <span className="text-lg font-bold text-slate-800 tracking-tight">
                      {c.name}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <form action={deleteCategory.bind(null, c.id)}>
                      <button
                        type="submit"
                        className="text-rose-500 hover:text-rose-700 font-black text-sm uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-rose-50 transition-all"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && (
          <div className="py-20 text-center bg-slate-50/50">
            <p className="text-slate-400 text-lg font-black italic">
              No categories created yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
