import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

async function getTutorProfile() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors/profile/me`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function MyProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "ADMIN") redirect("/dashboard");

  // Fetch tutor profile at the top level (Server Side)
  let profile = null;
  if (user.role === "TUTOR") {
    profile = await getTutorProfile();
    if (!profile) redirect("/dashboard/tutor/profile/create");
  }

  const cardStyles = "bg-white border border-slate-200 rounded-3xl p-6 shadow-sm";
  const labelStyles = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block";
  const valueStyles = "text-slate-900 font-bold text-lg";

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-8">
      {/* --- PROFILE HERO --- */}
      <section className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-200/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-black shadow-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black tracking-tight">{user.name}</h1>
                {profile?.isVerified && (
                  <span className="bg-indigo-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified</span>
                )}
              </div>
              <p className="text-indigo-200/70 font-medium text-lg">{user.email}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link 
              href={user.role === "TUTOR" ? "/dashboard/tutor/profile" : "/dashboard/profile/edit"} 
              className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-black/20"
            >
              Edit Details
            </Link>
          </div>
        </div>
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]" />
      </section>

      {/* --- INFO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user.role === "STUDENT" ? (
          <>
            <div className={cardStyles}>
              <span className={labelStyles}>Account Status</span>
              <p className={valueStyles}>Active Student</p>
            </div>
            <div className={cardStyles}>
              <span className={labelStyles}>Current Bookings</span>
              <p className={valueStyles}>View Schedule →</p>
            </div>
            <div className={cardStyles}>
              <span className={labelStyles}>Support</span>
              <p className={valueStyles}>Help Center</p>
            </div>
          </>
        ) : (
          <>
            <div className={cardStyles}>
              <span className={labelStyles}>Teaching Category</span>
              <p className={valueStyles}>{profile?.category?.name || "General"}</p>
            </div>
            <div className={cardStyles}>
              <span className={labelStyles}>Hourly Rate</span>
              <p className={valueStyles}>৳{profile?.hourlyRate}</p>
            </div>
            <div className={cardStyles}>
              <span className={labelStyles}>Profile Status</span>
              <p className={profile?.isVerified ? "text-emerald-600 font-bold" : "text-amber-500 font-bold"}>
                {profile?.isVerified ? "Approved" : "Under Review"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* --- BIO SECTION --- */}
      {user.role === "TUTOR" && profile?.bio && (
        <div className={`${cardStyles} border-l-4 border-l-indigo-500`}>
           <span className={labelStyles}>Professional Bio</span>
           <p className="text-slate-600 leading-relaxed font-medium mt-2 italic">
             "{profile.bio}"
           </p>
        </div>
      )}
    </div>
  );
}