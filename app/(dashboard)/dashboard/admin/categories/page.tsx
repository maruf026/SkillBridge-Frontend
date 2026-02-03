"use client";

import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadCategories = async () => {
    const res = await fetch(
      "http://localhost:5000/api/admin/categories",
      { credentials: "include" }
    );
    const json = await res.json();
    setCategories(json.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async () => {
    if (!name) return;

    await fetch(
      "http://localhost:5000/api/admin/categories",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );

    setName("");
    loadCategories();
  };

  const deleteCategory = async (id: string) => {
    await fetch(
      `http://localhost:5000/api/admin/categories/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    loadCategories();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Manage Categories
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2"
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-black text-white px-4"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex justify-between border p-2"
          >
            {c.name}
            <button
              onClick={() => deleteCategory(c.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
