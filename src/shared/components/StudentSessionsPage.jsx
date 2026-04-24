import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentSessionsPage = () => {
  return (
    <StudentLayout>
      <div className="px-12 py-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface mb-2 leading-tight">Sessions</h2>
            <p className="text-on-surface-variant font-medium">Manage your learning journey and upcoming masterclasses.</p>
          </div>
        </div>

        {/* Upcoming Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
              Upcoming
              <span className="h-2 w-2 rounded-full bg-secondary"></span>
            </h3>
            <Link className="text-primary font-bold text-sm hover:underline" to="/student/sessions/schedule">View Full Schedule</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Session Card 1 */}
            <div className="group relative bg-surface-container-lowest p-8 rounded-xl transition-all duration-300 hover:translate-y-[-4px] shadow-sm hover:shadow-md border border-outline-variant/10">
              <div className="absolute inset-x-0 top-0 h-1 bg-primary rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-black uppercase tracking-widest rounded-full">Project</span>
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">rocket_launch</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface mb-4 leading-tight">Advanced React Patterns & Global State</h4>
              <div className="space-y-3 text-on-surface-variant text-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">calendar_month</span>
                  <span>October 24, 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">schedule</span>
                  <span>10:00 - 12:30</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">location_on</span>
                  <span className="font-semibold text-secondary">Lab A • Instructor: Lelo Mohammed</span>
                </div>
              </div>
            </div>

            {/* Session Card 2 */}
            <div className="group relative bg-surface-container-lowest p-8 rounded-xl transition-all duration-300 hover:translate-y-[-4px] shadow-sm hover:shadow-md border border-outline-variant/10">
              <div className="absolute inset-x-0 top-0 h-1 bg-primary rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-black uppercase tracking-widest rounded-full">Lecture</span>
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">terminal</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface mb-4 leading-tight">System Design: Scaling to 10M Users</h4>
              <div className="space-y-3 text-on-surface-variant text-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">calendar_month</span>
                  <span>October 25, 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">schedule</span>
                  <span>14:00 - 16:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">location_on</span>
                  <span className="font-semibold text-secondary">Lab B • Instructor: Lelo Mohammed</span>
                </div>
              </div>
            </div>

            {/* Session Card 3 */}
            <div className="group relative bg-surface-container-lowest p-8 rounded-xl transition-all duration-300 border-l-4 border-tertiary shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-black uppercase tracking-widest rounded-full">Assessment</span>
                <span className="material-symbols-outlined text-tertiary">priority_high</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface mb-4 leading-tight">Bi-Weekly Technical Review #4</h4>
              <div className="space-y-3 text-on-surface-variant text-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">calendar_month</span>
                  <span>October 26, 2023</span>
                </div>
                <div className="flex items-center gap-3 text-tertiary font-bold">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span>09:00 Sharp</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg opacity-60">location_on</span>
                  <span className="font-semibold text-secondary">Lab A • Instructor: Lelo Mohammed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Past Sessions Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold text-on-surface">Past Sessions</h3>
            <Link className="text-primary font-bold text-sm hover:underline flex items-center gap-1" to="/student/sessions/history">
              View All
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="space-y-4">
            {/* Past Row 1 */}
            <div className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl group hover:bg-surface-container-low transition-colors duration-200 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 bg-surface-container-high rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant opacity-60">description</span>
                </div>
                <div>
                  <h5 className="font-bold text-on-surface">Data Structures: Trees & Graphs</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Oct 20, 2023 • 10:00 - 12:00 • Lab B • Mentor: Dr. Elias</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-on-secondary-container bg-secondary-fixed px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>

            {/* Past Row 2 */}
            <div className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl group hover:bg-surface-container-low transition-colors duration-200 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 bg-surface-container-high rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant opacity-60">javascript</span>
                </div>
                <div>
                  <h5 className="font-bold text-on-surface">Asynchronous Programming in JS</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Oct 18, 2023 • 09:00 - 11:30 • Lab B</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-on-secondary-container bg-secondary-fixed px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>

            {/* Past Row 3 */}
            <div className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl group hover:bg-surface-container-low transition-colors duration-200 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 bg-surface-container-high rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant opacity-60">storage</span>
                </div>
                <div>
                  <h5 className="font-bold text-on-surface">PostgreSQL Fundamentals</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Oct 15, 2023 • 14:00 - 16:30 • Lab A</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-on-secondary-container bg-secondary-fixed px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default StudentSessionsPage;
