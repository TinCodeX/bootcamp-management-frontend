import React, { useState, useEffect } from 'react';
import StudentLayout from './StudentLayout';

const DashboardPage = () => {
  const [userName, setUserName] = useState('Scholar');
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const allTasks = [
    { id: 1, title: 'Review Module 4 Submissions', status: 'Due Today', color: 'text-error' },
    { id: 2, title: 'Update Bootcamp Curriculum', status: '2 Days left', color: 'text-on-surface-variant' },
    { id: 3, title: 'Prepare Session Slides', status: 'Upcoming', color: 'text-primary' },
    { id: 4, title: 'Grade Lab Assessments', status: 'Pending', color: 'text-on-surface-variant' },
    { id: 5, title: 'Sync with Mentors', status: 'Ongoing', color: 'text-secondary' },
  ];

  return (
    <StudentLayout>
      <div className="p-8 pb-20">
        <section className="mb-10">
          <h2 className="text-[3.5rem] font-extrabold font-headline leading-tight tracking-tight text-on-surface">
            Welcome back, {userName}.
          </h2>
          <p className="text-on-surface-variant font-body text-lg mt-2 max-w-2xl">
            Your bootcamp ecosystem is synchronized. You have {allTasks.length} pending tasks and 2 upcoming sessions today.
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
          <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest rounded-xl editorial-shadow p-8 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold font-headline text-on-surface">Today's Sessions</h3>
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
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            <div className={`bg-surface-container-lowest rounded-xl editorial-shadow p-8 transition-all duration-500 relative z-20 ${isTasksExpanded ? 'flex-1 ring-2 ring-primary/20' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-extrabold font-headline text-on-surface">Pending Tasks</h3>
                  <span className="bg-primary-container/10 text-primary text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">{allTasks.length} New</span>
                </div>
                <button
                  onClick={() => setIsTasksExpanded(!isTasksExpanded)}
                  className="text-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  {isTasksExpanded ? 'Shrink' : 'View All'}
                  <span className="material-symbols-outlined text-sm">{isTasksExpanded ? 'expand_less' : 'expand_more'}</span>
                </button>
              </div>

              <div className={`space-y-3 ${isTasksExpanded ? 'max-h-[400px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                {(isTasksExpanded ? allTasks : allTasks.slice(0, 2)).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">check_box_outline_blank</span>
                      <span className="text-sm font-bold text-on-surface">{task.title}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${task.color}`}>{task.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {!isTasksExpanded && (
              <div className="bg-surface-container-lowest rounded-xl editorial-shadow p-8 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-8xl">warning</span>
                </div>
                <h3 className="text-xl font-extrabold font-headline text-on-surface mb-6">System Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-tertiary-fixed/30 rounded-2xl border border-tertiary/10">
                    <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                    </div>
                    <div>
                      <h6 className="text-sm font-black text-on-tertiary-fixed uppercase tracking-wider mb-1">Project Deadline</h6>
                      <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed font-medium opacity-80">Phase 2 project submission ends in 12 hours. Ensure all students have uploaded documents.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default DashboardPage;
