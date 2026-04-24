import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const MyBootcampsPage = () => {
  return (
    <StudentLayout>
      <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
        {/* Hero Title */}
        <div className="mb-12 mt-4">
          <h3 className="font-headline font-bold text-on-surface tracking-tight text-4xl md:text-5xl mb-4 leading-tight">My Bootcamps</h3>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            View and manage your active learning tracks and instructional responsibilities for the current academic session.
          </p>
        </div>

        {/* Bento Grid of Bootcamp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Fullstack Development */}
          <div className="group bg-surface-container-low rounded-xl p-1 transition-all hover:translate-y-[-4px]">
            <div className="bg-surface-container-lowest rounded-lg p-8 h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              <div>
                <span className="font-label text-[0.65rem] font-bold tracking-[0.15em] uppercase text-secondary mb-4 block">Engineering</span>
                <h4 className="font-headline font-bold text-2xl text-on-surface leading-tight mb-2">Fullstack Development</h4>
                <p className="font-body text-sm text-on-surface-variant/80 mb-8 line-clamp-2">Mastering modern web architectures from database schemas to reactive interfaces.</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="px-4 py-2 bg-primary text-on-primary font-body font-semibold text-xs rounded-full shadow-sm">Student</span>
                <Link
                  className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-all"
                  to="/sessions"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Cyber Security */}
          <div className="group bg-surface-container-low rounded-xl p-1 transition-all hover:translate-y-[-4px]">
            <div className="bg-surface-container-lowest rounded-lg p-8 h-full flex flex-col justify-between relative overflow-hidden border-l-4 border-error">
              <div>
                <span className="font-label text-[0.65rem] font-bold tracking-[0.15em] uppercase text-error mb-4 block">Defense & Analysis</span>
                <h4 className="font-headline font-bold text-2xl text-on-surface leading-tight mb-2">Cyber Security Advanced</h4>
                <p className="font-body text-sm text-on-surface-variant/80 mb-8 line-clamp-2">Leading the offensive security research and defensive strategy modules.</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="px-4 py-2 bg-error-container text-on-error-container font-body font-semibold text-xs rounded-full shadow-sm">Lead Instructor</span>
                <Link
                  className="w-10 h-10 rounded-full flex items-center justify-center text-error hover:bg-error-container transition-all"
                  to="/sessions"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: UI/UX Design */}
          <div className="group bg-surface-container-low rounded-xl p-1 transition-all hover:translate-y-[-4px]">
            <div className="bg-surface-container-lowest rounded-lg p-8 h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>
              <div>
                <span className="font-label text-[0.65rem] font-bold tracking-[0.15em] uppercase text-secondary mb-4 block">Product Design</span>
                <h4 className="font-headline font-bold text-2xl text-on-surface leading-tight mb-2">UI/UX Design Systems</h4>
                <p className="font-body text-sm text-on-surface-variant/80 mb-8 line-clamp-2">Assisting in the development of the Precision Scholar design system components.</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="px-4 py-2 bg-secondary-container text-on-secondary-container font-body font-semibold text-xs rounded-full shadow-sm">Helper</span>
                <Link
                  className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-secondary-container transition-all"
                  to="/sessions"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <footer className="mt-24 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-on-secondary-container rounded-full animate-pulse"></span>
            <p className="font-label text-xs tracking-wide text-on-surface-variant uppercase">Current Status: Academic Session Active</p>
          </div>
          <div className="flex gap-8">
            <a className="font-label text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity" href="#">Academy Policy</a>
            <a className="font-label text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity" href="#">Technical Support</a>
          </div>
        </footer>
      </main>
    </StudentLayout>
  );
};

export default MyBootcampsPage;
