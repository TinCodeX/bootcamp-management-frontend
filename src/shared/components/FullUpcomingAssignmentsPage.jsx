import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const FullUpcomingAssignmentsPage = () => {
  const assignments = [
    { id: 1, title: 'React Hooks & State Management', priority: 'Critical', deadline: 'Oct 30, 2023', daysLeft: 2, division: 'Engineering', color: 'bg-tertiary text-on-tertiary' },
    { id: 2, title: 'Advanced Node.js Architecture', priority: 'High', deadline: 'Nov 05, 2023', daysLeft: 7, division: 'Engineering', color: 'bg-primary text-on-primary' },
    { id: 3, title: 'Redis Caching Implementation', priority: 'Medium', deadline: 'Nov 12, 2023', daysLeft: 14, division: 'Backend', color: 'bg-secondary text-on-secondary' },
    { id: 4, title: 'GraphQL Schema Design', priority: 'Low', deadline: 'Nov 20, 2023', daysLeft: 22, division: 'Backend', color: 'bg-outline-variant/20 text-on-surface-variant' },
  ];

  return (
    <StudentLayout>
      <div className="p-8 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/student/assignments">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Overview
          </Link>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Upcoming Milestone Rankings</h1>
          <p className="text-on-surface-variant font-medium opacity-70">Assignments prioritized by deadline urgency and technical weight.</p>
        </header>

        <div className="space-y-6">
          {assignments.map((item, index) => (
            <div key={item.id} className="relative group bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-xl hover:translate-y-[-2px]">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-high font-headline font-black text-on-surface-variant/40 shrink-0">
                #{index + 1}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.color}`}>
                    {item.priority}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">{item.division} Division</span>
                </div>
                <h3 className="text-2xl font-extrabold text-on-surface group-hover:text-primary transition-colors">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>Due {item.deadline}</span>
                  </div>
                  <div className={`flex items-center gap-1 font-bold ${item.daysLeft <= 3 ? 'text-error' : 'text-secondary'}`}>
                    <span className="material-symbols-outlined text-sm">alarm</span>
                    <span>{item.daysLeft} days remaining</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link
                  to={`/student/assignments/submit/${item.id}`}
                  className="px-8 py-4 bg-primary text-on-primary font-black rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-center whitespace-nowrap"
                >
                  Submit Now
                </Link>
                <Link
                  to={`/student/assignments/brief/${item.id}`}
                  className="px-8 py-4 bg-secondary-container text-on-secondary-container font-black rounded-2xl hover:bg-secondary-container/80 transition-all text-center whitespace-nowrap"
                >
                  View Brief
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default FullUpcomingAssignmentsPage;
