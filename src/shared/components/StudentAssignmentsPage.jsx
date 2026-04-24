import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentAssignmentsPage = () => {
  return (
    <StudentLayout>
      <div className="p-8 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Assignments</h1>
          <p className="text-on-surface-variant font-medium">Track your technical milestones and submission deadlines.</p>
        </header>

        {/* Upcoming Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-xl font-bold flex items-center gap-3 text-on-surface">
              Upcoming
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container/10 text-primary text-xs font-bold tracking-wider uppercase">3 Pending</span>
            </h2>
            <Link className="text-primary font-bold text-sm hover:underline flex items-center gap-1" to="/student/assignments/upcoming">
              View All
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Urgent Assignment Card */}
            <div className="group relative bg-surface-container-lowest p-8 rounded-xl flex flex-col gap-6 shadow-sm border border-outline-variant/10 transition-all hover:-translate-y-1 overflow-hidden">
              <div className="absolute left-0 top-0 w-1.5 h-full bg-tertiary"></div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-tertiary tracking-widest uppercase">High Priority</span>
                  <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors">React Hooks & State Management</h3>
                </div>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">Due Oct 30, 2023</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Bootcamp</span>
                  <span className="text-sm font-bold text-on-surface">Fullstack Development</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Division</span>
                  <span className="text-sm font-bold text-on-surface">Engineering</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Link
                  className="flex-1 py-3 px-6 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  to="/student/assignments/submit/1"
                >
                  <span className="material-symbols-outlined text-sm">upload_file</span>
                  Submit Assignment
                </Link>
                <Link
                  className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm"
                  to="/student/assignments/brief/1"
                >
                  View Brief
                </Link>
              </div>
            </div>

            {/* Regular Assignment Card */}
            <div className="group relative bg-surface-container-lowest p-8 rounded-xl flex flex-col gap-6 shadow-sm border border-outline-variant/10 transition-all hover:-translate-y-1 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">In Progress</span>
                  <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors">Advanced Node.js Architecture</h3>
                </div>
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-4 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">Due Nov 05, 2023</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Bootcamp</span>
                  <span className="text-sm font-bold text-on-surface">Fullstack Development</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Division</span>
                  <span className="text-sm font-bold text-on-surface">Engineering</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Link
                  className="flex-1 py-3 px-6 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  to="/student/assignments/submit/2"
                >
                  <span className="material-symbols-outlined text-sm">upload_file</span>
                  Submit Assignment
                </Link>
                <Link
                  className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm"
                  to="/student/assignments/brief/2"
                >
                  View Brief
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Completed Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-xl font-bold flex items-center gap-3 text-on-surface">
              Completed
            </h2>
            <Link className="text-primary font-bold text-sm hover:underline flex items-center gap-1" to="/student/assignments/history">
              View All
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container border-none">
                    <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Assignment</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Bootcamp</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Submitted</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container/50">
                  <tr className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface group-hover:text-primary transition-colors">UI Design Principles</span>
                        <span className="text-xs text-on-surface-variant">Design Systems Division</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">Fullstack Development</td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">Oct 22, 2023</td>
                    <td className="px-8 py-6">
                      <span className="bg-on-secondary-container/10 text-on-secondary-container px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">Graded: 98/100</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link className="text-primary font-bold text-sm hover:underline" to="/student/assignments/result/1">View Result</Link>
                    </td>
                  </tr>
                  <tr className="bg-surface-container-low/40 hover:bg-surface-bright transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface group-hover:text-primary transition-colors">Database Schema Modeling</span>
                        <span className="text-xs text-on-surface-variant">Backend Division</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">Fullstack Development</td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">Oct 18, 2023</td>
                    <td className="px-8 py-6">
                      <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">Submitted</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link className="text-primary font-bold text-sm hover:underline" to="/student/assignments/submit/3">View Submission</Link>
                    </td>
                  </tr>
                  <tr className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface group-hover:text-primary transition-colors">API Authentication Flow</span>
                        <span className="text-xs text-on-surface-variant">Cybersecurity Division</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">Fullstack Development</td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">Oct 15, 2023</td>
                    <td className="px-8 py-6">
                      <span className="bg-on-secondary-container/10 text-on-secondary-container px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">Graded: 92/100</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link className="text-primary font-bold text-sm hover:underline" to="/student/assignments/result/2">View Result</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default StudentAssignmentsPage;
