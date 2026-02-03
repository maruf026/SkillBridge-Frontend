"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTutorProfileForm({
  profile,
}: {
  profile: any;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    bio: profile.bio,
    categoryName: profile.category?.name || "",
    hourlyRate: profile.hourlyRate,
    availability: JSON.stringify(profile.availability, null, 2),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let availabilityData;
    try {
      availabilityData = JSON.parse(form.availability);
    } catch {
      setError("Invalid availability JSON");
      setLoading(false);
      return;
    }

    const res = await fetch(
      "http://localhost:5000/api/tutors/profile",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: form.bio,
          categoryName: form.categoryName,
          hourlyRate: Number(form.hourlyRate),
          availability: availabilityData,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      setError("Failed to update profile");
      return;
    }

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      <textarea
        className="w-full border p-2 h-28"
        value={form.bio}
        onChange={(e) =>
          setForm({ ...form, bio: e.target.value })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Category (e.g. Math)"
        value={form.categoryName}
        onChange={(e) =>
          setForm({
            ...form,
            categoryName: e.target.value,
          })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        value={form.hourlyRate}
        onChange={(e) =>
          setForm({
            ...form,
            hourlyRate: e.target.value,
          })
        }
      />

      <textarea
        className="w-full border p-2 h-40 text-sm"
        value={form.availability}
        onChange={(e) =>
          setForm({
            ...form,
            availability: e.target.value,
          })
        }
      />

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
