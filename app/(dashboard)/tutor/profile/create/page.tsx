"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTutorProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    bio: "",
    categoryName: "",
    hourlyRate: "",
    availability: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.bio || !form.categoryName || !form.hourlyRate) {
      setError("All fields are required");
      return;
    }

    let availabilityData;

    try {
      availabilityData = form.availability
        ? JSON.parse(form.availability)
        : {};
    } catch {
      setError("Availability must be valid JSON");
      return;
    }

    setLoading(true);

    const res = await fetch(
      "http://localhost:5000/api/tutors/profile",
      {
        method: "POST",
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
      setError("Failed to create tutor profile");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        Create Tutor Profile
      </h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

     <form onSubmit={handleSubmit} className="space-y-4">
  <textarea
    placeholder="Short bio about yourself"
    className="w-full border p-2 h-28"
    value={form.bio}
    onChange={(e) =>
      setForm({ ...form, bio: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Category (e.g. Math, Physics)"
    className="w-full border p-2"
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
    placeholder="Hourly Rate (BDT)"
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
    placeholder={`Availability (JSON format)
Example:
{
  "MONDAY": [
    { "from": "10:00", "to": "12:00" }
  ]
}`}
    className="w-full border p-2 h-40 text-sm"
    value={form.availability}
    onChange={(e) =>
      setForm({
        ...form,
        availability: e.target.value,
      })
    }
  />

  <button className="bg-black text-white px-4 py-2 rounded">
    Create Profile
  </button>
</form>

    </div>
  );
}
