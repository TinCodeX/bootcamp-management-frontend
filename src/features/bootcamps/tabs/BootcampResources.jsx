import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { adminService } from "../../../services/adminService";
import { FileText, PlayCircle, ExternalLink, File, Download, FolderOpen } from "lucide-react";

function BootcampResources() {
  const { bootcamp } = useOutletContext();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!bootcamp?._id) return;
    setLoading(true);
    setError("");
    adminService
      .getResources(bootcamp._id)
      .then((data) => {
        let arr = Array.isArray(data.resources) ? data.resources : [];
        arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setResources(arr);
      })
      .catch(() => setError("Failed to load resources."))
      .finally(() => setLoading(false));
  }, [bootcamp?._id]);

  // File type icon helper
  const fileTypeIcon = (type) => {
    if (!type) return <File size={18} className="text-vanguard-gray-300" />;
    if (type.toLowerCase() === "pdf") return <FileText size={18} className="text-orange-500" />;
    if (type.toLowerCase() === "video") return <PlayCircle size={18} className="text-blue-500" />;
    if (["link", "url", "web"].includes(type.toLowerCase())) return <ExternalLink size={18} className="text-green-500" />;
    return <File size={18} className="text-vanguard-gray-300" />;
  };

  // Date formatting
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  };

  // Permissions (admin: read-only)
  const canUpload = true; // TODO: Replace with real permission logic

  if (!bootcamp?._id) return <div>No bootcamp selected.</div>;
  if (loading) return <div>Loading resources...</div>;
  if (error) return <div className="text-error">{error}</div>;

  if (!resources.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-vanguard-gray-100 rounded-2xl bg-white">
        <FolderOpen size={40} className="mb-2 text-vanguard-gray-200" />
        <div className="text-xs font-bold text-vanguard-gray-400 mb-1">No resources uploaded for this bootcamp</div>
        {canUpload && (
          <button className="mt-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-xl hover:bg-primary/90 transition-colors">Upload Resource</button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-vanguard-gray-400">Program Assets</span>
        {canUpload && (
          <button className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-xl hover:bg-primary/90 transition-colors">Upload Resource</button>
        )}
      </div>
      <div>
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="flex items-center bg-white rounded-2xl border border-vanguard-gray-100 p-5 mb-3 hover:border-primary/30 transition-all cursor-pointer group"
            onClick={() => navigate(`/admin/bootcamps/${bootcamp._id}/resources/${resource._id}`)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${resource.title}`}
          >
            {/* Type Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-vanguard-gray-50 mr-4">
              {fileTypeIcon(resource.type)}
            </div>
            {/* Asset Info */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-vanguard-gray-800 tracking-tight truncate">{resource.title || "Untitled Resource"}</div>
              {resource.session && resource.session.title && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-vanguard-gray-50 text-vanguard-gray-400 text-[10px] rounded font-bold">Linked to: {resource.session.title}</span>
              )}
            </div>
            {/* Uploader Metadata */}
            <div className="ml-4 flex flex-col items-end min-w-[110px]">
              <span className="text-xs text-vanguard-gray-400 font-bold">
                {resource.uploadedBy?.firstName} {resource.uploadedBy?.lastName}
              </span>
              <span className="text-[10px] text-vanguard-gray-300">{formatDate(resource.createdAt)}</span>
            </div>
            {/* Download Stats (removed for admin read-only) */}
            {/* Direct Action (removed for admin read-only) */}
            {/* Delete Action (removed for admin read-only) */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BootcampResources;
