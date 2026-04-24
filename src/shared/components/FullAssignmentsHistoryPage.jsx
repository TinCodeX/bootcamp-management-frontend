import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const FullAssignmentsHistoryPage = () => {
  const completedAssignments = [
    { id: 1, title: 'UI Design Principles', division: 'Design Systems Division', bootcamp: 'Fullstack Development', date: 'Oct 22, 2023', score: '98/100', status: 'Graded', resultLink: '/student/assignments/result/1' },
    { id: 2, title: 'Database Schema Modeling', division: 'Backend Division', bootcamp: 'Fullstack Development', date: 'Oct 18, 2023', status: 'Submitted', submitLink: '/student/assignments/submit/3' },
    { id: 3, title: 'API Authentication Flow', division: 'Cybersecurity Division', bootcamp: 'Fullstack Development', date: 'Oct 15, 2023', score: '92/100', status: 'Graded', resultLink: '/student/assignments/result/2' },
    { id: 4, title: 'JavaScript Engine Internals', division: 'Core Engineering', bootcamp: 'Fullstack Development', date: 'Oct 10, 2023', score: '85/100', status: 'Graded', resultLink: '#' },
    { id: 5, title: 'Advanced CSS Flexbox & Grid', division: 'Frontend Division', bootcamp: 'Fullstack Development', date: 'Oct 05, 2023', score: '100/100', status: 'Graded', resultLink: '#' },
  ];

  return (
    <StudentLayout>
      <div className="p-8 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/student/assignments">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Overview
          </Link>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">All Completed Assignments</h1>
          <p className="text-on-surface-variant font-medium opacity-70">A comprehensive record of your technical milestones and submissions.</p>
        </header>

        <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Assignment</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Bootcamp</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Submitted</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/30">
                {completedAssignments.map((item) => (
                  <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{item.title}</span>
                        <span className="text-[11px] font-medium text-on-surface-variant opacity-60 uppercase tracking-tighter">{item.division}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{item.bootcamp}</td>
                    <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{item.date}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Graded' ? 'bg-on-secondary-container/10 text-on-secondary-container' : 'bg-secondary-container/20 text-secondary'}`}>
                        {item.status} {item.score && `: ${item.score}`}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {item.status === 'Graded' ? (
                        <Link className="text-primary font-bold text-sm hover:underline" to={item.resultLink}>View Result</Link>
                      ) : (
                        <Link className="text-primary font-bold text-sm hover:underline" to={item.submitLink}>View Submission</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default FullAssignmentsHistoryPage;
