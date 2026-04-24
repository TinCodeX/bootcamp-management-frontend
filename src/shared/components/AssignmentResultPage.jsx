import React from 'react';
import StudentLayout from './StudentLayout';
import { Link } from 'react-router-dom';

const AssignmentResultPage = () => {
  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/assignments">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Assignments
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">Project Results</h1>
              <p className="text-on-surface-variant font-medium">UI Design Principles • Design Systems Division</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Final Score</span>
              <div className="text-5xl font-black text-primary">98<span className="text-2xl text-on-surface-variant/40">/100</span></div>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {/* Instructor Feedback */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 p-8 opacity-5">
              <span className="material-symbols-outlined text-9xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">rate_review</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">Instructor's Feedback</h2>
            </div>
            <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary">
              <p className="text-on-surface leading-relaxed italic">
                "Exceptional work on the design system architecture. Your token naming convention is industry-standard,
                and the component documentation is the best I've seen this cohort. One minor detail: ensure your shadow
                tokens are slightly more subtle in dark mode. Overall, an outstanding submission."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm opacity-60">person</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant">— Lelo Mohammed, Lead Instructor</span>
              </div>
            </div>
          </section>

          {/* Criteria Breakdown */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-8">Performance Breakdown</h2>
            <div className="space-y-8">
              {[
                { label: 'Token Architecture', score: 25, total: 25, feedback: 'Perfect implementation of semantic tokens.' },
                { label: 'Component Reusability', score: 24, total: 25, feedback: 'Highly modular. Great use of props.' },
                { label: 'Accessibility (A11y)', score: 24, total: 25, feedback: 'Contrast ratios are solid. Aria-labels added.' },
                { label: 'Visual Aesthetics', score: 25, total: 25, feedback: 'Premium look and feel. Excellent spacing.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-on-surface">{item.label}</h4>
                      <span className="text-sm font-black text-primary">{item.score}/{item.total}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(item.score / item.total) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-2">{item.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-surface-container-high text-on-surface rounded-2xl font-bold text-sm active:scale-95 transition-all">
              Request Review
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AssignmentResultPage;
