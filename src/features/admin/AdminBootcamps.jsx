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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [editId, setEditId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const [bootcampsRes, divisionsRes] = await Promise.all([
        adminService.getBootcamps({ limit: 200 }),
        adminService.getDivisions({ limit: 200 }),
      ]);
      setBootcamps(asList(bootcampsRes));
      const divisionItems = asList(divisionsRes);
      setDivisions(divisionItems);
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
    setDrawerOpen(true);
  };

  const openEdit = (item) => {
    setEditId(item?._id || item?.id || "");
    setName(item?.name || "");
    setDescription(item?.description || "");
    setDivisionId(extractDivisionId(item) || "");
    setDrawerOpen(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    try {
      if (editId) {
        await adminService.updateBootcamp(editId, {
          name: name.trim(),
          description: description.trim(),
          division_id: divisionId || undefined,
        });
      } else {
        await adminService.createBootcamp({
          name: name.trim(),
          description: description.trim(),
          division_id: divisionId || undefined,
        });
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
      await adminService.updateBootcamp(id, { isActive: item?.isActive === false });
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update bootcamp.");
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
        <section className="rounded-2xl border border-outline-variant/30 bg-gradient-to-r from-surface-container-low to-surface p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">Admin Hub</p>
              <h2 className="text-3xl font-black mt-1">Bootcamps</h2>
              <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
                Manage cohort lifecycle, map each cohort to the right division, and quickly archive inactive programs.
              </p>
            </div>
            <AdminButton className="rounded-full px-5" onClick={openCreate}>
              + New Bootcamp
            </AdminButton>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Total</p>
              <p className="text-3xl font-black mt-1">{bootcamps.length}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Active</p>
              <p className="text-3xl font-black mt-1">{bootcamps.filter((item) => item?.isActive !== false).length}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Archived</p>
              <p className="text-3xl font-black mt-1">{bootcamps.filter((item) => item?.isActive === false).length}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
          <div className="grid gap-3 md:grid-cols-3">
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
          {error && <p className="text-sm text-error mt-3">{error}</p>}
          <div className="mt-4 overflow-x-auto rounded-xl border border-outline-variant/30 bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-surface-container text-left text-[11px] uppercase tracking-wider text-on-surface-variant">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Division</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBootcamps.map((item) => {
                  const id = item?._id || item?.id;
                  const relatedDivision = divisions.find((division) => (division?._id || division?.id) === extractDivisionId(item));
                  return (
                    <tr className="border-t border-outline-variant/20" key={id}>
                      <td className="p-3">
                        <p className="font-semibold">{item?.name || "Unnamed Bootcamp"}</p>
                        <p className="text-xs text-on-surface-variant">{item?.description || "No description"}</p>
                      </td>
                      <td className="p-3 text-on-surface-variant">{relatedDivision?.name || extractDivisionId(item) || "N/A"}</td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item?.isActive === false ? "bg-error-container text-error" : "bg-primary/15 text-primary"
                          }`}
                        >
                          {item?.isActive === false ? "Archived" : "Active"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-2">
                          <AdminButton className="rounded-full px-4" onClick={() => openEdit(item)} variant="ghost">
                            Edit
                          </AdminButton>
                          <AdminButton className="rounded-full px-4" onClick={() => onArchiveToggle(item)} variant="danger">
                            {item?.isActive === false ? "Activate" : "Archive"}
                          </AdminButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredBootcamps.length === 0 ? <p className="p-4 text-sm text-on-surface-variant">No bootcamps match your filters.</p> : null}
          </div>
        </section>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-[100]">
          <button aria-label="Close panel" className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} type="button" />
          <aside className="absolute right-0 top-0 h-full w-full max-w-lg border-l border-outline-variant/30 bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">{editId ? "Edit Bootcamp" : "New Bootcamp"}</h3>
              <button className="material-symbols-outlined" onClick={() => setDrawerOpen(false)} type="button">
                close
              </button>
            </div>
            <p className="text-sm text-on-surface-variant mt-2">Define name, division, and summary for each cohort.</p>
            <form className="space-y-4 mt-6" onSubmit={onSubmit}>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Bootcamp Name</label>
                <AdminInput onChange={(e) => setName(e.target.value)} placeholder="e.g. Full-Stack Spring 2026" value={name} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Division</label>
                <AdminSelect onChange={(e) => setDivisionId(e.target.value)} value={divisionId}>
                  <option value="">No division</option>
                  {divisions.map((division) => (
                    <option key={division?._id || division?.id} value={division?._id || division?.id}>
                      {division?.name || "Unnamed Division"}
                    </option>
                  ))}
                </AdminSelect>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Description</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-outline-variant/40 bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short summary for this cohort."
                  rows={5}
                  value={description}
                />
              </div>
              <div className="border-t border-outline-variant/30 pt-4 flex gap-2">
                <AdminButton className="flex-1 rounded-full" onClick={() => setDrawerOpen(false)} type="button" variant="ghost">
                  Cancel
                </AdminButton>
                <AdminButton className="flex-1 rounded-full" type="submit">
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
