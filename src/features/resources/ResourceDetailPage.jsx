// System-consistent date/time formatting
function formatDateTime(iso) {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { ArrowLeft, FileText, User, Calendar, Download, Link2, TrendingUp } from "lucide-react";
import { ENDPOINTS } from "../../api/endpoints";
import axiosInstance from "../../api/axiosInstance";

const TYPE_COLORS = {
  PDF: "bg-red-100 text-red-700",
  Video: "bg-blue-100 text-blue-700",
  Default: "bg-vanguard-gray-100 text-vanguard-gray-500"
};

const TYPE_ICONS = {
  PDF: FileText,
  Video: Link2,
  Default: FileText
};

function ResourceDetailPage() {
  const { id, resourceId } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !resourceId) return;
    setLoading(true);
    setError("");
    axiosInstance.get(ENDPOINTS.RESOURCES.DETAIL(id, resourceId))
      .then(res => setResource(res.data.resource))
      .catch(() => setError("Failed to load resource details."))
      .finally(() => setLoading(false));
  }, [id, resourceId]);

  const handleDownload = () => {
    if (resource?.url) window.open(resource.url, '_blank', 'noopener,noreferrer');
  };
  const handleCopyLink = () => {
    if (resource?.url) navigator.clipboard.writeText(resource.url);
  };

  const type = resource?.type || "Default";
  const TypeIcon = TYPE_ICONS[type] || TYPE_ICONS.Default;
  const typeColor = TYPE_COLORS[type] || TYPE_COLORS.Default;

  // Skeleton
  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
          <div className="bg-vanguard-gray-50 rounded-3xl border border-vanguard-gray-100 h-96 flex flex-col items-center justify-center" />
          <div className="space-y-6">
            <div className="h-24 bg-vanguard-gray-50 rounded-3xl border border-vanguard-gray-100" />
            <div className="h-24 bg-vanguard-gray-50 rounded-3xl border border-vanguard-gray-100" />
            <div className="h-20 bg-vanguard-gray-50 rounded-3xl border border-vanguard-gray-100" />
          </div>
        </div>
      </AdminLayout>
    );
  }
  if (error) return <AdminLayout><div className="max-w-5xl mx-auto mt-12 text-error">{error}</div></AdminLayout>;
  if (!resource) return <AdminLayout><div className="max-w-5xl mx-auto mt-12 text-vanguard-gray-400">No resource found.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-12">
        {/* Header */}
        <div className="flex items-center mb-10 gap-8">
          <button
            className="mr-8 flex items-center text-vanguard-gray-400 hover:text-primary font-black text-xs uppercase tracking-[0.2em]"
            onClick={() => navigate(`/admin/bootcamps/${id}/resources`)}
          >
            <ArrowLeft className="mr-2" size={20} /> Back to Library
          </button>
          <h1 className="text-4xl font-black tracking-tighter text-vanguard-gray-800 flex-1">{resource.title}</h1>
          <span className={`inline-block px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase ${typeColor}`}>{type}</span>
        </div>
        {/* Main Content */}
        <div className="space-y-8">
          {/* Association Card */}
          <div className="bg-vanguard-gray-50 rounded-3xl border border-vanguard-gray-100 p-6 flex items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Linked Session</div>
              <div className="font-bold text-vanguard-gray-800 text-lg">{resource?.session?.title || "N/A"}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-2 mb-1">Division</div>
              <div className="font-bold text-vanguard-gray-800 text-sm">{resource?.division?.name || "N/A"}</div>
            </div>
          </div>
          {/* Uploader Card */}
          <div className="bg-vanguard-gray-50 rounded-3xl border border-vanguard-gray-100 p-6 flex items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Uploaded By</div>
              <div className="font-bold text-vanguard-gray-800 text-lg">{resource?.uploadedBy?.firstName} {resource?.uploadedBy?.lastName}</div>
              <div className="text-xs text-vanguard-gray-400 font-bold">{resource?.uploadedBy?.email}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-2 mb-1">Uploaded</div>
                <div className="text-xs text-vanguard-gray-400 font-bold">{formatDateTime(resource?.createdAt)}</div>
            </div>
          </div>
          {/* Stats Card */}
          <div className="bg-vanguard-gray-50 rounded-3xl border border-vanguard-gray-100 p-6 flex items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Total Downloads</div>
              <div className="font-bold text-vanguard-gray-800 text-2xl">{resource?.downloadCount ?? 0}</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ResourceDetailPage;
