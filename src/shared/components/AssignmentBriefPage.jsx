import React from 'react';
import StudentLayout from './StudentLayout';
import { Link } from 'react-router-dom';

const AssignmentBriefPage = () => {
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
              <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">React Hooks & State Management</h1>
            </div>
            <Link className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform" to="/student/assignments/submit/1">
              Start Submission
            </Link>
          </div>
        </header>

        <div className="space-y-12">
          {/* Main Description */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-6">Overview</h2>
            <div className="prose prose-slate max-w-none text-on-surface-variant leading-relaxed space-y-4">
              <p>
                In this assignment, you will demonstrate your understanding of React's functional component ecosystem.
                The goal is to build a complex state-managed application that utilizes both built-in and custom hooks
                to handle side effects, context, and optimized rendering.
              </p>
              <p>
                You are required to implement a "Task Management System" that allows users to create, categorize, and track
                their progress on various bootcamp modules.
              </p>
            </div>
          </section>

          {/* Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">terminal</span>
                Technical Requirements
              </h2>
              <ul className="space-y-4">
                {[
                  'Implement global state using Context API or Redux Toolkit.',
                  'Use useMemo and useCallback for performance optimization.',
                  'Create at least 2 custom hooks (e.g., useLocalStorage, useAuth).',
                  'Ensure 100% responsive design using Tailwind CSS.',
                  'Handle complex form state using React Hook Form.'
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant font-medium">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">checklist</span>
                Evaluation Criteria
              </h2>
              <div className="space-y-6">
                {[
                  { label: 'Code Quality', weight: '30%', color: 'bg-primary' },
                  { label: 'UI/UX Design', weight: '25%', color: 'bg-secondary' },
                  { label: 'State Logic', weight: '30%', color: 'bg-tertiary' },
                  { label: 'Documentation', weight: '15%', color: 'bg-outline' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-on-surface">{item.label}</span>
                      <span className="text-on-surface-variant">{item.weight}</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} opacity-80`} style={{ width: item.weight }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Resources */}
          <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">folder_shared</span>
              Learning Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Official React Hooks Docs', icon: 'description' },
                { name: 'State Management Workshop Video', icon: 'play_circle' },
                { name: 'Project Boilerplate (Starter)', icon: 'download' },
                { name: 'Design Assets (Figma)', icon: 'brush' },
              ].map((res, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{res.icon}</span>
                    <span className="text-sm font-bold text-on-surface">{res.name}</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-40">open_in_new</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AssignmentBriefPage;
