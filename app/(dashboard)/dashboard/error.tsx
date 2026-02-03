"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">
        Dashboard Error
      </h2>

      <p className="text-gray-500 mb-4">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Retry
      </button>
    </div>
  );
}
