"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = [
  "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
];

export default function CreateTutorProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    bio: "",
    categoryName: "",
    hourlyRate: "",
  });

  const [availability, setAvailability] = useState<
    Record<string, { from: string; to: string }[]>
  >({});

  const [slot, setSlot] = useState({
    day: "MONDAY",
    from: "",
    to: "",
  });

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
    if (!form.bio || !form.categoryName || !form.hourlyRate || Object.keys(availability).length === 0) {
      setError("Please complete all profile details and add at least one availability slot.");
      return;
    }

    setLoading(true);
    const res = await fetch("http://localhost:5000/api/tutors/profile", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio: form.bio,
        categoryName: form.categoryName,
        hourlyRate: Number(form.hourlyRate),
        availability,
      }),
    });
    setLoading(false);

    if (!res.ok) {
      setError("Failed to create profile. Make sure you aren't already registered as a tutor.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Become an Instructor</h1>
          <p className="text-slate-600 font-medium">Set up your professional profile to start reaching students.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          {error && (
            <div className="bg-red-50 border-b border-red-100 p-4 text-red-600 text-sm font-bold flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600">Step 1: Profile Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Teaching Category</label>
                  <input
                    type="text"
                    className="text-slate-900 w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                    placeholder="e.g. Mathematics"
                    value={form.categoryName}
                    onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hourly Rate (৳)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 font-bold">৳</span>
                    <input
                      type="number"
                      className="text-slate-900 w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                      placeholder="500"
                      value={form.hourlyRate}
                      onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Professional Bio</label>
                <textarea
                  className="text-slate-900 w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all h-32"
                  placeholder="Describe your experience, teaching style, and qualifications..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 2: Availability */}
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600">Step 2: Weekly Availability</h2>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-1">
                    <select
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 font-bold text-slate-700 text-sm outline-none"
                      value={slot.day}
                      onChange={(e) => setSlot({ ...slot, day: e.target.value })}
                    >
                      {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <input
                    type="time"
                    className="text-slate-900 px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none"
                    value={slot.from}
                    onChange={(e) => setSlot({ ...slot, from: e.target.value })}
                  />
                  <input
                    type="time"
                    className="text-slate-900 px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none"
                    value={slot.to}
                    onChange={(e) => setSlot({ ...slot, to: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={addSlot}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-all active:scale-95"
                  >
                    Add Slot
                  </button>
                </div>
              </div>

              {/* Displaying Added Slots */}
              <div className="space-y-4">
                {Object.entries(availability).map(([day, slots]) => (
                  slots.length > 0 && (
                    <div key={day} className="flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                      <div className="w-24 shrink-0 pt-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{day}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((s, i) => (
                          <div key={i} className="group flex items-center gap-2 bg-white border border-slate-200 pl-3 pr-1 py-1 rounded-full text-sm font-bold text-slate-700 shadow-sm">
                            {s.from} - {s.to}
                            <button 
                              type="button"
                              onClick={() => removeSlot(day, i)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              ×
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
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 shadow-lg shadow-slate-200 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Publishing Profile..." : "Publish Tutor Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}