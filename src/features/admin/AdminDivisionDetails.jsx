import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput, Section, StatGrid } from "../../shared/components/admin/AdminUI";
import { adminService } from "../../services/adminService";
import toast from "react-hot-toast";

function extractDivisionId(bootcamp) {
  if (!bootcamp?.division_id) return "";
  if (typeof bootcamp.division_id === "object") return bootcamp.division_id._id || "";
  return bootcamp.division_id;
}

function asList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function AdminDivisionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [division, setDivision] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [bootcamps, setBootcamps] = useState([]);
  
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [divRes, statRes, bootcampsRes] = await Promise.all([
        adminService.getDivisionById(id),
        adminService.getDivisionStatistics(id).catch(() => ({ data: {} })), // Fallback if statistics endpoint fails
        adminService.getBootcamps({ limit: 500 }),
      ]);

      const divData = divRes?.data || divRes || {};
      setDivision(divData);
      setEditName(divData?.name || "");
      setEditDescription(divData?.description || "");
      
      const stats = statRes?.data || statRes || {};
      setStatistics(stats);

      const allBootcamps = asList(bootcampsRes);
      const divisionBootcamps = allBootcamps.filter((b) => extractDivisionId(b) === id);
      setBootcamps(divisionBootcamps);

    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load division details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  const onUpdateDivision = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateDivision(id, { name: editName, description: editDescription });
      toast.success("Division updated successfully");
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update division.");
    }
  };

  const onToggleBootcamp = async (bootcamp) => {
    const bootcampId = bootcamp?._id || bootcamp?.id;
    if (!bootcampId) return;
    try {
      if (bootcamp?.isActive !== false) {
        await adminService.deactivateBootcamp(bootcampId);
      } else {
        await adminService.updateBootcamp(bootcampId, { isActive: true });
      }
      toast.success(`Bootcamp successfully ${bootcamp?.isActive !== false ? "archived" : "activated"}`);
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to toggle bootcamp status.");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Division Details" subtitle="Loading division information...">
        <div className="p-8 text-center text-sm font-medium animate-pulse">Loading division details...</div>
      </AdminLayout>
    );
  }

  const statItems = [
    { label: "Total Bootcamps", value: statistics?.totalBootcamps || 0 },
    { label: "Active Students", value: statistics?.activeStudents || 0 },
    { label: "Total Instructors", value: statistics?.totalInstructors || 0 },
  ];

  return (
    <AdminLayout title="Division Details" subtitle="Manage division info, view statistics, and oversee associated bootcamps.">
      <div className="space-y-8">
        <div className="flex gap-4 items-center">
           <AdminButton variant="ghost" onClick={() => navigate('/admin/divisions')}>&larr; Back to Divisions</AdminButton>
        </div>

        {error && <p className="text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20 mb-8">{error}</p>}

        <Section title="Division Statistics" description="Overview of the activity within this division.">
          <StatGrid items={statItems} />
        </Section>

        <Section title="Division Configuration" description="Update the core details of this division.">
          <form onSubmit={onUpdateDivision} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Division Name</label>
                <div className="mt-2">
                  <AdminInput value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Division Name" required />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Description</label>
              <div className="mt-2">
                <textarea
                  className="w-full rounded-xl border border-outline-variant/40 bg-surface/60 px-4 py-3 text-sm outline-none transition-all duration-300 focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-outline-variant/80 placeholder:text-on-surface-variant/50 resize-none"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Division Description"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <AdminButton type="submit">Update Division</AdminButton>
            </div>
          </form>
        </Section>

        <Section title="Associated Bootcamps" description="Bootcamps currently assigned to this division.">
          <div className="mt-4 overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-surface-container/50 text-left text-[11px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {bootcamps.map((bootcamp) => (
                  <tr className="transition-colors hover:bg-surface-container-low/30" key={bootcamp?._id || bootcamp?.id}>
                    <td className="p-4 pl-6 align-middle">
                      <p className="font-bold text-base">{bootcamp?.name || "Unnamed Bootcamp"}</p>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-1 max-w-sm">{bootcamp?.description || "No description"}</p>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                          bootcamp?.isActive === false ? "bg-error/10 text-error border border-error/20" : "bg-primary/10 text-primary border border-primary/20"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${bootcamp?.isActive === false ? "bg-error" : "bg-primary animate-pulse"}`} />
                        {bootcamp?.isActive === false ? "Archived" : "Active"}
                      </span>
                    </td>
                    <td className="p-4 pr-6 align-middle">
                      <div className="flex justify-end gap-2">
                        <AdminButton variant="ghost" onClick={() => navigate('/admin/bootcamps')}>View</AdminButton>
                        <AdminButton variant="secondary" onClick={() => onToggleBootcamp(bootcamp)}>
                          {bootcamp?.isActive === false ? "Activate" : "Archive"}
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bootcamps.length === 0 ? <p className="p-8 text-center text-sm text-on-surface-variant font-medium">No bootcamps assigned to this division.</p> : null}
          </div>
        </Section>
      </div>
    </AdminLayout>
  );
}

export default AdminDivisionDetails;
