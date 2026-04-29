import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminService } from "../../services/adminService";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { ArrowLeft, MapPin, Video, User } from "lucide-react";

function SessionDetailPage() {
  const { id, sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !sessionId) return;
    setLoading(true);
    setError("");
    adminService
      .getSessionById(id, sessionId)
      .then((data) => setSession(data.session))
      .catch(() => setError("Failed to load session details."))
      .finally(() => setLoading(false));
  }, [id, sessionId]);

  // Status badge
  const statusBadge = (status) => {
    if (status === "Completed" )
      return <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black tracking-widest uppercase"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Completed</span>;
    if (status === "Cancelled")
      return <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black tracking-widest uppercase"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Cancelled</span>;
    return <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Scheduled</span>;
  };

  // Date/time helpers
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  };
  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };
  const getDuration = (start, end) => {
    if (!start || !end) return null;
    const ms = new Date(end) - new Date(start);
    if (ms <= 0) return null;
    const min = Math.floor(ms / 60000);
    const hr = Math.floor(min / 60);
    const minLeft = min % 60;
    return hr ? `${hr}h ${minLeft}m` : `${minLeft}m`;
  };

  // Skeleton loader
  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto mt-10 animate-pulse">
          <div className="h-8 w-1/3 bg-vanguard-gray-100 rounded mb-6" />
          <div className="flex gap-8">
            <div className="flex-1 space-y-4">
              <div className="h-24 bg-vanguard-gray-100 rounded-3xl" />
              <div className="h-24 bg-vanguard-gray-100 rounded-3xl" />
            </div>
            <div className="w-72 space-y-4">
              <div className="h-32 bg-vanguard-gray-100 rounded-3xl" />
            </div>
          </div>
          <div className="h-4 w-1/4 bg-vanguard-gray-100 rounded mt-8" />
        </div>
      </AdminLayout>
    );
  }
  if (error) return <AdminLayout><div className="max-w-4xl mx-auto mt-10 text-error">{error}</div></AdminLayout>;
  if (!session) return <AdminLayout><div className="max-w-4xl mx-auto mt-10 text-vanguard-gray-400">No session found.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-10">
        {/* Header */}
        <div className="flex items-center mb-8 gap-10">
          <button
            className="mr-10 flex items-center text-vanguard-gray-400 hover:text-primary font-black text-xs uppercase tracking-[0.2em]"
            onClick={() => navigate(`/admin/bootcamps/${id}/sessions`)}
          >
            <ArrowLeft className="mr-3" size={22} /> Back to Bootcamp
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-10">
              <h1 className="text-4xl font-black tracking-tighter text-vanguard-gray-800 mb-0">{session.title || "Untitled Session"}</h1>
              {statusBadge(session.status)}
            </div>
          </div>
        </div>
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* When & Where */}
          <div className="space-y-5">
            <div className="rounded-3xl bg-vanguard-gray-50 p-6 border border-vanguard-gray-100">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Schedule</div>
              <div className="font-black text-lg text-vanguard-gray-800 mb-1">{formatDate(session.startTime)}</div>
              <div className="text-sm text-vanguard-gray-400 font-bold">
                {formatTime(session.startTime)} - {formatTime(session.endTime)}
                {getDuration(session.startTime, session.endTime) && (
                  <span className="ml-2 text-vanguard-gray-300">({getDuration(session.startTime, session.endTime)})</span>
                )}
              </div>
            </div>
            <div className="rounded-3xl bg-vanguard-gray-50 p-6 border border-vanguard-gray-100 flex items-center">
              {session.type === "onPlace" ? (
                <MapPin className="mr-3 text-primary" size={22} />
              ) : (
                <Video className="mr-3 text-blue-500" size={22} />
              )}
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">{session.type === "onPlace" ? "Physical Location" : "Virtual Bridge"}</div>
                <div className="font-bold text-vanguard-gray-800">
                  {session.type === "onPlace" ? (session.location || <span className="text-vanguard-gray-300">N/A</span>) : (
                    session.link ? <a href={session.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Join Here</a> : <span className="text-vanguard-gray-300">N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Who */}
          <div className="space-y-5">
            <div className="rounded-3xl bg-vanguard-gray-50 p-6 border border-vanguard-gray-100 flex items-center">
              {/* Enhanced avatar */}
              <div className="w-16 h-16 rounded-full bg-primary/10 shadow-sm flex items-center justify-center text-2xl font-black text-primary mr-6 relative">
                {session.instructor?.firstName || session.instructor?.lastName ? (
                  <span>
                    {session.instructor?.firstName?.[0] || ""}
                    {session.instructor?.lastName?.[0] || ""}
                  </span>
                ) : (
                  <User className="w-7 h-7 text-vanguard-gray-300" />
                )}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Instructor</div>
                <div className="font-black text-lg text-vanguard-gray-800">
                  {session.instructor?.firstName} {session.instructor?.lastName}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Metadata */}
        <div className="text-xs text-vanguard-gray-300 font-bold mt-8">
          Created: {formatDate(session.createdAt)} &middot; Last Updated: {formatDate(session.updatedAt)}
        </div>
      </div>
    </AdminLayout>
  );
}

export default SessionDetailPage;
