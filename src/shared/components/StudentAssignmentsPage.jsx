import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';
import { studentService } from '../../api/studentService';

const StudentAssignmentsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [subsData, tasksData] = await Promise.all([
        studentService.getSubmissions(),
        studentService.getTasks()
      ]);
      setSubmissions(subsData || []);
      setTasks(tasksData || []);
    } catch (err) {
      console.error('Failed to load page data', err);
      setError('Could not load assignments and tasks.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Assignments & Tasks</h1>
          <p className="text-on-surface-variant font-medium">Track your technical milestones and submission deadlines.</p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-error/10 text-error rounded-xl text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {/* Upcoming Tasks Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-xl font-bold flex items-center gap-3 text-on-surface">
              Upcoming Tasks
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container/10 text-primary text-xs font-bold tracking-wider uppercase">
                {tasks.length} Pending
              </span>
            </h2>
          </div>
          
          {isLoading ? (
            <div className="py-10 text-center text-on-surface-variant opacity-50 font-bold">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="py-10 text-center text-on-surface-variant opacity-30 font-medium bg-surface-container-low rounded-xl">No pending tasks found.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tasks.map((task, index) => (
                <div key={task.id} className="group relative bg-surface-container-lowest p-8 rounded-xl flex flex-col gap-6 shadow-sm border border-outline-variant/10 transition-all hover:-translate-y-1 overflow-hidden">
                  {index === 0 && <div className="absolute left-0 top-0 w-1.5 h-full bg-tertiary"></div>}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className={`text-[10px] font-bold tracking-widest uppercase ${index === 0 ? 'text-tertiary' : 'text-secondary'}`}>
                        {index === 0 ? 'High Priority' : 'In Progress'}
                      </span>
                      <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors">{task.title}</h3>
                    </div>
                    <span className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">
                      {task.deadline ? `Due ${new Date(task.deadline).toLocaleDateString()}` : 'No Deadline'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Bootcamp</span>
                      <span className="text-sm font-bold text-on-surface">{task.bootcampName || 'General'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Type</span>
                      <span className="text-sm font-bold text-on-surface capitalize">{task.type || 'Task'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <Link
                      className="flex-1 py-3 px-6 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      to={`/student/assignments/submit/${task.id}?type=task`}
                    >
                      <span className="material-symbols-outlined text-sm">upload_file</span>
                      Submit Work
                    </Link>
                    <Link
                      className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm"
                      to={`/student/assignments/brief/${task.id}`}
                    >
                      View Brief
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Completed Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-xl font-bold flex items-center gap-3 text-on-surface">
              Completed Submissions
            </h2>
          </div>
          <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-20 text-center text-on-surface-variant opacity-50 font-bold">Loading submissions...</div>
              ) : submissions.length === 0 ? (
                <div className="p-20 text-center text-on-surface-variant opacity-30 font-medium">No submissions yet.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container border-none">
                      <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Assignment</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Submitted</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/50">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{sub.assignmentTitle || sub.taskTitle || 'Work'}</span>
                            <span className="text-xs text-on-surface-variant">{sub.bootcampName || 'Bootcamp'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">{new Date(sub.createdAt).toLocaleDateString()}</td>
                        <td className="px-8 py-6">
                          {sub.grade !== null ? (
                            <span className="bg-on-secondary-container/10 text-on-secondary-container px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">Graded: {sub.grade}/100</span>
                          ) : (
                            <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">Submitted</span>
                          )}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Link className="text-primary font-bold text-sm hover:underline" to={`/student/assignments/submit/${sub.id}`}>View Details</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default StudentAssignmentsPage;
