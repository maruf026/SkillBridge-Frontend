"use client";

import Link from "next/link";
import PublicNavbar from "@/components/layout/PublicNavbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* NAVBAR */}
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        
        {/* --- Background Effects --- */}
        <div className="absolute inset-0 -z-10">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          
          {/* Breathing Gradient Blobs */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* --- LEFT: CONTENT --- */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                #1 Platform for 1-on-1 Learning
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-slate-900 mb-6">
                Master any skill with <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">
                  Expert Tutors
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mb-8">
                SkillBridge connects you with top-tier educators for personalized, flexible learning. Unlock your potential today.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  Get Started Free
                </Link>

                <Link
                  href="/tutors"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  Browse Tutors
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex items-center gap-4 text-sm font-medium text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}>
                       {/* Placeholder avatars */}
                       <div className="w-full h-full bg-linear-to-br from-slate-300 to-slate-400"></div>
                    </div>
                  ))}
                </div>
                <p>Trusted by 2,000+ students</p>
              </div>
            </div>

            {/* --- RIGHT: ILLUSTRATION (Interactive Cards) --- */}
            <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0 perspective-1000">
              
              {/* The "Blob" behind the cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-tr from-indigo-200 to-sky-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />

              <div className="relative w-full max-w-112.5 aspect-square">
                
                {/* Main Central Card (Simulating a Tutor Profile) */}
                <div className="absolute inset-4 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center justify-center p-8 z-20">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 mb-4 shadow-lg flex items-center justify-center text-4xl">
                        🎓
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Mazharul Islam</h3>
                    <p className="text-indigo-600 font-medium">Senior Mathematics Tutor</p>
                    <div className="mt-6 w-full space-y-3">
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-indigo-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-slate-500">
                            <span>Success Rate</span>
                            <span className="text-slate-900">98%</span>
                        </div>
                    </div>
                </div>

                {/* Floating Card 1: Rating (Top Right) */}
                <div className="absolute -top-6 -right-4 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-xl border border-white/50 z-30 animate-bounce [animation-duration:3s]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">⭐</div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Rating</p>
                      <p className="text-lg font-extrabold text-slate-900">4.9/5.0</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2: Price (Bottom Left) */}
                <div className="absolute -bottom-6 -left-4 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-xl border border-white/50 z-30 animate-bounce [animation-duration:4s]">
                  <div className="flex items-center gap-3">
                    {/* <div className="p-2 bg-green-100 rounded-lg text-green-600">💵</div> */}
                    <div>
                      {/* <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Hourly Rate</p> */}
                      <p className="text-lg font-extrabold text-slate-900">Book Now</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 3: Active Students (Right Middle) */}
                {/* <div className="absolute top-1/2 -right-12 translate-y-12 hidden md:block bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-10">
                   <div className="flex items-center gap-2">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="font-bold text-slate-700">Online Now</span>
                   </div>
                </div> */}

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
<section className="py-24 bg-slate-50 relative overflow-hidden">
  {/* Decorative background element */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -mr-32 -mt-32"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        How <span className="text-indigo-600">SkillBridge</span> Works
      </h2>
      <div className="h-1.5 w-20 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
      <p className="mt-6 text-lg text-slate-600 font-medium">
        Our platform is designed to make finding and booking the perfect tutor 
        as seamless as possible. Start your journey in three easy steps.
      </p>
    </div>

    {/* Steps Wrapper */}
    <div className="relative">
      
      {/* Connector Line (Desktop Only) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed border-t-2 border-dashed border-slate-200 -translate-y-12"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        
        {/* Step 1 */}
        <div className="group relative flex flex-col items-center text-center">
          <div className="relative z-10 h-20 w-20 flex items-center justify-center rounded-3xl bg-white shadow-xl text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 ring-4 ring-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center ring-4 ring-white">1</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Find the Right Tutor
          </h3>

          <p className="text-slate-600 leading-relaxed font-medium px-4">
            Browse tutors by subject, availability, and experience to find the perfect match for your learning goals.
          </p>
        </div>

        {/* Step 2 */}
        <div className="group relative flex flex-col items-center text-center">
          <div className="relative z-10 h-20 w-20 flex items-center justify-center rounded-3xl bg-white shadow-xl text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 ring-4 ring-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center ring-4 ring-white">2</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Book a Session
          </h3>

          <p className="text-slate-600 leading-relaxed font-medium px-4">
            Pick a time that works for you. Our automated scheduling handles the rest, ensuring a smooth connection.
          </p>
        </div>

        {/* Step 3 */}
        <div className="group relative flex flex-col items-center text-center">
          <div className="relative z-10 h-20 w-20 flex items-center justify-center rounded-3xl bg-white shadow-xl text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 ring-4 ring-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center ring-4 ring-white">3</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Learn & Grow
          </h3>

          <p className="text-slate-600 leading-relaxed font-medium px-4">
            Engage in personalized 1-on-1 sessions and track your progress with our performance reviews.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>


{/* WHY CHOOSE SKILLBRIDGE */}
<section className="py-24 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="flex flex-col items-center text-center mb-20">
      <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide uppercase mb-4">
        The SkillBridge Advantage
      </span>
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        Built for Excellence
      </h2>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
        We provide the tools and security needed to ensure every learning 
        experience is high-quality, safe, and productive.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      
      {/* Feature 1: Qualified Tutors */}
      <div className="group flex flex-col sm:flex-row gap-6 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300">
        <div className="shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04 Pel6.162 14.487a11.956 11.956 0 002.108 5.492L12 21l3.51-4.579a11.952 11.952 0 002.108-5.492l.001-6.938z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
            Verified Expertise
          </h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Every tutor undergoes a profile verification process. Review their subjects, 
            past experience, and certifications before you ever book a session.
          </p>
        </div>
      </div>

      {/* Feature 2: Secure Access */}
      <div className="group flex flex-col sm:flex-row gap-6 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300">
        <div className="shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-100 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
            Role-Based Security
          </h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Dedicated dashboards for Students, Tutors, and Admins. Your data is protected 
            with industry-standard encryption and controlled access levels.
          </p>
        </div>
      </div>

      {/* Feature 3: Transparent Booking */}
      <div className="group flex flex-col sm:flex-row gap-6 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300">
        <div className="shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
            Smart Booking
          </h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Real-time session tracking. Request a slot, get instant tutor notifications, 
            and manage your entire learning calendar from one place.
          </p>
        </div>
      </div>

      {/* Feature 4: Ratings & Reviews */}
      <div className="group flex flex-col sm:flex-row gap-6 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300">
        <div className="shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
            Review-Driven Quality
          </h3>
          <p className="text-slate-600 font-medium leading-relaxed">
            Our community-led rating system ensures transparency. Students provide 
            honest feedback to keep the standard of teaching world-class.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


{/* FINAL CTA */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative isolate overflow-hidden bg-indigo-600 px-6 py-24 shadow-2xl rounded-3xl sm:px-24">
      
      {/* Decorative Background Patterns */}
      <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-20">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx="512" cy="512" r="512" fill="url(#gradient-id)" fillOpacity="1" />
          <defs>
            <radialGradient id="gradient-id">
              <stop stopColor="#7775D6" />
              <stop offset="1" stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          Ready to Start <br className="sm:hidden" />
          <span className="text-indigo-200">Learning Smarter?</span>
        </h2>
        
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100 font-medium">
          Join thousands of students on SkillBridge. Whether you're mastering 
          calculus or picking up a new language, the right tutor is waiting.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/register"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg shadow-xl hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Create Free Account
          </Link>
          
          <Link
            href="/tutors"
            className="group flex items-center gap-2 text-white font-bold text-lg"
          >
            Explore our Tutors
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Trust Note */}
        <p className="mt-8 text-sm text-indigo-200/80 font-medium">
          No credit card required to browse • 24/7 Support
        </p>
      </div>
    </div>
  </div>
</section>


{/* FOOTER */}
<footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
      
      {/* Brand Column */}
      <div className="col-span-2 lg:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">SkillBridge</span>
        </div>
        <p className="text-slate-500 max-w-xs leading-relaxed mb-6">
          Connecting ambitious students with world-class tutors to unlock 
          potential through personalized 1-on-1 learning.
        </p>
        <div className="flex gap-4">
          {/* Simple Social Icons */}
          {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
            <a key={social} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
              <span className="sr-only">{social}</span>
              <div className="w-5 h-5 bg-current rounded-sm opacity-20" /> 
            </a>
          ))}
        </div>
      </div>

      {/* Navigation Groups */}
      <div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Platform</h4>
        <ul className="space-y-4">
          <li><a href="/tutors" className="text-slate-600 hover:text-indigo-600 transition">Browse Tutors</a></li>
          <li><a href="/how-it-works" className="text-slate-600 hover:text-indigo-600 transition">How it Works</a></li>
          <li><a href="/pricing" className="text-slate-600 hover:text-indigo-600 transition">Pricing</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Support</h4>
        <ul className="space-y-4">
          <li><a href="/help" className="text-slate-600 hover:text-indigo-600 transition">Help Center</a></li>
          <li><a href="/safety" className="text-slate-600 hover:text-indigo-600 transition">Safety Policy</a></li>
          <li><a href="/contact" className="text-slate-600 hover:text-indigo-600 transition">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Legal</h4>
        <ul className="space-y-4">
          <li><a href="/privacy" className="text-slate-600 hover:text-indigo-600 transition">Privacy</a></li>
          <li><a href="/terms" className="text-slate-600 hover:text-indigo-600 transition">Terms</a></li>
        </ul>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-slate-500 font-medium">
        © {new Date().getFullYear()} SkillBridge Inc. All rights reserved.
      </p>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Systems Operational</span>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}