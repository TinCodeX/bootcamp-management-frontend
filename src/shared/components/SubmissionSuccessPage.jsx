import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const SubmissionSuccessPage = () => {
  const location = useLocation();
  const type = location.state?.type || 'Submission';

  const content = {
    assignment: {
      title: 'Assignment Submitted!',
      message: 'Your project has been successfully uploaded. The instructors will review it shortly.',
      backPath: '/student/assignments',
      backText: 'Back to Assignments'
    },
    feedback: {
      title: 'Feedback Received!',
      message: 'Thank you for your valuable input. We use your feedback to improve the bootcamp experience.',
      backPath: '/student/feedback',
      backText: 'Give More Feedback'
    },
    default: {
      title: 'Success!',
      message: 'Your submission was successful.',
      backPath: '/student/dashboard',
      backText: 'Return to Dashboard'
    }
  };

  const currentContent = content[type] || content.default;

  return (
    <StudentLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center">
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
            <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-white text-sm">celebration</span>
          </div>
        </div>

        <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-4 tracking-tight">
          {currentContent.title}
        </h1>
        <p className="text-on-surface-variant font-medium max-w-md mb-12 opacity-80 leading-relaxed">
          {currentContent.message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            to={currentContent.backPath}
            className="flex-1 py-4 bg-primary text-on-primary font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95"
          >
            {currentContent.backText}
          </Link>
          <Link
            to="/student/dashboard"
            className="flex-1 py-4 bg-surface-container-high text-on-surface font-black rounded-2xl hover:bg-surface-container-highest transition-all active:scale-95"
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/10 w-full max-w-md">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">
            System confirmation ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </StudentLayout>
  );
};

export default SubmissionSuccessPage;
