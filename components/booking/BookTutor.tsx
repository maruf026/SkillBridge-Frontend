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
      "http://localhost:5000/api/bookings",
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
    <div className="mt-6 border p-4 rounded">
      <h3 className="font-semibold mb-2">Book this tutor</h3>

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      <input
        type="datetime-local"
        className="border p-2 w-full mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        onClick={handleBooking}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
