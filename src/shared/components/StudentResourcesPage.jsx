import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from './StudentLayout';
import { studentService } from '../../api/studentService';

const StudentResourcesPage = () => {
  // Using a default bootcampId for now. In a real scenario, this would come from a context or URL.
  const [bootcampId, setBootcampId] = useState('65f1a2b3c4d5e6f7g8h9i012'); 
  const [resources, setResources] = useState({
    videos: [],
    documents: [],
    handouts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bootcampId) {
      fetchResources();
    }
  }, [bootcampId]);

  const fetchResources = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await studentService.getResources(bootcampId);
      
      // Categorize resources
      const categorized = {
        videos: data.filter(r => r.type === 'video'),
        documents: data.filter(r => r.type === 'document'),
        handouts: data.filter(r => r.type === 'handout')
      };
      
      setResources(categorized);
    } catch (err) {
      console.error('Failed to fetch resources', err);
      setError('Failed to load resources. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (resourceId, fileName) => {
    try {
      await studentService.downloadResource(bootcampId, resourceId, fileName);
    } catch (err) {
      alert('Download failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-8 max-w-7xl mx-auto w-full">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2 leading-tight">Resources</h1>
            <p className="text-on-surface-variant font-medium">Access masterclass recordings, technical guides, and project documentation.</p>
          </div>
          {/* Optional: Bootcamp Selector could go here */}
        </header>

        {error && (
          <div className="mb-8 p-4 bg-error/10 text-error rounded-2xl flex items-center gap-3 font-bold">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        <div className="space-y-16">
          {/* Videos Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                Session Recordings
              </h2>
            </div>
            {resources.videos.length > 0 ? (
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
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-on-surface mb-2 line-clamp-1">{video.title}</h3>
                      <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">{video.description}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-primary/5 text-primary text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-all no-underline"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        Watch Recording
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant opacity-50 italic">No video recordings available for this bootcamp.</p>
            )}
          </section>

          {/* External Links Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>folder_shared</span>
                External Documents
              </h2>
            </div>
            {resources.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface text-sm">{doc.title}</h3>
                        <p className="text-[10px] text-on-surface-variant line-clamp-1">{doc.description}</p>
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-surface-container-low text-on-surface-variant rounded-xl hover:text-primary hover:bg-primary-container/10 transition-all"
                    >
                      <span className="material-symbols-outlined">link</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant opacity-50 italic">No external documents linked.</p>
            )}
          </section>

          {/* Course Material Table */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">library_books</span>
                Course Material
              </h2>
            </div>
            {resources.handouts.length > 0 ? (
              <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container border-none">
                        <th className="px-8 py-5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Resource Name</th>
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
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => handleDownload(handout.id, handout.title)}
                              className="text-primary font-bold text-sm hover:underline flex items-center justify-end gap-1 ml-auto"
                            >
                              <span className="material-symbols-outlined text-sm">download</span>
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-on-surface-variant opacity-50 italic">No course material available for download.</p>
            )}
          </section>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentResourcesPage;
