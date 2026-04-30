import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { studentService } from '../../../api/studentService';
import { Plus, ChevronRight, Video, MapPin, Link2 } from 'lucide-react';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
}

function formatTimeRange(start, end) {
  const opts = { hour: '2-digit', minute: '2-digit', hour12: true };
  return `${new Date(start).toLocaleTimeString('en-US', opts)} - ${new Date(end).toLocaleTimeString('en-US', opts)}`;
}

export default function StudentBootcampSessions() {
  const navigate = useNavigate();
  const { bootcampId, isLeadInstructor } = useOutletContext();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true);
      setError('');
      try {
        const data = await studentService.getSessions(bootcampId);
        setSessions(Array.isArray(data?.sessions) ? data.sessions : []);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || 'Failed to load sessions.');
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, [bootcampId]);

  // Sort sessions chronologically
  const sortedSessions = [...sessions].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4">
      {/* Tab Header */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-vanguard-gray-400">Program Curriculum</span>
        {isLeadInstructor && (
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all text-xs font-bold shadow-sm" onClick={() => {/* schedule session logic */}}>
            <Plus className="w-4 h-4" />
            Schedule Session
          </button>
        )}
      </div>

      {/* Empty State */}
      {!loading && sortedSessions.length === 0 && (
        <div className="border-2 border-dashed border-vanguard-gray-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center bg-vanguard-gray-50">
          <span className="material-symbols-outlined text-5xl mb-4 opacity-20">event_busy</span>
          <div className="font-black text-vanguard-gray-400 mb-2">No sessions scheduled.</div>
          {isLeadInstructor && <div className="text-xs text-vanguard-gray-400">Click 'Schedule Session' to begin.</div>}
        </div>
      )}

      {/* Error State */}
      {error && <div className="text-error bg-error/10 p-4 rounded-xl border border-error/20 mb-4">{error}</div>}

      {/* Sessions List */}
      <div>
        {sortedSessions.map((session) => {
          const isOnline = session.type === 'online';
          const isOnPlace = session.type === 'onPlace';
          return (
            <div
              key={session._id}
              className={`flex items-center bg-white rounded-2xl border p-6 mb-4 hover:border-primary/40 transition-all ${isLeadInstructor ? 'border-l-4 border-primary/60' : 'border-vanguard-gray-100'}`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/portal/bootcamps/${bootcampId}/sessions/${session._id}`)}
            >
              {/* Column 1: Date & Time */}
              <div className="w-24 flex flex-col items-start mr-6">
                <div className="font-black text-sm text-vanguard-gray-800">{formatDate(session.startTime)}</div>
                <div className="text-[10px] opacity-40 font-bold">{formatTimeRange(session.startTime, session.endTime)}</div>
              </div>
              {/* Column 2: Type Icon */}
              <div className="w-12 flex items-center justify-center mr-6">
                {isOnline && <Video className="w-6 h-6 text-primary" />}
                {isOnPlace && <MapPin className="w-6 h-6 text-primary" />}
              </div>
              {/* Column 3: Lesson Title & Status */}
              <div className="flex-1 min-w-0 mr-6">
                <div className="font-bold text-vanguard-gray-800 tracking-tight truncate">{session.title}</div>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${session.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>{session.status}</span>
              </div>
              {/* Column 4: Contextual Link/Location */}
              <div className="w-40 flex items-center mr-6">
                {isOnline ? (
                  <a href={session.meetingLink || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold">
                    <Link2 className="w-4 h-4" /> Join Meeting
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-vanguard-gray-50 text-vanguard-gray-800 border border-vanguard-gray-100 text-xs font-semibold">
                    {session.location || 'TBA'}
                  </span>
                )}
              </div>
              {/* Column 5: Chevron Navigation */}
              <div className="w-8 flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-vanguard-gray-400" />
              </div>
              {/* Management Mode Accent */}
              {isLeadInstructor && <span className="ml-2 px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">Manage</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
