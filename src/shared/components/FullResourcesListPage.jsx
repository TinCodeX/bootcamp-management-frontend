import React from 'react';
import { useParams, Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const FullResourcesListPage = () => {
  const { type } = useParams();

  const allResources = {
    videos: [
      { id: 1, title: 'React Performance Masterclass', duration: '1h 45m', date: 'Oct 24, 2023', link: '#' },
      { id: 2, title: 'System Design Patterns', duration: '2h 10m', date: 'Oct 22, 2023', link: '#' },
      { id: 3, title: 'Database Optimization Workshop', duration: '1h 20m', date: 'Oct 20, 2023', link: '#' },
      { id: 4, title: 'Node.js Event Loop Deep Dive', duration: '1h 30m', date: 'Oct 18, 2023', link: '#' },
      { id: 5, title: 'CSS Grid & Flexbox Mastery', duration: '1h 15m', date: 'Oct 15, 2023', link: '#' },
    ],
    documents: [
      { id: 1, title: 'Project Documentation Template', platform: 'Notion', date: 'Oct 24, 2023', link: '#' },
      { id: 2, title: 'Advanced State Management Guide', platform: 'Google Docs', date: 'Oct 22, 2023', link: '#' },
      { id: 3, title: 'System Architecture Checklist', platform: 'Notion', date: 'Oct 20, 2023', link: '#' },
      { id: 4, title: 'API Security Best Practices', platform: 'Notion', date: 'Oct 18, 2023', link: '#' },
      { id: 5, title: 'Deployment Workflow Guide', platform: 'Google Docs', date: 'Oct 15, 2023', link: '#' },
    ],
    handouts: [
      { id: 1, title: 'Cheat Sheet: ES6+ Syntax', date: 'Oct 15, 2023', link: '#' },
      { id: 2, title: 'Docker Quick Start Guide', date: 'Oct 12, 2023', link: '#' },
      { id: 3, title: 'Git Flow Reference Card', date: 'Oct 10, 2023', link: '#' },
      { id: 4, title: 'Markdown Syntax Guide', date: 'Oct 08, 2023', link: '#' },
    ]
  };

  const currentResources = allResources[type] || [];
  const titles = {
    videos: 'Session Recordings',
    documents: 'Technical Documents',
    handouts: 'Course Handouts'
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <Link className="flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-4" to="/student/resources">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Overview
          </Link>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">
            All {titles[type] || 'Resources'}
          </h1>
          <p className="text-on-surface-variant font-medium opacity-70">Browse the complete collection of {type} for your bootcamp.</p>
        </header>

        <div className="bg-surface-container-low rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Title</th>
                {type === 'videos' && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Duration</th>}
                {type === 'documents' && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Platform</th>}
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/30">
              {currentResources.map((item) => (
                <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <span className="material-symbols-outlined">
                          {type === 'videos' ? 'play_circle' : type === 'documents' ? 'article' : 'description'}
                        </span>
                      </div>
                      <span className="font-bold text-on-surface">{item.title}</span>
                    </div>
                  </td>
                  {type === 'videos' && <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{item.duration}</td>}
                  {type === 'documents' && <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{item.platform}</td>}
                  <td className="px-8 py-6 text-sm font-bold text-on-surface-variant">{item.date}</td>
                  <td className="px-8 py-6 text-right">
                    <a href={item.link} className="text-primary font-black text-sm hover:underline">Access</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default FullResourcesListPage;
