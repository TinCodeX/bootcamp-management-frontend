import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudentLayout = ({ children, activeTab }) => {
  const location = useLocation();
  const isBootcampContext = [
    '/student/sessions',
    '/student/assignments',
    '/student/resources',
    '/student/attendance',
    '/student/feedback'
  ].some(path => location.pathname.startsWith(path));

  return (
    <div className="bg-surface text-on-surface flex min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* SideNavBar */}
      <aside className="h-screen w-64 left-0 top-0 sticky bg-surface-container-low flex flex-col py-8 pl-4 gap-8 z-50 border-r border-outline-variant/10">
        <div className="mb-8 px-6">
          <h1 className="font-headline text-lg font-black text-primary uppercase">CSEC ASTU</h1>
          <p className="font-label text-[10px] font-medium uppercase tracking-widest text-on-surface-variant mt-1 opacity-60">bootcamp portal</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-4">
          <Link
            className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${location.pathname === '/student/dashboard'
              ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
              : 'text-on-surface/70 hover:translate-x-1 hover:text-primary hover:bg-surface-container-high/50'
              } font-label text-sm font-medium uppercase tracking-wider`}
            to="/student/dashboard"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/student/dashboard' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
            <span>Dashboard</span>
          </Link>

          <div className="space-y-1">
            <Link
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${location.pathname === '/student/my-bootcamps'
                ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                : isBootcampContext
                  ? 'text-primary font-bold'
                  : 'text-on-surface/60 hover:translate-x-1 hover:text-primary hover:bg-surface-container-high/50'
                } font-label text-sm font-medium uppercase tracking-wider`}
              to="/student/my-bootcamps"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: (location.pathname === '/student/my-bootcamps' || isBootcampContext) ? "'FILL' 1" : "'FILL' 0" }}>school</span>
              <span>My Bootcamp</span>
            </Link>

            {isBootcampContext && (
              <div className="pl-6 space-y-1 border-l-2 border-surface-container-high ml-6 mt-1">
                <Link
                  className={`flex items-center space-x-3 px-6 py-2 rounded-xl transition-all duration-300 ${location.pathname.startsWith('/student/sessions')
                    ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                    : 'text-on-surface/70 hover:translate-x-1 hover:text-primary'
                    } font-label text-xs font-medium uppercase tracking-wider`}
                  to="/student/sessions"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: location.pathname.startsWith('/student/sessions') ? "'FILL' 1" : "'FILL' 0" }}>calendar_today</span>
                  <span>Sessions</span>
                </Link>
                <Link
                  className={`flex items-center space-x-3 px-6 py-2 rounded-xl transition-all duration-300 ${location.pathname.startsWith('/student/assignments')
                    ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                    : 'text-on-surface/70 hover:translate-x-1 hover:text-primary'
                    } font-label text-xs font-medium uppercase tracking-wider`}
                  to="/student/assignments"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: location.pathname.startsWith('/student/assignments') ? "'FILL' 1" : "'FILL' 0" }}>assignment</span>
                  <span>Assignments</span>
                </Link>
                <Link
                  className={`flex items-center space-x-3 px-6 py-2 rounded-xl transition-all duration-300 ${location.pathname.startsWith('/student/resources')
                    ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                    : 'text-on-surface/70 hover:translate-x-1 hover:text-primary'
                    } font-label text-xs font-medium uppercase tracking-wider`}
                  to="/student/resources"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: location.pathname.startsWith('/student/resources') ? "'FILL' 1" : "'FILL' 0" }}>library_books</span>
                  <span>Resources</span>
                </Link>
                <Link
                  className={`flex items-center space-x-3 px-6 py-2 rounded-xl transition-all duration-300 ${location.pathname.startsWith('/student/attendance')
                    ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                    : 'text-on-surface/70 hover:translate-x-1 hover:text-primary'
                    } font-label text-xs font-medium uppercase tracking-wider`}
                  to="/student/attendance"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: location.pathname.startsWith('/student/attendance') ? "'FILL' 1" : "'FILL' 0" }}>how_to_reg</span>
                  <span>Attendance</span>
                </Link>
                <Link
                  className={`flex items-center space-x-3 px-6 py-2 rounded-xl transition-all duration-300 ${location.pathname.startsWith('/student/feedback')
                    ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                    : 'text-on-surface/70 hover:translate-x-1 hover:text-primary'
                    } font-label text-xs font-medium uppercase tracking-wider`}
                  to="/student/feedback"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: location.pathname.startsWith('/student/feedback') ? "'FILL' 1" : "'FILL' 0" }}>forum</span>
                  <span>Feedback</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
        <div className="mt-auto px-4">
          <Link className="flex items-center gap-3 text-on-surface/60 hover:text-error hover:bg-error-container/10 my-1 p-3 transition-colors duration-200 rounded-xl font-label text-sm font-medium uppercase tracking-wider" to="/">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-headline tracking-tight">Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0 min-h-screen">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl shadow-sm flex justify-end items-center w-full px-8 py-4 h-16">
          <div className="flex items-center space-x-6">
            <Link
              className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200 relative active:scale-95 no-underline"
              to="/student/notifications"
              state={{ fromGlobal: !isBootcampContext }}
            >
              notifications
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-tertiary rounded-full border-2 border-surface"></span>
            </Link>
            <Link
              className="h-10 w-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant opacity-60 ring-2 ring-primary/10 cursor-pointer active:opacity-70 transition-opacity no-underline"
              to="/student/profile"
            >
              <span className="material-symbols-outlined text-3xl">account_circle</span>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
