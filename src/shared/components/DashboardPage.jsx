import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';


const DashboardPage = () => {
  const [userName, setUserName] = useState('Scholar');

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container-low flex flex-col py-6 shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.05)]">
        <div className="px-6 mb-12">
          <h1 className="text-2xl font-black font-headline text-primary tracking-tighter uppercase">CSEC ASTU</h1>
          <p className="text-[10px] font-headline font-bold tracking-[0.2em] uppercase opacity-40 mt-1">Bootcamp Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link className="flex items-center gap-3 text-primary font-bold bg-surface-container-lowest rounded-xl my-1 p-3 transition-all scale-98 active:scale-95" to="/dashboard">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="font-headline tracking-tight">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 text-on-surface/60 hover:text-primary hover:bg-surface-container-lowest/50 my-1 p-3 transition-colors duration-200 rounded-xl" to="/my-bootcamps">
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

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-30 bg-surface/80 backdrop-blur-md flex justify-between items-center px-8 gap-4 shadow-sm">
        <div className="md:hidden">
          <span className="text-2xl font-black font-headline text-primary tracking-tighter uppercase">CSEC ASTU</span>
        </div>
        <div className="hidden md:block">
          <h2 className="text-lg font-bold font-headline text-primary opacity-0 pointer-events-none">CSEC ASTU</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-on-surface opacity-70 hover:opacity-100 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined text-primary">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden cursor-pointer active:opacity-70">
            <img
              alt="User Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHMVqIDssHIuBTPINUVO65ENox8NUZsqC75DSUxZz1-qTJXR7uiRn-EbjueaCMmOeOmCBw2iyLJsgCzyAtQniIB01DwYLn6lkYXph15jrPiTWaeb_LowT81hvTm3X9SZzH9Wwl4s-2LwrWL4MrlhXnTiWlP42UC8woG_cng7KNovuby9OZPlUkabmyB_M7bcAYnMWVnYkavKQiglPzvwVaHGrgUV_3iOzdXoRlkJPnw2SMeMlEC1EzjOwuyO5KhELC37EC0QJtiWQ"
            />
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="ml-64 pt-20 p-8 flex-1 min-h-screen">
        <section className="mb-10">
          <h2 className="text-[3.5rem] font-extrabold font-headline leading-tight tracking-tight text-on-surface">
            Welcome back, {userName}.
          </h2>
          <p className="text-on-surface-variant font-body text-lg mt-2 max-w-2xl">
            Your bootcamp ecosystem is synchronized. You have 3 pending tasks and 2 upcoming sessions today.
          </p>
        </section>

        <div className="grid grid-cols-12 gap-6">
          {/* Hero Row: Side-by-Side Session Cards */}
          <div className="col-span-12 lg:col-span-8 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden relative group">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-secondary"></div>
              <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[0.65rem] font-bold font-label uppercase tracking-widest rounded-full">Ongoing</span>
                    <span className="text-on-surface-variant text-xs font-body">Fullstack Dev 2024</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline text-on-surface mb-1">Advanced Systems Architecture</h3>
                  <div className="text-xs font-body text-on-surface-variant mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">calendar_today</span>
                    <span>Oct 24, 2023</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">Mastering microservices, event-driven design, and high-performance caching strategies.</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] font-label uppercase text-on-surface-variant tracking-tighter">Progress</span>
                    <span className="text-sm font-bold font-headline text-primary">68%</span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC021c5pqCpqZ-HpHczaX83rHA3y4MUSc4dCvMQOKZ1lkaVr16spHIk5ApPXvXpxY3Oj396QWf8c2dpnkR5VzjWU9Tlbkiy--iO9MIFyuex3ejG1fG3tz8I18N7j0pzqVfATIEZ_F_AnNEh1YP03Uon-6gAzcClK0_7b0C4qgBsKzFLTG6nHpYknDp2tD-GYLFYiUZ02C9CK7nxOaHzorcQL42Cqr75OuZd_S17oaxK_4tK_VYE2mSLZYaXkV79CL_YPVZLuFcIY4" alt="code" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden relative group">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-secondary"></div>
              <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[0.65rem] font-bold font-label uppercase tracking-widest rounded-full">Upcoming</span>
                    <span className="text-on-surface-variant text-xs font-body">Frontend Mastery 2024</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline text-on-surface mb-1">React Performance Patterns</h3>
                  <div className="text-xs font-body text-on-surface-variant mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">calendar_today</span>
                    <span>Oct 25, 2023</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">Deep dive into React profiling, virtualization, and advanced optimization techniques.</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] font-label uppercase text-on-surface-variant tracking-tighter">Progress</span>
                    <span className="text-sm font-bold font-headline text-primary">0%</span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC021c5pqCpqZ-HpHczaX83rHA3y4MUSc4dCvMQOKZ1lkaVr16spHIk5ApPXvXpxY3Oj396QWf8c2dpnkR5VzjWU9Tlbkiy--iO9MIFyuex3ejG1fG3tz8I18N7j0pzqVfATIEZ_F_AnNEh1YP03Uon-6gAzcClK0_7b0C4qgBsKzFLTG6nHpYknDp2tD-GYLFYiUZ02C9CK7nxOaHzorcQL42Cqr75OuZd_S17oaxK_4tK_VYE2mSLZYaXkV79CL_YPVZLuFcIY4" alt="workspace" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side KPI */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors duration-300">
              <div>
                <p className="text-[0.65rem] font-label font-bold uppercase tracking-wider text-on-surface-variant mb-1">Enrolled Students</p>
                <p className="text-xs font-bold text-primary mb-1">Fullstack Dev 2024</p>
                <h4 className="text-3xl font-extrabold font-headline text-on-surface">1,248</h4>
              </div>
              <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
            </div>
          </div>

          {/* Today's Sessions */}
          <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest rounded-xl editorial-shadow p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold font-headline text-on-surface">Today's Sessions</h3>
              <span className="text-primary text-sm font-bold font-label cursor-pointer hover:underline">View Calendar</span>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center min-w-[3.5rem]">
                  <span className="text-sm font-bold text-primary">09:00</span>
                  <div className="w-0.5 h-12 bg-surface-container mt-2"></div>
                </div>
                <div className="flex-1 bg-surface-container-low p-4 rounded-xl border-l-4 border-primary">
                  <p className="text-[0.65rem] font-label font-bold uppercase text-on-surface-variant mb-1">Workshop</p>
                  <h5 className="font-bold text-on-surface">React Performance Patterns</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Main Lab • Instructor: Sarah Connor</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center min-w-[3.5rem]">
                  <span className="text-sm font-bold text-on-surface-variant">14:30</span>
                </div>
                <div className="flex-1 bg-surface-container-low p-4 rounded-xl">
                  <p className="text-[0.65rem] font-label font-bold uppercase text-on-surface-variant mb-1">Theory Session</p>
                  <h5 className="font-bold text-on-surface">Graph Theory in Logistics</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Lecture Hall B • Guest Speaker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Tasks & Alerts */}
          <div className="col-span-12 lg:col-span-6 grid grid-rows-2 gap-6">
            <div className="bg-surface-container-lowest rounded-xl editorial-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-headline text-on-surface">Pending Tasks</h3>
                <span className="bg-primary-container text-on-primary-container text-[0.65rem] font-bold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm">check_box_outline_blank</span>
                    <span className="text-sm font-medium text-on-surface">Review Module 4 Submissions</span>
                  </div>
                  <span className="text-[0.65rem] font-bold text-error">Due Today</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm">check_box_outline_blank</span>
                    <span className="text-sm font-medium text-on-surface">Update Bootcamp Curriculum</span>
                  </div>
                  <span className="text-[0.65rem] font-bold text-on-surface-variant">2 Days left</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl editorial-shadow p-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <span className="material-symbols-outlined text-8xl">warning</span>
              </div>
              <h3 className="text-lg font-bold font-headline text-on-surface mb-4">System Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-tertiary-fixed rounded-xl">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim bg-tertiary p-1 rounded-full text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                  <div>
                    <h6 className="text-xs font-bold text-on-tertiary-fixed">Project Deadline Approaching</h6>
                    <p className="text-[0.7rem] text-on-tertiary-fixed-variant leading-tight">Phase 2 project submission ends in 12 hours. Ensure all students have uploaded documents.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
