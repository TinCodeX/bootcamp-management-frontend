import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput, AdminSelect } from "../../shared/components/admin/AdminUI";
import { adminService } from "../../services/adminService";

function asList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function extractDivisionId(bootcamp) {
  if (!bootcamp?.division_id) return "";
  if (typeof bootcamp.division_id === "object") return bootcamp.division_id._id || "";
  return bootcamp.division_id;
}

function AdminBootcamps() {
  const [bootcamps, setBootcamps] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [leadInstructorId, setLeadInstructorId] = useState("");
  const [editId, setEditId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const [bootcampsRes, divisionsRes, usersRes] = await Promise.all([
        adminService.getBootcamps({ limit: 200 }),
        adminService.getDivisions({ limit: 200 }),
        adminService.getUsers({ limit: 1000 }).catch(() => ({ data: [] })),
      ]);
      setBootcamps(asList(bootcampsRes));
      const divisionItems = asList(divisionsRes);
      setDivisions(divisionItems);
      
      const allUsers = asList(usersRes);
      setInstructors(allUsers.filter(u => String(u?.role || "").toLowerCase() === "instructor"));

      if (!divisionId && divisionItems[0]?._id) setDivisionId(divisionItems[0]._id);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load bootcamps.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditId("");
    setName("");
    setDescription("");
    setLeadInstructorId("");
    setDrawerOpen(true);
  };

  const openEdit = (item) => {
    setEditId(item?._id || item?.id || "");
    setName(item?.name || "");
    setDescription(item?.description || "");
    setDivisionId(extractDivisionId(item) || "");
    setLeadInstructorId(""); // Note: Could pre-fill if API returns lead instructor
    setDrawerOpen(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    try {
      let savedBootcampId = editId;
      if (editId) {
        await adminService.updateBootcamp(editId, {
          name: name.trim(),
          description: description.trim(),
          division_id: divisionId || undefined,
        });
      } else {
        const res = await adminService.createBootcamp({
          name: name.trim(),
          description: description.trim(),
          division_id: divisionId || undefined,
        });
        savedBootcampId = res?._id || res?.id || res?.data?._id;
      }
      
      if (savedBootcampId && leadInstructorId) {
        try {
          await adminService.assignBootcampLead(savedBootcampId, leadInstructorId);
        } catch (assignErr) {
          console.error("Failed to assign lead instructor:", assignErr);
          // Don't completely fail bootcamp creation just because assign failed
        }
      }

      setDrawerOpen(false);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to save bootcamp.");
    }
  };

  const onArchiveToggle = async (item) => {
    const id = item?._id || item?.id;
    if (!id) return;
    try {
      if (item?.isActive !== false) {
        await adminService.deactivateBootcamp(id);
      } else {
        await adminService.updateBootcamp(id, { isActive: true });
      }
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update bootcamp.");
    }
  };

  const onDelete = async (item) => {
    const id = item?._id || item?.id;
    if (!id) return;
    if (!window.confirm("Are you sure you want to permanently delete this bootcamp?")) return;
    try {
      await adminService.deleteBootcamp(id);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to delete bootcamp.");
    }
  };

  const filteredBootcamps = useMemo(() => {
    return bootcamps.filter((item) => {
      const matchesName = !nameFilter.trim() || String(item?.name || "").toLowerCase().includes(nameFilter.trim().toLowerCase());
      const itemDivisionId = extractDivisionId(item) || "";
      const matchesDivision = divisionFilter === "all" || itemDivisionId === divisionFilter;
      const statusText = item?.isActive === false ? "Archived" : "Active";
      const matchesStatus = statusFilter === "all" || statusText === statusFilter;
      return matchesName && matchesDivision && matchesStatus;
    });
  }, [bootcamps, divisionFilter, nameFilter, statusFilter]);

  return (
    <AdminLayout title="Bootcamp Management" subtitle="Create bootcamps and control active/archived state.">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-gradient-to-br from-surface-container-low/80 to-surface/40 backdrop-blur-2xl p-8 shadow-xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="flex flex-wrap items-end justify-between gap-4 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-secondary font-bold">Admin Hub</p>
              <h2 className="text-4xl font-black mt-2 tracking-tight">Bootcamps</h2>
              <p className="text-base text-on-surface-variant mt-2 max-w-2xl">
                Manage cohort lifecycle, map each cohort to the right division, and quickly archive inactive programs.
              </p>
            </div>
            <AdminButton className="rounded-full shadow-lg shadow-primary/20 hover:-translate-y-1" onClick={openCreate}>
              + New Bootcamp
            </AdminButton>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3 relative z-10">
            <div className="group rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-surface hover:shadow-md hover:border-primary/30">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Total Bootcamps</p>
              <p className="text-4xl font-black mt-2 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">{bootcamps.length}</p>
            </div>
            <div className="group rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-surface hover:shadow-md hover:border-primary/30">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Active Cohorts</p>
              <p className="text-4xl font-black mt-2 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">{bootcamps.filter((item) => item?.isActive !== false).length}</p>
            </div>
            <div className="group rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-surface hover:shadow-md hover:border-primary/30">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Archived</p>
              <p className="text-4xl font-black mt-2 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">{bootcamps.filter((item) => item?.isActive === false).length}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3 relative z-10">
            <AdminInput onChange={(e) => setNameFilter(e.target.value)} placeholder="Search bootcamp name" value={nameFilter} />
            <AdminSelect onChange={(e) => setDivisionFilter(e.target.value)} value={divisionFilter}>
              <option value="all">All divisions</option>
              {divisions.map((division) => (
                <option key={division?._id || division?.id} value={division?._id || division?.id}>
                  {division?.name || "Unnamed Division"}
                </option>
              ))}
            </AdminSelect>
            <AdminSelect onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </AdminSelect>
          </div>
          {error && <p className="text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20 mt-4">{error}</p>}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-surface-container/50 text-left text-[11px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Division</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredBootcamps.map((item) => {
                  const id = item?._id || item?.id;
                  const relatedDivision = divisions.find((division) => (division?._id || division?.id) === extractDivisionId(item));
                  return (
                    <tr className="transition-colors hover:bg-surface-container-low/30" key={id}>
                      <td className="p-4 pl-6 align-middle">
                        <p className="font-bold text-base">{item?.name || "Unnamed Bootcamp"}</p>
                        <p className="text-xs text-on-surface-variant mt-1 line-clamp-1 max-w-sm">{item?.description || "No description"}</p>
                      </td>
                      <td className="p-4 align-middle text-on-surface-variant font-medium">
                        <span className="bg-surface-container px-3 py-1 rounded-lg text-xs border border-outline-variant/20">
                          {relatedDivision?.name || extractDivisionId(item) || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            item?.isActive === false ? "bg-error/10 text-error border border-error/20" : "bg-primary/10 text-primary border border-primary/20"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item?.isActive === false ? "bg-error" : "bg-primary animate-pulse"}`} />
                          {item?.isActive === false ? "Archived" : "Active"}
                        </span>
                      </td>
                      <td className="p-4 pr-6 align-middle">
                        <div className="flex justify-end gap-2">
                          <AdminButton className="rounded-full px-4" onClick={() => openEdit(item)} variant="ghost">
                            Edit
                          </AdminButton>
                          <AdminButton className="rounded-full px-4" onClick={() => onArchiveToggle(item)} variant="secondary">
                            {item?.isActive === false ? "Activate" : "Archive"}
                          </AdminButton>
                          <AdminButton className="rounded-full px-4" onClick={() => onDelete(item)} variant="danger">
                            Delete
                          </AdminButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredBootcamps.length === 0 ? <p className="p-8 text-center text-sm text-on-surface-variant font-medium">No bootcamps match your filters.</p> : null}
          </div>
        </section>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-[100]">
          <button aria-label="Close panel" className="absolute inset-0 bg-surface/80 backdrop-blur-sm transition-opacity" onClick={() => setDrawerOpen(false)} type="button" />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-outline-variant/20 bg-surface/90 backdrop-blur-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.1)] flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-tight">{editId ? "Edit Bootcamp" : "New Bootcamp"}</h3>
              <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors" onClick={() => setDrawerOpen(false)} type="button">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-base text-on-surface-variant mt-2">Define name, division, and summary for each cohort.</p>
            <form className="space-y-6 mt-8 flex-1 overflow-y-auto" onSubmit={onSubmit}>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Bootcamp Name</label>
                <div className="mt-2">
                  <AdminInput onChange={(e) => setName(e.target.value)} placeholder="e.g. Full-Stack Spring 2026" value={name} />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Division</label>
                <div className="mt-2">
                  <AdminSelect onChange={(e) => setDivisionId(e.target.value)} value={divisionId}>
                    <option value="">No division</option>
                    {divisions.map((division) => (
                      <option key={division?._id || division?.id} value={division?._id || division?.id}>
                        {division?.name || "Unnamed Division"}
                      </option>
                    ))}
                  </AdminSelect>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Lead Instructor</label>
                <div className="mt-2">
                  <AdminSelect onChange={(e) => setLeadInstructorId(e.target.value)} value={leadInstructorId}>
                    <option value="">Select an instructor (optional)</option>
                    {instructors.map((inst) => (
                      <option key={inst?._id || inst?.id} value={inst?._id || inst?.id}>
                        {inst?.firstName} {inst?.lastName} (@{inst?.username})
                      </option>
                    ))}
                  </AdminSelect>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Description</label>
                <div className="mt-2">
                  <textarea
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface/60 px-4 py-3 text-sm outline-none transition-all duration-300 focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-outline-variant/80 placeholder:text-on-surface-variant/50 resize-none"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short summary for this cohort."
                    rows={6}
                    value={description}
                  />
                </div>
              </div>
              <div className="border-t border-outline-variant/20 pt-6 flex gap-3 mt-auto mb-4">
                <AdminButton className="flex-1 rounded-xl" onClick={() => setDrawerOpen(false)} type="button" variant="ghost">
                  Cancel
                </AdminButton>
                <AdminButton className="flex-1 rounded-xl shadow-lg shadow-primary/20" type="submit">
                  {editId ? "Save Changes" : "Create Bootcamp"}
                </AdminButton>
              </div>
            </form>
          </aside>
        </div>
      ) : null}
    </AdminLayout>
  );
}

export default AdminBootcamps;
