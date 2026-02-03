import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">
        Page not found
      </h2>

      <Link
        href="/dashboard"
        className="text-blue-500 underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
