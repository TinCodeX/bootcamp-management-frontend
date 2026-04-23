import React from 'react';
import { Link } from 'react-router-dom';


const MyBootcampsPage = () => {
  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      {/* SideNavBar Anchor */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container-low py-6 flex flex-col shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.05)]">

        <div className="px-6 mb-12">
          <h1 className="text-2xl font-black font-headline text-primary tracking-tighter uppercase">CSEC ASTU</h1>
          <p className="text-[10px] font-headline font-bold tracking-[0.2em] uppercase opacity-40 mt-1">Bootcamp Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {/* Dashboard Inactive */}
          <Link className="flex items-center gap-3 text-on-surface/60 hover:text-primary hover:bg-surface-container-lowest/50 my-1 p-3 transition-colors duration-200 rounded-xl" to="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-headline tracking-tight">Dashboard</span>
          </Link>
          {/* Active: My Bootcamp */}
          <Link className="flex items-center gap-3 text-primary font-bold bg-surface-container-lowest rounded-xl my-1 p-3 transition-all scale-98 active:scale-95" to="/my-bootcamps">
            <span className="material-symbols-outlined">school</span>
            <span className="font-headline tracking-tight">My Bootcamp</span>
          </Link>
        </nav>
        <div className="mt-auto px-4">
          <Link className="flex items-center gap-3 text-on-surface/60 hover:text-error hover:bg-error-container/10 my-1 p-3 transition-colors duration-200 rounded-xl" to="/">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-headline tracking-tight">Logout</span>
          </Link>
        </div>


      </aside>

      <div className="flex-1 ml-64 flex flex-col min-h-screen overflow-hidden">
        {/* TopNavBar Anchor */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-30 bg-surface/80 backdrop-blur-md flex justify-between items-center px-8 gap-4 shadow-sm">
          <div className="md:hidden">
            <span className="text-2xl font-black font-headline text-primary tracking-tighter uppercase">CSEC ASTU</span>
          </div>
          <div className="hidden md:block">
            <h2 className="text-lg font-bold font-headline text-primary opacity-0 pointer-events-none">CSEC ASTU</h2>
          </div>


          <div className="flex items-center gap-6">
            <button className="relative p-2 text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 duration-200">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex items-center justify-center border-2 border-primary-container/20">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_kEKOW9pPVn18iBJgXZ4ZeCC9jem1M4QW_QdDJat1fR7zeBdgZ63RSFgkg0kjMKjq7adehYxPriFmUZ0PaFTRMB7yXdDW0KKG_-_tEoBDUS9aF7h6Bnn1htCbT7hCrcSwlcCqeZqFWJlQFIYn51gbxj0ou9FgDjKJU7wg-wd48QPMcyLPS0-fDrIMWQJ9C1DVxnIxdb0gSqZRVH0mODodtADqqSAZuPY3AcGP4zBFHJMALKho4fSozBNyMDIcvZaJkiDAZH7a-Hw"
              />
            </div>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="flex-1 pt-20 p-8 md:p-12 max-w-7xl mx-auto w-full">

          {/* Hero Title */}
          <div className="mb-12 mt-12">
            <h3 className="font-headline font-bold text-on-surface tracking-tight text-4xl md:text-5xl mb-4">My Bootcamps</h3>

            <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              View and manage your active learning tracks and instructional responsibilities for the current academic session.
            </p>
          </div>

          {/* Bento Grid of Bootcamp Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
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
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-error hover:bg-error-container transition-all">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
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
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-secondary-container transition-all">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
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
      </div>

      {/* BottomNavBar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface px-8 py-3 flex justify-around items-center z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        <Link className="flex flex-col items-center gap-1 text-primary" to="/dashboard">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Dash</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface opacity-50" to="/my-bootcamps">
          <span className="material-symbols-outlined">school</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">My Portal</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-on-surface opacity-50" to="/">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Exit</span>
        </Link>
      </nav>

    </div>
  );
};

export default MyBootcampsPage;
