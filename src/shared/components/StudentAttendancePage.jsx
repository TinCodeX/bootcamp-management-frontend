import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentAttendancePage = () => {
  const attendanceHistory = [
    { id: 1, date: 'Oct 24, 2023', session: 'Advanced React Patterns & Hooks', module: 'Module 4: Frontend Mastery', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor' },
    { id: 2, date: 'Oct 22, 2023', session: 'Backend Architecture with Node.js', module: 'Module 5: Scalable Systems', status: 'Late', color: 'bg-secondary-fixed text-on-secondary-fixed-variant', marker: 'Instructor' },
    { id: 3, date: 'Oct 20, 2023', session: 'Database Modeling & SQL Deep Dive', module: 'Module 3: Data Integrity', status: 'Absent', color: 'bg-tertiary-container/20 text-tertiary', marker: 'Instructor' },
    { id: 4, date: 'Oct 18, 2023', session: 'Microservices Communication', module: 'Module 5: Scalable Systems', status: 'Excused', color: 'bg-secondary-container/40 text-secondary', marker: 'Instructor' },
    { id: 5, date: 'Oct 16, 2023', session: 'Intro to System Design', module: 'Module 5: Scalable Systems', status: 'Present', color: 'bg-on-secondary-container/10 text-on-secondary-container', marker: 'Instructor' },
  ];

  return (
    <StudentLayout>
      <section className="p-8 max-w-7xl w-full mx-auto">
        {/* Hero Heading Section */}
        <div className="mb-10">
          <h2 className="text-5xl font-extrabold text-on-surface tracking-tight font-manrope mb-2 leading-tight">Attendance</h2>
          <p className="text-lg text-on-surface-variant font-medium opacity-70">Track your session participation and consistency.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Attendance % Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-1 w-full bg-primary opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Attendance %</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-primary">94.2%</span>
              <span className="text-secondary text-sm font-semibold">+2.1%</span>
            </div>
          </div>
          {/* Total Sessions Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-secondary opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Sessions</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-on-surface">36</span>
              <span className="text-on-surface-variant/60 text-sm font-bold">of 40</span>
            </div>
          </div>
          {/* Present Count Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-on-secondary-container opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Present Count</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-on-secondary-container">34</span>
              <span className="text-on-secondary-container/60 text-sm font-bold">days</span>
            </div>
          </div>
          {/* Absence Rate Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-tertiary opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Absence Rate</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-tertiary">5.8%</span>
              <span className="text-tertiary/60 text-sm font-bold">Low risk</span>
            </div>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-xl font-extrabold text-on-surface font-manrope">Recent Activity</h3>
          <Link to="/student/attendance/history" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="bg-surface-container-low/50 rounded-2xl p-2 border border-outline-variant/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-none">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Session Title</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Marked By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/30">
                {attendanceHistory.map((item) => (
                  <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
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
                    <td className="px-8 py-6 text-sm font-bold text-on-surface-variant/60 text-right">{item.marker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 px-2">
          <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">Last updated: Today at 09:42 AM</p>
          <div className="flex flex-wrap gap-6">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-on-secondary-container/30 border border-on-secondary-container/20"></span> Present
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed border border-on-secondary-fixed-variant/20"></span> Late
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container/30 border border-tertiary/20"></span> Absent
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container/50 border border-secondary/20"></span> Excused
            </span>
          </div>
        </div>
      </section>
    </StudentLayout>
  );
};

export default StudentAttendancePage;
