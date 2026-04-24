import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentResourcesPage = () => {
  const resources = {
    videos: [
      { id: 1, title: 'React Performance Masterclass', duration: '1h 45m', date: 'Oct 24, 2023', link: 'https://youtube.com/watch?v=example1' },
      { id: 2, title: 'System Design Patterns', duration: '2h 10m', date: 'Oct 22, 2023', link: 'https://youtube.com/watch?v=example2' },
      { id: 3, title: 'Database Optimization Workshop', duration: '1h 20m', date: 'Oct 20, 2023', link: 'https://youtube.com/watch?v=example3' },
    ],
    documents: [
      { id: 1, title: 'Project Documentation Template', type: 'Notion', link: 'https://notion.so/example1' },
      { id: 2, title: 'Advanced State Management Guide', type: 'Google Docs', link: 'https://docs.google.com/example2' },
      { id: 3, title: 'System Architecture Checklist', type: 'Notion', link: 'https://notion.so/example3' },
    ],
    handouts: [
      { id: 1, title: 'Cheat Sheet: ES6+ Syntax', date: 'Oct 15, 2023', link: '#' },
      { id: 2, title: 'Docker Quick Start Guide', date: 'Oct 12, 2023', link: '#' },
    ]
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Resources</h1>
          <p className="text-on-surface-variant font-medium">Access masterclass recordings, technical guides, and project documentation.</p>
        </header>

        <div className="space-y-16">
          {/* Videos Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                Session Recordings
              </h2>
              <Link to="/student/resources/videos" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                View All
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.videos.map((video) => (
                <div key={video.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-surface-container-high relative flex items-center justify-center group-hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant opacity-20 group-hover:scale-110 transition-transform">movie</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10">
                      <span className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined">play_arrow</span>
                      </span>
                    </div>
                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-[10px] font-bold rounded">{video.duration}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-on-surface mb-2 line-clamp-1">{video.title}</h3>
                    <p className="text-xs text-on-surface-variant mb-4">{video.date}</p>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-primary/5 text-primary text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      Watch Recording
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* External Links Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>folder_shared</span>
                External Documents
              </h2>
              <Link to="/student/resources/documents" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                View All
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.type === 'Notion' ? 'bg-black text-white' : 'bg-primary-container text-primary'}`}>
                      <span className="material-symbols-outlined">{doc.type === 'Notion' ? 'description' : 'article'}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-sm">{doc.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{doc.type}</span>
                    </div>
                  </div>
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface-container-low text-on-surface-variant rounded-xl hover:text-primary hover:bg-primary-container/10 transition-all"
                  >
                    <span className="material-symbols-outlined">link</span>
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Course Material Table */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">library_books</span>
                Course Material
              </h2>
              <Link to="/student/resources/handouts" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                View All
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container border-none">
                      <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Resource Name</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Uploaded</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/50">
                    {resources.handouts.map((handout) => (
                      <tr key={handout.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-on-surface-variant opacity-40">file_present</span>
                            <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{handout.title}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">{handout.date}</td>
                        <td className="px-8 py-6 text-right">
                          <a className="text-primary font-bold text-sm hover:underline flex items-center justify-end gap-1" href={handout.link}>
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            View Online
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentResourcesPage;
