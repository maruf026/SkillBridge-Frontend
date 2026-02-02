"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingActions({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (status !== "PENDING") {
    return <span>-</span>;
  }

  const updateStatus = async (newStatus: "ACCEPTED" | "REJECTED") => {
    setLoading(true);

    await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    setLoading(false);
    router.refresh(); // refresh server component
  };

  return (
    <div className="flex gap-2">
      <button
        disabled={loading}
        onClick={() => updateStatus("ACCEPTED")}
        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
      >
        Accept
      </button>

      <button
        disabled={loading}
        onClick={() => updateStatus("REJECTED")}
        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
      >
        Reject
      </button>
    </div>
  );
}
