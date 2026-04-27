import React, { useState, useEffect } from 'react';
import StudentLayout from './StudentLayout';
import { Link, useParams } from 'react-router-dom';
import { studentService } from '../../api/studentService';

const AssignmentBriefPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTaskDetails();
  }, [id]);

  const loadTaskDetails = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await studentService.getTaskDetails(id);
      setTask(data);
    } catch (err) {
      console.error('Failed to load task details', err);
      setError('Could not load task details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="p-20 text-center font-bold text-on-surface-variant opacity-50">Loading brief...</div>
      </StudentLayout>
    );
  }

  if (error || !task) {
    return (
      <StudentLayout>
        <div className="p-8 max-w-4xl mx-auto w-full">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-8" to="/student/assignments">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Assignments
          </Link>
          <div className="p-10 bg-error/10 text-error rounded-3xl font-bold flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-4xl">error</span>
            {error || 'Task not found.'}
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/student/assignments">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Assignments
          </Link>
          <div className="flex justify-between items-end gap-6">
            <div>
              <span className="text-[10px] font-bold text-tertiary tracking-widest uppercase mb-2 block">Project Brief</span>
              <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">{task.title}</h1>
            </div>
            <Link className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform whitespace-nowrap" to={`/student/assignments/submit/${id}?type=task`}>
              Start Submission
            </Link>
          </div>
        </header>

        <div className="space-y-12">
          {/* Main Description */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-6">Overview</h2>
            <div className="prose prose-slate max-w-none text-on-surface-variant leading-relaxed space-y-4">
              <p>{task.description || 'No description provided.'}</p>
              {task.instructions && (
                <div className="mt-6">
                  <h3 className="font-bold text-on-surface mb-2">Instructions</h3>
                  <p>{task.instructions}</p>
                </div>
              )}
            </div>
          </section>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Task Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Type</span>
                  <span className="text-sm font-bold text-on-surface capitalize">{task.type || 'Standard'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Bootcamp</span>
                  <span className="text-sm font-bold text-on-surface">{task.bootcampName || 'General'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Deadline</span>
                  <span className="text-sm font-bold text-tertiary">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">checklist</span>
                Submission Guidelines
              </h2>
              <div className="prose prose-sm text-on-surface-variant">
                <ul className="space-y-2">
                  <li>Ensure your code follows the style guide.</li>
                  <li>Submit a single .zip or .pdf file as required.</li>
                  <li>Include a README if additional setup is needed.</li>
                  <li>Double check all requirements before submitting.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AssignmentBriefPage;
