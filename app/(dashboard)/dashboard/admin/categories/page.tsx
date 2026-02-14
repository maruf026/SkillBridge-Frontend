"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client"; // Import this

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Using the client hook to get user info easily
  const { data: session } = authClient.useSession();

  const loadCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`, { 
        credentials: "include" 
      });
      const json = await res.json();
      setCategories(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async () => {
    if (!name) return;


    toast.promise(
      async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        if (!res.ok) throw new Error();
        setName("");
        loadCategories();
      },
      {
        loading: "Adding...",
        success: "Category added!",
        error: "Failed to add",
      }
    );
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    
    toast.promise(
      async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        loadCategories();
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
      {/* Header */}
      <div className="border-l-4 border-indigo-600 pl-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Categories</h1>
        <p className="text-slate-500 font-bold">Manage your app subjects</p>
      </div>

      {/* Input Section */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-lg">
        <div className="flex gap-4">
          <input
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold"
            placeholder="New category name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={addCategory}
            className="bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all"
          >
            Create
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-2 border-slate-200 rounded-4xl overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b-2">
            <tr>
              <th className="px-10 py-6 font-black text-slate-900">Name</th>
              <th className="px-10 py-6 font-black text-slate-900 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-10 py-6 font-bold text-slate-700">{c.name}</td>
                <td className="px-10 py-6 text-right">
                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="text-rose-500 font-black hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}