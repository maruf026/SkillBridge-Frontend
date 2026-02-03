"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function TutorsClient({ tutors }: { tutors: any[] }) {
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(0);

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const rating =
  typeof tutor.avgRating === "number"
    ? tutor.avgRating
    : 0;

      return tutor.hourlyRate <= maxPrice && rating >= minRating;
    });
  }, [tutors, maxPrice, minRating]);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* SIDEBAR FILTERS */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="sticky top-24 space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">Filters</h3>
            
            {/* Price Filter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Budget</label>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  ৳{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>৳100</span>
                <span>৳2k</span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Rating Filter */}
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-4">Minimum Rating</label>
            <div className="space-y-2">
              {[0, 3, 4, 4.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    minRating === rate 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {rate === 0 ? "All Ratings" : `${rate}★ & up`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Available Tutors
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Showing {filteredTutors.length} experts match your criteria
            </p>
          </div>
        </div>

        {filteredTutors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-slate-500 font-medium">No tutors found within this range.</p>
            <button 
              onClick={() => { setMaxPrice(2000); setMinRating(0); }}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TutorCard({ tutor }: { tutor: any }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl p-2 pb-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      <div className="p-4">
        {/* Header: Name and Category */}
        <div className="flex justify-between items-start mb-4">
          <div className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
            👤
          </div>
          <div className="flex flex-col items-end">
             <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                ৳{tutor.hourlyRate}/hr
             </span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {tutor.name}
          </h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-tight mb-4">
            {tutor.category?.name || "General Tutor"}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
            <span className="text-amber-500 text-sm">★</span>
            <div className="text-sm text-amber-500">
  ⭐{" "}
  {typeof tutor.avgRating === "number"
    ? tutor.avgRating.toFixed(1)
    : "New"}
  {tutor.totalReviews
    ? ` (${tutor.totalReviews})`
    : ""}
</div>

          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
            <span className="text-indigo-500 text-sm">📅</span>
            <span className="text-sm font-bold text-slate-700">Flexible</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/tutors/${tutor.id}`}
          className="block w-full text-center py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-all active:scale-[0.98]"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}