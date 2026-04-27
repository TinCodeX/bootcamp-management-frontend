import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';
import { studentService } from '../../api/studentService';

const StudentAttendancePage = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Using a default bootcampId (matching StudentResourcesPage pattern)
  const bootcampId = '65f1a2b3c4d5e6f7g8h9i012';

  useEffect(() => {
    loadAttendanceData();
  }, [bootcampId]);

  const loadAttendanceData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [history, attendanceStats] = await Promise.all([
        studentService.getAttendance(bootcampId),
        studentService.getAttendanceStats(bootcampId)
      ]);
      setAttendanceHistory(history || []);
      setStats(attendanceStats);
    } catch (err) {
      console.error('Failed to load attendance data', err);
      setError('Could not load attendance records.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'present': return 'bg-on-secondary-container/10 text-on-secondary-container';
      case 'late': return 'bg-secondary-fixed text-on-secondary-fixed-variant';
      case 'absent': return 'bg-tertiary-container/20 text-tertiary';
      case 'excused': return 'bg-secondary-container/40 text-secondary';
      default: return 'bg-surface-container-high text-on-surface-variant';
    }
  };

  return (
    <StudentLayout>
      <section className="p-8 max-w-7xl w-full mx-auto">
        <div className="mb-10">
          <h2 className="text-5xl font-extrabold text-on-surface tracking-tight font-manrope mb-2 leading-tight">Attendance</h2>
          <p className="text-lg text-on-surface-variant font-medium opacity-70">Track your session participation and consistency.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-error/10 text-error rounded-xl text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Attendance % Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-1 w-full bg-primary opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Attendance %</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-primary">
                {stats?.percentage !== undefined ? `${stats.percentage}%` : '--%'}
              </span>
            </div>
          </div>
          {/* Total Sessions Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-secondary opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Sessions</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-on-surface">
                {stats?.totalSessions || '--'}
              </span>
            </div>
          </div>
          {/* Present Count Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-on-secondary-container opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Present Count</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-on-secondary-container">
                {stats?.presentCount || '--'}
              </span>
              <span className="text-on-secondary-container/60 text-sm font-bold">days</span>
            </div>
          </div>
          {/* Absence Count Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col gap-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-tertiary opacity-20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Absences</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-headline font-extrabold text-tertiary">
                {stats?.absentCount || '--'}
              </span>
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
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-10 text-center text-on-surface-variant opacity-50 font-bold">Loading records...</td>
                  </tr>
                ) : attendanceHistory.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-10 text-center text-on-surface-variant opacity-50">No attendance records found.</td>
                  </tr>
                ) : (
                  attendanceHistory.slice(0, 10).map((item) => (
                    <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                      <td className="px-8 py-6 font-body text-sm font-bold text-on-surface">
                        {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{item.sessionTitle || item.session?.title || 'Session'}</p>
                        <p className="text-[11px] text-on-surface-variant font-medium opacity-60">{item.moduleName || 'Module'}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-on-surface-variant/60 text-right">
                        {item.markedBy || item.instructorName || 'Instructor'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 px-2">
          <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest">Live synchronization active</p>
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
