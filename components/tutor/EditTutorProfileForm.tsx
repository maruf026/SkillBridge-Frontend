"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

export default function EditTutorProfileForm({ profile }: { profile: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    bio: profile.bio || "",
    categoryName: profile.category?.name || "",
    hourlyRate: profile.hourlyRate || "",
  });

  // Convert incoming profile availability into our state format
  const [availability, setAvailability] = useState<Record<string, { from: string; to: string }[]>>(
    profile.availability || {}
  );

  const [slot, setSlot] = useState({ day: "MONDAY", from: "", to: "" });

  const addSlot = () => {
    if (!slot.from || !slot.to) return;
    setAvailability((prev) => ({
      ...prev,
      [slot.day]: [...(prev[slot.day] || []), { from: slot.from, to: slot.to }],
    }));
    setSlot({ ...slot, from: "", to: "" });
  };

  const removeSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/tutors/profile", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio: form.bio,
        categoryName: form.categoryName,
        hourlyRate: Number(form.hourlyRate),
        availability, // Sending the object directly, no manual JSON string editing!
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to update profile. Please check your connection.");
      return;
    }

    router.refresh();
    // Optional: Add a success toast or redirect
  };

  const inputClasses = "w-full border border-slate-200 bg-white text-slate-900 p-3 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl">
            {error}
          </div>
        )}

        {/* Basic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Subject Category</label>
            <input
              className={inputClasses}
              placeholder="Category (e.g. Math)"
              value={form.categoryName}
              onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Hourly Rate (৳)</label>
            <input
              type="number"
              className={inputClasses}
              value={form.hourlyRate}
              onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Bio</label>
          <textarea
            className={`${inputClasses} h-32 resize-none`}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        <hr className="border-slate-100" />

        {/* Availability Builder */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-600">Update Availability</h3>
          
          <div className="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <select
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm font-bold outline-none"
              value={slot.day}
              onChange={(e) => setSlot({ ...slot, day: e.target.value })}
            >
              {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <input
              type="time"
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm outline-none"
              value={slot.from}
              onChange={(e) => setSlot({ ...slot, from: e.target.value })}
            />
            <input
              type="time"
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm outline-none"
              value={slot.to}
              onChange={(e) => setSlot({ ...slot, to: e.target.value })}
            />
            <button
              type="button"
              onClick={addSlot}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              Add
            </button>
          </div>

          <div className="space-y-3">
            {Object.entries(availability).map(([day, slots]) => (
              slots.length > 0 && (
                <div key={day} className="flex items-start gap-4">
                  <span className="w-20 text-[10px] font-black text-slate-400 uppercase pt-2">{day}</span>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                        {s.from} - {s.to}
                        <button 
                          type="button"
                          onClick={() => removeSlot(day, i)}
                          className="text-slate-400 hover:text-red-500 text-lg leading-none"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
        >
          {loading ? "Saving Changes..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}