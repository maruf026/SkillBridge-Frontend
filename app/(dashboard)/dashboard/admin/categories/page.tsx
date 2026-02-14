"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Using process.env to ensure we hit the live backend domain
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://skill-bridge-liard.vercel.app";

  const loadCategories = async () => {
    try {
      // By passing the full URL, we bypass the automatic '/api/auth' prefixing
      const { data, error } = await authClient.$fetch<any>(`${API_BASE}/api/admin/categories`);
      
      if (error) {
        console.error("Fetch Error:", error);
        return;
      }
      
      setCategories(data?.data || []); 
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
    if (!name.trim()) return;

    toast.promise(
      async () => {
        const { error } = await authClient.$fetch(`${API_BASE}/api/admin/categories`, {
          method: "POST",
          body: { name }, 
        });

        if (error) {
          if (error.status === 401) throw new Error("Please re-login as Admin");
          throw new Error(error.message || "Failed to create");
        }

        setName("");
        await loadCategories();
      },
      {
        loading: "Creating category...",
        success: "Category created!",
        error: (err) => err.message,
      }
    );
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    
    toast.promise(
      async () => {
        const { error } = await authClient.$fetch(`${API_BASE}/api/admin/categories/${id}`, {
          method: "DELETE",
        });

        if (error) throw new Error("Delete failed");
        await loadCategories();
      },
      {
        loading: "Deleting...",
        success: "Deleted!",
        error: "Failed to delete",
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="border-l-4 border-indigo-600 pl-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Categories</h1>
        <p className="text-slate-500 font-bold text-lg mt-1">Manage tutoring subjects</p>
      </div>

      {/* Input Section */}
      <div className="bg-white border-2 border-slate-200 rounded-4xl p-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700"
            placeholder="New category name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button
            onClick={addCategory}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            Create
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white border-2 border-slate-200 rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b-4 border-slate-200">
              <tr>
                <th className="px-10 py-8 text-xl font-black text-slate-900 w-full">Category Name</th>
                <th className="px-10 py-8 text-xl font-black text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-indigo-50/20 transition-all">
                  <td className="px-10 py-7">
                    <span className="text-lg font-bold text-slate-800">{c.name}</span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="text-rose-500 hover:text-rose-700 font-black text-sm uppercase px-4 py-2 rounded-xl hover:bg-rose-50 transition-all"
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
            <p className="text-slate-400 text-lg font-black italic">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}