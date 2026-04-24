import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentFeedbackPage = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('Bootcamp');
  const [anonymous, setAnonymous] = useState(false);
  const [comments, setComments] = useState('');

  const pastFeedback = [
    { id: 1, date: 'Oct 24, 2023', subject: 'Instructor', status: 'Reviewed', color: 'bg-secondary-fixed text-on-secondary-fixed-variant' },
    { id: 2, date: 'Oct 20, 2023', subject: 'Bootcamp', status: 'Received', color: 'bg-surface-container text-on-surface-variant' },
    { id: 3, date: 'Oct 12, 2023', subject: 'Assignment', status: 'Reviewed', color: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
  ];

  return (
    <StudentLayout>
      <div className="p-8 max-w-3xl mx-auto w-full space-y-12 pb-20">
        {/* Hero Header */}
        <section className="space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-black">Academic Quality</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline leading-tight">Continuous Improvement</h2>
          <p className="text-on-surface-variant font-medium opacity-70">Your perspective shapes the curriculum. Share honest, constructive feedback to help us evolve the bootcamp experience.</p>
        </section>

        {/* Feedback Form Card */}
        <div className="bg-surface-container-lowest rounded-[2rem] p-10 shadow-sm border border-outline-variant/10">
          <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); navigate('/student/success', { state: { type: 'feedback' } }); }}>
            {/* Subject Selector */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Feedback Subject</label>
              <div className="flex flex-wrap gap-3">
                {['Division', 'Bootcamp', 'Instructor', 'Assignment'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${subject === s
                      ? 'bg-primary text-on-primary shadow-md scale-105'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    type="button"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Context Dropdown */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Context</label>
              <select className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-on-surface">
                <option disabled defaultValue>Select subject specific context</option>
                <option>Main Curriculum Flow</option>
                <option>Technical Infrastructure</option>
                <option>Community Engagement</option>
                <option>Instructional Style</option>
              </select>
            </div>

            {/* Ratings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Overall Satisfaction</label>
                <div className="flex gap-2 text-primary">
                  {[1, 2, 3, 4].map(i => <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                  <span className="material-symbols-outlined text-outline-variant">star</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Content Clarity</label>
                <div className="flex gap-2 text-primary">
                  {[1, 2, 3].map(i => <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                  {[1, 2].map(i => <span key={i} className="material-symbols-outlined text-outline-variant">star</span>)}
                </div>
              </div>
            </div>

            {/* Text Areas */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">One-word summary</label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all text-on-surface placeholder:opacity-30"
                  placeholder="e.g. Challenging, Insightful..."
                  type="text"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Detailed Comments</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all text-on-surface placeholder:opacity-30 min-h-[120px]"
                  placeholder="What worked well? What could be improved?"
                ></textarea>
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Submit Anonymously</p>
                  <p className="text-[11px] font-medium text-on-surface-variant/60">Hide your identity from instructors</p>
                </div>
              </div>
              <button
                onClick={() => setAnonymous(!anonymous)}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 flex items-center px-1 ${anonymous ? 'bg-primary' : 'bg-outline-variant'}`}
                type="button"
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${anonymous ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {/* CTA */}
            <button 
              className={`w-full font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] ${
                comments.trim() 
                ? 'bg-primary hover:bg-primary/90 text-on-primary shadow-primary/20' 
                : 'bg-surface-container-high text-on-surface-variant/40 opacity-50 cursor-not-allowed shadow-none'
              }`} 
              type="submit"
              disabled={!comments.trim()}
            >
              <span>Submit Feedback</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>

        {/* History Section */}
        <section className="space-y-8 pt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-extrabold tracking-tight text-on-surface font-headline">My Past Feedback</h3>
            <div className="h-[1px] flex-1 bg-outline-variant/20 mx-6"></div>
          </div>
          <div className="bg-surface-container-low/30 rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Date</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Subject</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/30">
                {pastFeedback.map((item) => (
                  <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                    <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{item.date}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                        {item.subject}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.status === 'Reviewed' ? 'bg-secondary' : 'bg-outline-variant'}`}></span>
                        <span className={`text-sm font-bold ${item.status === 'Reviewed' ? 'text-secondary' : 'text-on-surface-variant/40'}`}>
                          {item.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default StudentFeedbackPage;
