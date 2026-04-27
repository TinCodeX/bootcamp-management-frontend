import React, { useState, useEffect } from 'react';
import StudentLayout from './StudentLayout';
import { studentService } from '../../api/studentService';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [userName, setUserName] = useState('Scholar');
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);
  const [pendingFeedback, setPendingFeedback] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [feedback, subs, tks] = await Promise.all([
        studentService.getPendingFeedback(),
        studentService.getSubmissions(),
        studentService.getTasks()
      ]);
      setPendingFeedback(feedback || []);
      setSubmissions(subs || []);
      setTasksList(tks || []);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const tasks = [
    ...pendingFeedback.map(f => ({
      id: `feedback-${f.id}`,
      title: `Feedback: ${f.title}`,
      status: 'Action Required',
      color: 'text-error',
      link: '/student/feedback'
    })),
    ...tasksList.map(t => ({
      id: `task-${t.id}`,
      title: `Task: ${t.title}`,
      status: 'In Progress',
      color: 'text-secondary',
      link: `/student/assignments/brief/${t.id}`
    })),
    ...submissions.filter(s => s.grade === null).map(s => ({
      id: `sub-${s.id}`,
      title: `Review: ${s.assignmentTitle || s.taskTitle}`,
      status: 'Pending Grade',
      color: 'text-primary',
      link: '/student/assignments'
    }))
  ];

  return (
    <StudentLayout>
      <div className="p-8 pb-20">
        <section className="mb-10">
          <h2 className="text-[3.5rem] font-extrabold font-headline leading-tight tracking-tight text-on-surface">
            Welcome back, {userName}.
          </h2>
          <p className="text-on-surface-variant font-body text-lg mt-2 max-w-2xl">
            Your bootcamp ecosystem is synchronized. You have {tasks.length} pending tasks.
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
                    <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[0.65rem] font-bold font-label uppercase tracking-widest rounded-full">Recent Activity</span>
                    <span className="text-on-surface-variant text-xs font-body">Submissions</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline text-on-surface mb-1">Assignment Tracker</h3>
                  <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">Monitor your latest uploads and instructor feedback in real-time.</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] font-label uppercase text-on-surface-variant tracking-tighter">Completed</span>
                    <span className="text-sm font-bold font-headline text-primary">{submissions.filter(s => s.grade !== null).length} Graded</span>
                  </div>
                  <Link to="/student/assignments" className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden relative group">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-tertiary to-primary"></div>
              <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[0.65rem] font-bold font-label uppercase tracking-widest rounded-full">Feedback</span>
                    <span className="text-on-surface-variant text-xs font-body">Engagement</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline text-on-surface mb-1">Continuous Growth</h3>
                  <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">Your perspective helps us evolve. Complete pending feedback to improve the experience.</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] font-label uppercase text-on-surface-variant tracking-tighter">Pending</span>
                    <span className="text-sm font-bold font-headline text-tertiary">{pendingFeedback.length} Required</span>
                  </div>
                  <Link to="/student/feedback" className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center hover:bg-tertiary/10 transition-colors">
                    <span className="material-symbols-outlined text-tertiary">rate_review</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Side KPI */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors duration-300">
              <div>
                <p className="text-[0.65rem] font-label font-bold uppercase tracking-wider text-on-surface-variant mb-1">Global Status</p>
                <p className="text-xs font-bold text-primary mb-1">Bootcamp Portal</p>
                <h4 className="text-3xl font-extrabold font-headline text-on-surface">Active</h4>
              </div>
              <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
            </div>
          </div>

          {/* Today's Sessions - Keeping simplified mock or placeholder until sessions API is ready */}
          <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest rounded-xl editorial-shadow p-8 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold font-headline text-on-surface">Upcoming Sessions</h3>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start opacity-50">
                <div className="flex flex-col items-center min-w-[3.5rem]">
                  <span className="text-sm font-bold text-on-surface-variant">Soon</span>
                </div>
                <div className="flex-1 bg-surface-container-low p-4 rounded-xl">
                  <p className="text-[0.65rem] font-label font-bold uppercase text-on-surface-variant mb-1">Information</p>
                  <h5 className="font-bold text-on-surface">Check schedule for updates</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Visit the Sessions tab for full schedule.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Tasks & Alerts */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            <div className={`bg-surface-container-lowest rounded-xl editorial-shadow p-8 transition-all duration-500 relative z-20 ${isTasksExpanded ? 'flex-1 ring-2 ring-primary/20' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-extrabold font-headline text-on-surface">Task Inbox</h3>
                  <span className="bg-primary-container/10 text-primary text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">{tasks.length} New</span>
                </div>
                {tasks.length > 2 && (
                  <button
                    onClick={() => setIsTasksExpanded(!isTasksExpanded)}
                    className="text-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                  >
                    {isTasksExpanded ? 'Shrink' : 'View All'}
                    <span className="material-symbols-outlined text-sm">{isTasksExpanded ? 'expand_less' : 'expand_more'}</span>
                  </button>
                )}
              </div>

              <div className={`space-y-3 ${isTasksExpanded ? 'max-h-[400px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                {isLoading ? (
                  <div className="py-10 text-center text-xs font-bold text-on-surface-variant opacity-50">Loading your inbox...</div>
                ) : tasks.length === 0 ? (
                  <div className="py-10 text-center text-xs font-bold text-on-surface-variant opacity-30 italic">No pending tasks. You're all caught up!</div>
                ) : (isTasksExpanded ? tasks : tasks.slice(0, 2)).map((task) => (
                  <Link 
                    key={task.id} 
                    to={task.link}
                    className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors group no-underline"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">
                        {task.status === 'Action Required' ? 'notification_important' : 'pending_actions'}
                      </span>
                      <span className="text-sm font-bold text-on-surface">{task.title}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${task.color}`}>{task.status}</span>
                  </Link>
                ))}
              </div>
            </div>

            {!isTasksExpanded && tasks.some(t => t.status === 'Action Required') && (
              <div className="bg-surface-container-lowest rounded-xl editorial-shadow p-8 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-8xl">priority_high</span>
                </div>
                <h3 className="text-xl font-extrabold font-headline text-on-surface mb-6">Priority Alert</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-error/10 rounded-2xl border border-error/10">
                    <div className="w-10 h-10 rounded-full bg-error flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-error text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    </div>
                    <div>
                      <h6 className="text-sm font-black text-error uppercase tracking-wider mb-1">Feedback Needed</h6>
                      <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-80">
                        You have {pendingFeedback.length} sessions requiring feedback. Your input helps us improve!
                      </p>
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
