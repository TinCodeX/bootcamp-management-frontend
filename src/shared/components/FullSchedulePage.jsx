import React from 'react';
import StudentLayout from './StudentLayout';
import { Link } from 'react-router-dom';

const FullSchedulePage = () => {
  const schedule = [
    { id: 1, title: 'Advanced React Patterns & Global State', date: 'October 24, 2023', time: '10:00 - 12:30', location: 'Lab A', instructor: 'Lelo Mohammed', type: 'Project' },
    { id: 2, title: 'System Design: Scaling to 10M Users', date: 'October 25, 2023', time: '14:00 - 16:00', location: 'Lab B', instructor: 'Lelo Mohammed', type: 'Lecture' },
    { id: 3, title: 'Bi-Weekly Technical Review #4', date: 'October 26, 2023', time: '09:00 Sharp', location: 'Lab A', instructor: 'Lelo Mohammed', type: 'Assessment' },
    { id: 4, title: 'Database Optimization & Indexing', date: 'October 28, 2023', time: '10:00 - 12:00', location: 'Lab C', instructor: 'Lelo Mohammed', type: 'Workshop' },
    { id: 5, title: 'UI/UX: Designing for Accessibility', date: 'October 30, 2023', time: '11:00 - 13:00', location: 'Design Studio', instructor: 'Lelo Mohammed', type: 'Lab' },
  ];

  return (
    <StudentLayout>
      <div className="p-8 max-w-5xl mx-auto w-full">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/sessions">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Sessions
            </Link>
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Full Schedule</h1>
            <p className="text-on-surface-variant font-medium">All upcoming masterclasses and workshops for your bootcamp.</p>
          </div>
        </header>

        <div className="space-y-6">
          {schedule.map((session) => (
            <div key={session.id} className="group bg-surface-container-lowest p-6 rounded-2xl flex items-center gap-8 border border-outline-variant/10 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="flex flex-col items-center justify-center min-w-[100px] border-r border-outline-variant/20 pr-8">
                <span className="text-2xl font-black text-primary">{session.date.split(' ')[1].replace(',', '')}</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{session.date.split(' ')[0]}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${session.type === 'Assessment' ? 'bg-error-container text-on-error-container' :
                    session.type === 'Project' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' :
                      'bg-primary-fixed text-on-primary-fixed-variant'
                    }`}>
                    {session.type}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">{session.time}</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{session.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm opacity-60">location_on</span>
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm opacity-60">person</span>
                    <span>{session.instructor}</span>
                  </div>
                </div>
              </div>

              <button
                className="px-5 py-2 bg-surface-container-high text-on-surface rounded-lg font-bold text-xs hover:bg-primary hover:text-on-primary transition-all"
                onClick={() => alert(`Added "${session.title}" to your calendar!`)}
              >
                Add to Calendar
              </button>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default FullSchedulePage;
