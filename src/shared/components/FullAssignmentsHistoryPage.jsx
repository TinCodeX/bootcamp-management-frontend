import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';
import { studentService } from '../../api/studentService';

const FullAssignmentsHistoryPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await studentService.getSubmissions();
      setSubmissions(data || []);
    } catch (err) {
      console.error('Failed to load submissions', err);
      setError('Could not load your submissions.');
    } finally {
      setIsLoading(false);
    }
  };

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

        {error && (
          <div className="mb-8 p-4 bg-error/10 text-error rounded-xl text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-20 text-center text-on-surface-variant opacity-50 font-bold">Loading history...</div>
            ) : submissions.length === 0 ? (
              <div className="p-20 text-center text-on-surface-variant opacity-30 font-medium">No submissions found.</div>
            ) : (
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
                  {submissions.map((item) => (
                    <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{item.assignmentTitle || 'Assignment'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{item.bootcampName || 'Bootcamp'}</td>
                      <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.grade !== null ? 'bg-on-secondary-container/10 text-on-secondary-container' : 'bg-secondary-container/20 text-secondary'}`}>
                          {item.grade !== null ? `Graded: ${item.grade}/100` : 'Submitted'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link className="text-primary font-bold text-sm hover:underline" to={`/student/assignments/submit/${item.id}`}>
                          {item.grade !== null ? 'View Result' : 'View Submission'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default FullAssignmentsHistoryPage;
