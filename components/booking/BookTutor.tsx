"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  tutorId: string;
  isLoggedIn: boolean;
  role?: string;
}

export default function BookTutor({
  tutorId,
  isLoggedIn,
  role,
}: Props) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (role !== "STUDENT") {
      setError("Only students can book tutors");
      return;
    }

    if (!date) {
      setError("Please select a date");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tutorId,
          date,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      setError("Failed to create booking");
      return;
    }

    router.push("/dashboard/bookings");
  };

  return (
    <div className="mt-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-zinc-100">Book this tutor</h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Select date & time
          </label>
          <input
            type="datetime-local"
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all scheme-dark"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <p className="text-xs text-zinc-500 italic">
          Please select a date and time that matches the tutor’s availability.
        </p>

        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center
            ${loading 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/20 active:scale-[0.98]"
            }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  );
}