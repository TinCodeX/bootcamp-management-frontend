import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { adminService } from "../../../services/adminService";
import { Video, MapPin, ChevronRight, Circle, FolderOpen } from "lucide-react";

function BootcampSessions() {
  const { bootcamp } = useOutletContext();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!bootcamp?._id) return;
    setLoading(true);
    setError("");
    adminService
      .getSessions(bootcamp._id)
      .then((data) => {
        let arr = Array.isArray(data.sessions) ? data.sessions : [];
        arr = arr.map((s) => ({
          _id: s._id,
          title: s.title,
          startTime: s.startTime,
          type: s.type,
          status: s.status,
          instructor: s.instructor,
        }));
        arr.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        setSessions(arr);
      })
      .catch(() => setError("Failed to load sessions."))
      .finally(() => setLoading(false));
  }, [bootcamp?._id]);

  // Type icon helper
  const typeIcon = (type) => {
    if (type === "online") return <Video size={18} className="text-blue-500" />;
    if (type === "onPlace") return <MapPin size={18} className="text-primary" />;
    return <Circle size={18} className="text-vanguard-gray-200" />;
  };

  // Date formatting
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  };
  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  // Status badge logic
  const statusBadge = (status) => {
    if (status === "completed" || status === "done")
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
          <Circle size={10} className="mr-1 fill-green-500 text-green-500" />Done
        </span>
      );
    if (status === "cancelled")
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
          <Circle size={10} className="mr-1 fill-red-500 text-red-500" />Cancelled
        </span>
      );
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
        <Circle size={10} className="mr-1 fill-primary text-primary" />Scheduled
      </span>
    );
  };

  if (!bootcamp?._id) return <div>No bootcamp selected.</div>;
  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div className="text-error">{error}</div>;

  if (!sessions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-vanguard-gray-100 rounded-2xl bg-white">
        <FolderOpen size={40} className="mb-2 text-vanguard-gray-200" />
        <div className="text-xs font-bold text-vanguard-gray-400 mb-1">No curriculum sessions registered.</div>
        <button className="mt-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-xl hover:bg-primary/90 transition-colors">Schedule Session</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-vanguard-gray-400">Program Curriculum</span>
        <button className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-xl hover:bg-primary/90 transition-colors">Schedule Session</button>
      </div>
      <div>
        {sessions.map((session) => (
          <div
            key={session._id}
            className="flex items-center bg-white rounded-2xl border border-vanguard-gray-100 p-5 mb-3 hover:border-primary/30 transition-all cursor-pointer group"
            onClick={() => navigate(`/admin/bootcamps/${bootcamp._id}/sessions/${session._id}`)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${session.title}`}
          >
            {/* Type Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-vanguard-gray-50 mr-4">
              {typeIcon(session.type)}
            </div>
            {/* Asset Info */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-vanguard-gray-800 tracking-tight truncate">{session.title || "Untitled Session"}</div>
              <span className="inline-block mt-1 px-2 py-0.5 bg-vanguard-gray-50 text-vanguard-gray-400 text-[10px] rounded font-bold">
                {formatDate(session.startTime)} &bull; {formatTime(session.startTime)}
              </span>
            </div>
            {/* Uploader Metadata (Instructor) */}
            <div className="ml-4 flex flex-col items-end min-w-[110px]">
              <span className="text-xs text-vanguard-gray-400 font-bold">
                {session.instructor?.firstName} {session.instructor?.lastName}
              </span>
            </div>
            {/* Status Badge */}
            <div className="ml-4 w-28 flex-shrink-0 flex items-center justify-end">
              {statusBadge(session.status)}
            </div>
            {/* Chevron */}
            <div className="ml-2 flex-shrink-0">
              <ChevronRight size={16} className="inline-block align-middle text-vanguard-gray-300 group-hover:text-primary transition-colors duration-150" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BootcampSessions;
