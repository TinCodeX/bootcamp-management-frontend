import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { studentService } from '../../../api/studentService';
import { ArrowLeft, User, Layers, Calendar, BookOpen, Folder, ClipboardList, Users } from 'lucide-react';
import StudentLayout from '../../../shared/components/StudentLayout';
import { useBootcampPermissions } from '../hooks/useBootcampPermissions';

// Utility for date formatting
const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

function getTabs(isLeadInstructor) {
  const tabs = [
    { path: 'sessions', label: isLeadInstructor ? 'Manage Sessions' : 'Curriculum', icon: <BookOpen size={18} className="inline-block mr-2" /> },
    { path: 'resources', label: 'Learning Materials', icon: <Folder size={18} className="inline-block mr-2" /> },
    { path: 'assignments', label: 'My Tasks', icon: <ClipboardList size={18} className="inline-block mr-2" /> },
  ];
  if (isLeadInstructor) {
    tabs.push({ path: 'members', label: 'Members', icon: <Users size={18} className="inline-block mr-2" /> });
  }
  return tabs;
}

const getStatus = (bootcamp) => {
  if (bootcamp?.isActive) return { text: 'Ongoing', color: 'bg-primary/10 text-primary border-primary/20' };
  if (bootcamp?.startDate && new Date(bootcamp.startDate) > new Date()) return { text: 'Upcoming', color: 'bg-secondary/10 text-secondary border-secondary/20' };
  return { text: 'Archived', color: 'bg-error/10 text-error border-error/20' };
};

export default function StudentBootcampDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isLeadInstructor, loading: permLoading } = useBootcampPermissions(id);

  useEffect(() => {
    setLoading(true);
    setError('');
    studentService
      .getBootcamps()
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.bootcamps || data?.data || [];
        const found = list.find((b) => b._id === id || b.id === id);
        setBootcamp(found || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || err?.message || 'Failed to load bootcamp.');
        setLoading(false);
      });
  }, [id]);

  // Default redirect to /sessions
  if (!loading && !permLoading && !error && bootcamp && location.pathname === `/portal/bootcamps/${id}`) {
    return <Navigate to={`/portal/bootcamps/${id}/sessions`} replace />;
  }

  return (
    <StudentLayout>
      <main className="flex-1 p-4 md:p-10 max-w-6xl mx-auto w-full">
        <button
          className="flex items-center gap-2 mb-8 text-on-surface-variant hover:text-primary font-bold text-sm rounded-xl px-4 py-2 border border-vanguard-gray-100 bg-white hover:bg-vanguard-gray-50 transition"
          onClick={() => navigate('/student/dashboard')}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <section className="rounded-3xl border border-vanguard-gray-100 bg-vanguard-gray-50 p-8 mb-10 shadow-xl relative overflow-hidden">
          {/* Hero Card */}
          {loading || permLoading ? (
            <div className="animate-pulse h-32" />
          ) : error ? (
            <div className="text-error text-lg font-bold p-8">{error}</div>
          ) : !bootcamp ? (
            <div className="text-on-surface-variant text-lg font-bold p-8">Bootcamp not found.</div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="font-headline text-4xl font-black tracking-tighter text-primary mb-0">{bootcamp.name}</h1>
                {isLeadInstructor ? (
                  <span className="ml-2 px-3 py-1 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow border border-primary/40">LEAD INSTRUCTOR</span>
                ) : <span className="ml-2 px-3 py-1 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow border border-primary/40">STUDENT</span>}
              </div>
              <p className="text-on-surface-variant text-lg mb-6 max-w-2xl">{bootcamp.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <User size={22} className="text-primary" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Lead Instructor</div>
                    <div className="font-bold text-on-surface text-base">
                      {bootcamp.leadInstructor?.firstName} {bootcamp.leadInstructor?.lastName}
                    </div>
                    <div className="text-xs text-on-surface-variant">{bootcamp.leadInstructor?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Layers size={22} className="text-primary" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Division</div>
                    <div className="font-bold text-on-surface text-base">{bootcamp.division_id?.name || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={22} className="text-primary" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Schedule</div>
                    <div className="font-bold text-on-surface text-base">{formatDate(bootcamp.startDate)} - {formatDate(bootcamp.endDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl text-primary">verified</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Program Status</div>
                    <span className={`inline-block rounded-xl px-3 py-1 text-xs font-bold border ${getStatus(bootcamp).color}`}>{getStatus(bootcamp).text}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        {/* Sub-navigation */}
        {!loading && !permLoading && !error && bootcamp && (
          <nav className="flex gap-2 border-b border-vanguard-gray-100 mb-8">
            {getTabs(isLeadInstructor).map((tab) => {
              const active = location.pathname.includes(`/portal/bootcamps/${id}/${tab.path}`);
              return (
                <Link
                  key={tab.path}
                  to={`/portal/bootcamps/${id}/${tab.path}`}
                  className={`relative px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200 ${
                    active ? 'text-primary' : 'text-on-surface-variant hover:text-primary/80'
                  }`}
                  style={{ fontFamily: 'var(--font-registry, inherit)' }}
                >
                  {tab.icon}
                  {tab.label}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-0.5 h-1 rounded-full bg-primary transition-all duration-300 animate-in" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}
        {/* Content Area */}
        <section className="min-h-[300px] animate-in fade-in-0 duration-300">
          {!loading && !permLoading && !error && bootcamp && (
            <Outlet context={{ bootcampId: id, bootcamp, isLeadInstructor }} />
          )}
        </section>
      </main>
    </StudentLayout>
  );
}
