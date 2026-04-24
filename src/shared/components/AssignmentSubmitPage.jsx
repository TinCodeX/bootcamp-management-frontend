import React, { useState } from 'react';
import StudentLayout from './StudentLayout';
import { Link, useNavigate } from 'react-router-dom';

const AssignmentSubmitPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [submissionLink, setSubmissionLink] = useState('');
  const [linkStatus, setLinkStatus] = useState({ valid: false, message: '', type: null });

  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateLink = (url) => {
    setSubmissionLink(url);
    if (!url) {
      setLinkStatus({ valid: false, message: '', type: null });
      return;
    }

    if (url.includes('github.com')) {
      setLinkStatus({ valid: true, message: 'GitHub Repository detected', type: 'github' });
    } else if (url.includes('docs.google.com')) {
      setLinkStatus({ valid: true, message: 'Google Doc detected', type: 'gdocs' });
    } else if (url.includes('notion.site') || url.includes('notion.so')) {
      setLinkStatus({ valid: true, message: 'Notion Page detected', type: 'notion' });
    } else {
      setLinkStatus({ valid: false, message: 'Please provide a GitHub or Google Docs link', type: 'other' });
    }
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/assignments">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Assignments
          </Link>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Submit Assignment</h1>
          <p className="text-on-surface-variant font-medium">React Hooks & State Management • Fullstack Development</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Link Input Section - PRIORITY */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">link</span>
                Submission Link
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-on-surface-variant">Provide your GitHub repository, Google Docs link, or Notion workspace.</p>
                <div className="relative">
                  <input
                    type="url"
                    value={submissionLink}
                    onChange={(e) => validateLink(e.target.value)}
                    placeholder="https://github.com/your-username/project-repo"
                    className={`w-full px-6 py-4 bg-surface-container-low rounded-xl border ${linkStatus.message ? (linkStatus.valid ? 'border-primary/50' : 'border-error/50') : 'border-outline-variant/20'
                      } focus:outline-none focus:border-primary transition-colors font-body`}
                  />
                  {linkStatus.message && (
                    <div className={`mt-2 flex items-center gap-2 text-xs font-bold ${linkStatus.valid ? 'text-primary' : 'text-error'}`}>
                      <span className="material-symbols-outlined text-sm">{linkStatus.valid ? 'check_circle' : 'error'}</span>
                      {linkStatus.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* File Upload Area (Optional) */}
            <div
              className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-outline-variant/30 bg-surface-container-lowest opacity-60'
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                </div>
                <h3 className="text-sm font-bold text-on-surface">Or upload a ZIP archive</h3>
                <button className="px-6 py-2 bg-surface-container-high text-on-surface rounded-lg font-bold text-xs active:scale-95 transition-transform">
                  Browse Files
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">notes</span>
                Additional Notes (Optional)
              </h3>
              <textarea
                placeholder="Any special instructions for the instructor..."
                className="w-full h-32 px-6 py-4 bg-surface-container-low rounded-xl border border-outline-variant/20 focus:outline-none focus:border-primary transition-colors font-body resize-none"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                className={`flex-1 py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all ${linkStatus.valid ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed'
                  }`}
                disabled={!linkStatus.valid}
                onClick={() => navigate('/student/success', { state: { type: 'assignment' } })}
              >
                Submit Final Work
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <h4 className="font-bold text-on-surface mb-4">Submission Rules</h4>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-xs mt-1 text-primary">check_circle</span>
                  Links must be publicly accessible.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-xs mt-1 text-primary">check_circle</span>
                  Include a README.md if submitting GitHub.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-xs mt-1 text-primary">check_circle</span>
                  No late submissions allowed for this phase.
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-low p-6 rounded-3xl">
              <h4 className="font-bold text-on-surface mb-2">Need Help?</h4>
              <p className="text-sm text-on-surface-variant mb-4">Facing technical issues with your link?</p>
              <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
                Contact Mentor
              </button>
            </div>
          </aside>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AssignmentSubmitPage;
