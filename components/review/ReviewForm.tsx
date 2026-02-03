"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewForm({
  tutorId,
}: {
  tutorId: string;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!comment) return;

    setLoading(true);

    const res = await fetch(
      "http://localhost:5000/api/reviews",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tutorId,
          rating,
          comment,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to submit review");
      return;
    }

    router.refresh(); // reload reviews
  };

  return (
    <div className="border p-4 rounded mt-6">
      <h3 className="font-semibold mb-2">
        Leave a Review
      </h3>

      <select
        className="border p-2 mb-2"
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write your review..."
        className="w-full border p-2 mb-2"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
