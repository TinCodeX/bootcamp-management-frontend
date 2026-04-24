import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const FullAttendanceHistoryPage = () => {
  const [filter, setFilter] = useState('All');

  const history = [
    { id: 1, date: 'Oct 24, 2023', session: 'Advanced React Patterns & Hooks', module: 'Module 4: Frontend Mastery', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor Lelo' },
    { id: 2, date: 'Oct 22, 2023', session: 'Backend Architecture with Node.js', module: 'Module 5: Scalable Systems', status: 'Late', color: 'bg-secondary-fixed text-on-secondary-fixed-variant', marker: 'Instructor Lelo' },
    { id: 3, date: 'Oct 20, 2023', session: 'Database Modeling & SQL Deep Dive', module: 'Module 3: Data Integrity', status: 'Absent', color: 'bg-tertiary-container/20 text-tertiary', marker: 'Instructor Lelo' },
    { id: 4, date: 'Oct 18, 2023', session: 'Microservices Communication', module: 'Module 5: Scalable Systems', status: 'Excused', color: 'bg-secondary-container/40 text-secondary', marker: 'Instructor Lelo' },
    { id: 5, date: 'Oct 16, 2023', session: 'Intro to System Design', module: 'Module 5: Scalable Systems', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor Lelo' },
    { id: 6, date: 'Oct 14, 2023', session: 'Authentication & JWT Workshop', module: 'Module 4: Frontend Mastery', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor Lelo' },
    { id: 7, date: 'Oct 12, 2023', session: 'Redis & Caching Strategies', module: 'Module 5: Scalable Systems', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor Lelo' },
    { id: 8, date: 'Oct 10, 2023', session: 'CSS Architecture & SASS', module: 'Module 4: Frontend Mastery', status: 'Late', color: 'bg-secondary-fixed text-on-secondary-fixed-variant', marker: 'Instructor Lelo' },
    { id: 9, date: 'Oct 08, 2023', session: 'Git Rebase & Advanced CLI', module: 'Module 1: Foundations', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor Lelo' },
    { id: 10, date: 'Oct 06, 2023', session: 'TypeScript Fundamentals', module: 'Module 1: Foundations', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor Lelo' },
  ];

  const filteredHistory = filter === 'All' ? history : history.filter(item => item.status === filter);

  return (
    <StudentLayout>
      <div className="p-8 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/student/attendance">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Overview
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Full Attendance History</h1>
              <p className="text-on-surface-variant font-medium opacity-70">A complete log of your participation in the Fullstack Dev 2024 bootcamp.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Present', 'Late', 'Absent', 'Excused'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === status
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Session</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Instructor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/30">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-bright transition-colors group">
                    <td className="px-8 py-6 font-body text-sm font-bold text-on-surface">{item.date}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{item.session}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium opacity-60">{item.module}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${item.color}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 text-on-surface-variant/60">
                        <span className="text-xs font-bold">{item.marker}</span>
                        <div className="w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredHistory.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-on-surface-variant font-medium italic opacity-50">
                      No records found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
            End of records for Oct 2023 - Present
          </p>
        </footer>
      </div>
    </StudentLayout>
  );
};

export default FullAttendanceHistoryPage;
