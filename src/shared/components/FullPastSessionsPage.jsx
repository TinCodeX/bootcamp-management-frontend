import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const FullPastSessionsPage = () => {
  const [filter, setFilter] = useState('All');

  const history = [
    { id: 1, title: 'Data Structures: Trees & Graphs', date: 'Oct 20, 2023', time: '10:00 - 12:00', location: 'Lab B', mentor: 'Dr. Elias', type: 'Workshop' },
    { id: 2, title: 'Asynchronous Programming in JS', date: 'Oct 18, 2023', time: '09:00 - 11:30', location: 'Lab B', mentor: 'Lelo Mohammed', type: 'Lecture' },
    { id: 3, title: 'PostgreSQL Fundamentals', date: 'Oct 15, 2023', time: '14:00 - 16:30', location: 'Lab A', mentor: 'Lelo Mohammed', type: 'Workshop' },
    { id: 4, title: 'Advanced CSS Layouts', date: 'Oct 12, 2023', time: '10:00 - 12:00', location: 'Lab A', mentor: 'Sarah Connor', type: 'Workshop' },
    { id: 5, title: 'Intro to React Hooks', date: 'Oct 10, 2023', time: '09:00 - 11:00', location: 'Lab B', mentor: 'Lelo Mohammed', type: 'Lecture' },
  ];

  return (
    <StudentLayout>
      <div className="p-8 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/student/sessions">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Sessions
          </Link>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">All Past Sessions</h1>
          <p className="text-on-surface-variant font-medium opacity-70">Review all completed masterclasses and workshops.</p>
        </header>

        <div className="space-y-4">
          {history.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl group hover:bg-surface-container-low transition-all duration-300 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-surface-container-high rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">
                    {session.type === 'Workshop' ? 'precision_manufacturing' : 'menu_book'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${session.type === 'Workshop' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                      {session.type}
                    </span>
                    <h5 className="font-bold text-on-surface text-lg">{session.title}</h5>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">
                    {session.date} • {session.time} • {session.location} • Mentor: {session.mentor}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 bg-on-secondary-container/10 text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Completed
                </span>
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default FullPastSessionsPage;
