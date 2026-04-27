import React, { useState, useEffect } from 'react';
import StudentLayout from './StudentLayout';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { studentService } from '../../api/studentService';

const AssignmentSubmitPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNewTask = new URLSearchParams(location.search).get('type') === 'task';
  
  const [dragActive, setDragActive] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [task, setTask] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [id, isNewTask]);

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (isNewTask) {
        const taskData = await studentService.getTaskDetails(id);
        setTask(taskData);
      } else {
        const subData = await studentService.getSubmissionDetails(id);
        setSubmission(subData);
      }
    } catch (err) {
      console.error('Failed to load data', err);
      setError('Could not load assignment details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to submit.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      if (isNewTask) {
        await studentService.submitTask(id, file);
      } else {
        await studentService.resubmitWork(id, file);
      }
      navigate('/student/assignments');
    } catch (err) {
      console.error('Submission failed', err);
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="p-20 text-center font-bold text-on-surface-variant opacity-50">Loading details...</div>
      </StudentLayout>
    );
  }

  const title = isNewTask ? task?.title : (submission?.assignmentTitle || submission?.taskTitle);
  const bootcamp = isNewTask ? task?.bootcampName : submission?.bootcampName;

  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/student/assignments">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Overview
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
              {isNewTask ? 'Submit Work' : 'Submission Details'}
            </h1>
            <p className="text-on-surface-variant font-medium">
              {title} • <span className="text-primary">{bootcamp}</span>
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-7 space-y-8">
            {error && (
              <div className="p-4 bg-error/10 text-error rounded-xl text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`relative h-64 border-2 border-dashed rounded-3xl transition-all flex flex-col items-center justify-center p-8 text-center ${
                  dragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-outline-variant/30 bg-surface-container-low'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
                
                {file ? (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-on-surface">{file.name}</p>
                    <p className="text-[10px] text-on-surface-variant font-medium opacity-60">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-on-surface">Drag and drop your file here</p>
                    <p className="text-xs text-on-surface-variant font-medium opacity-60">Supported formats: .zip, .pdf, .rar (Max 50MB)</p>
                  </div>
                )}
                
                <label
                  htmlFor="file-upload"
                  className="mt-6 px-6 py-2 bg-white text-on-surface border border-outline-variant/30 rounded-full text-xs font-bold hover:bg-surface-bright transition-colors cursor-pointer shadow-sm"
                >
                  {file ? 'Change File' : 'Browse Files'}
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !file}
                className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
              >
                {isSubmitting ? 'Uploading...' : isNewTask ? 'Submit Task' : 'Upload Revision'}
              </button>
            </form>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
                Submission Guarantee
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">
                Your submission is timestamped and secured. You can update your submission any time before the final evaluation is completed.
              </p>
            </div>
          </div>

          {/* Instructor Feedback or Meta */}
          <aside className="lg:col-span-5 space-y-6">
            {!isNewTask && submission && (
              <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
                <h2 className="text-lg font-bold text-on-surface mb-6">Status & Feedback</h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Grade</span>
                    <span className="text-2xl font-black text-primary">
                      {submission.grade !== null ? `${submission.grade}/100` : '--'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Instructor Feedback</span>
                    <div className="bg-white p-4 rounded-xl border border-outline-variant/10 text-xs text-on-surface-variant leading-relaxed min-h-[100px] italic">
                      {submission.feedback || "No feedback provided yet. Check back once your work is graded."}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
              <h2 className="text-lg font-bold text-on-surface mb-6">Need Help?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">forum</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">Community Discord</span>
                    <span className="text-[10px] text-on-surface-variant">Get instant help from peers</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">support_agent</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">Technical Support</span>
                    <span className="text-[10px] text-on-surface-variant">Submit a ticket for system issues</span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AssignmentSubmitPage;
