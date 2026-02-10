"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewForm({ tutorId }: { tutorId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return setError("Please select a rating");
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorId, rating, comment }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      router.push("/dashboard/bookings");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {/* Star Rating Logic */}
      <div>
        <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-3">
          Overall Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-3xl transition-transform active:scale-90"
            >
              <span className={`
                ${(hover || rating) >= star ? "text-amber-400" : "text-slate-200"}
                transition-colors
              `}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div>
        <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-3">
          Your Feedback
        </label>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What was your experience with this tutor?"
          className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Post Review"}
      </button>
    </form>
  );
}