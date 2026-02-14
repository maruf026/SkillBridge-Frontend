"use client";

import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
        { credentials: "include" }
      );
      const json = await res.json();
      setCategories(json.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async () => {
    if (!name) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
        {
          method: "POST",
          credentials: "include",
          headers: { 
            "Content-Type": "application/json",
            // This is often required by Better-Auth to verify the request is intentional
            "beta-auth": "true" 
          },
          body: JSON.stringify({ name }),
        }
      );

      if (res.status === 401) {
        alert("Session expired or Not an Admin. Please re-login.");
        return;
      }

      setName("");
      loadCategories();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    loadCategories();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Page Header */}
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

      {/* Quick Add Section */}
      <div className="bg-white border-2 border-slate-200 rounded-4xl p-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-400"
            placeholder="Type new category name (e.g. Mathematics, Music...)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={addCategory}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            Create Category
          </button>
        </div>
      </div>

      {/* Categories Table */}
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
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-indigo-50/20 transition-all group">
                  <td className="px-10 py-7">
                    <span className="text-lg font-bold text-slate-800 tracking-tight">
                      {c.name}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="text-rose-500 hover:text-rose-700 font-black text-sm uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-rose-50 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && categories.length === 0 && (
          <div className="py-20 text-center bg-slate-50/50">
            <p className="text-slate-400 text-lg font-black italic">No categories created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}