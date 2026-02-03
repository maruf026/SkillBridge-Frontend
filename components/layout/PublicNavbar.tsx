"use client";

import Link from "next/link";
import { useState } from "react";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    /* Fixes:
      1. Removed complex 'supports-' syntax. Used standard 'bg-white/90' & 'backdrop-blur-md'.
      2. Increased opacity (90%) so text is always readable against any background.
    */
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo - Darker text (Slate-900) and extra bold for focus */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SkillBridge
        </Link>

        {/* Desktop Nav - Switched to Slate-900 (High Contrast) and SemiBold */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-slate-900">
          <Link 
            href="/tutors" 
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Browse Tutors
          </Link>

          <Link 
            href="/login" 
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Button - Darker color for visibility */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - High contrast text */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-xl absolute w-full left-0">
          <nav className="flex flex-col p-4 space-y-3 font-semibold text-slate-900">
            <Link 
              href="/tutors" 
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              Browse Tutors
            </Link>

            <Link 
              href="/login" 
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-3 mt-4 rounded-lg bg-indigo-600 text-white font-bold shadow-md active:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}