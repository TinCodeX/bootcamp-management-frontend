import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput } from "../../shared/components/admin/AdminUI";
import { adminService } from "../../services/adminService";
import toast from "react-hot-toast";

function asList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function AdminDivisions() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await adminService.getDivisions({ limit: 200 });
      setItems(asList(response));
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load divisions.");
    } finally {
      setLoading(false);
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

  const openEdit = (division) => {
    setEditId(division?._id || division?.id || "");
    setName(division?.name || "");
    setDescription(division?.description || "");
    setDrawerOpen(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    try {
      if (editId) {
        await adminService.updateDivision(editId, { name: name.trim(), description: description.trim() });
        toast.success("Division updated successfully.");
      } else {
        await adminService.createDivision({ name: name.trim(), description: description.trim() });
        toast.success("Division created successfully.");
      }
      setDrawerOpen(false);
      await load();
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Failed to save division.";
      setError(message);
      toast.error(message);
    }
  };

  const onDelete = async (id) => {
    try {
      await adminService.deleteDivision(id);
      toast.success("Division deleted successfully.");
      await load();
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Failed to delete division.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <AdminLayout title="Division Management" subtitle="Create and maintain divisions for bootcamp organization.">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-gradient-to-br from-surface-container-low/80 to-surface/40 backdrop-blur-2xl p-8 shadow-xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="flex flex-wrap items-end justify-between gap-4 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Admin Hub</p>
              <h2 className="text-4xl font-black mt-2 tracking-tight">Divisions</h2>
              <p className="text-base text-on-surface-variant mt-2 max-w-2xl">
                Organize your academy into focused learning pillars, track active programs, and keep category structure clean.
              </p>
            </div>
            <AdminButton className="rounded-full shadow-lg shadow-primary/20 hover:-translate-y-1" onClick={openCreate}>
              + New Division
            </AdminButton>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3 relative z-10">
            <div className="group rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-surface hover:shadow-md hover:border-primary/30">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Total Divisions</p>
              <p className="text-4xl font-black mt-2 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">{items.length}</p>
            </div>
            <div className="group rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-surface hover:shadow-md hover:border-primary/30">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">With Description</p>
              <p className="text-4xl font-black mt-2 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">{items.filter((item) => item?.description?.trim()).length}</p>
            </div>
            <div className="group rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-surface hover:shadow-md hover:border-primary/30">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Needs Update</p>
              <p className="text-4xl font-black mt-2 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">{items.filter((item) => !item?.description?.trim()).length}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-8 shadow-sm">
          {loading && <p className="text-sm animate-pulse">Loading divisions...</p>}
          {!loading && error && <p className="text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20">{error}</p>}
          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2">
              {items.length === 0 ? (
                <p className="text-sm text-on-surface-variant">No divisions available.</p>
              ) : (
                items.map((division, index) => (
                  <article
                    className="group relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
                    key={division?._id || division?.id}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold">
                          Division {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-2xl font-black mt-1 tracking-tight">{division?.name || "Unnamed Division"}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                        <span className="material-symbols-outlined">apartment</span>
                      </div>
                    </div>
                    <p className="text-base text-on-surface-variant mt-4 min-h-12 relative z-10 leading-relaxed">
                      {division?.description || "No description yet."}
                    </p>
                    <div className="mt-6 flex gap-3 relative z-10">
                      <AdminButton className="rounded-full px-5 hover:shadow-md" onClick={() => navigate(`/admin/divisions/${division?._id || division?.id}`)} variant="primary">
                        View Details
                      </AdminButton>
                      <AdminButton className="rounded-full px-5 hover:shadow-md" onClick={() => openEdit(division)} variant="ghost">
                        Edit
                      </AdminButton>
                      <AdminButton className="rounded-full px-5 hover:shadow-md" onClick={() => onDelete(division?._id || division?.id)} variant="danger">
                        Delete
                      </AdminButton>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </section>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-[100]">
          <button
            aria-label="Close panel"
            className="absolute inset-0 bg-surface/80 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
            type="button"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-outline-variant/20 bg-surface/90 backdrop-blur-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.1)] flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-tight">{editId ? "Edit Division" : "New Division"}</h3>
              <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors" onClick={() => setDrawerOpen(false)} type="button">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-base text-on-surface-variant mt-2">
              {editId ? "Update division details." : "Create a new learning pillar for bootcamps."}
            </p>
            <form className="space-y-6 mt-8 flex-1 overflow-y-auto" onSubmit={onSubmit}>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Division Name</label>
                <div className="mt-2">
                  <AdminInput onChange={(e) => setName(e.target.value)} placeholder="e.g. Data Science" value={name} />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Description</label>
                <div className="mt-2">
                  <textarea
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface/60 px-4 py-3 text-sm outline-none transition-all duration-300 focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-outline-variant/80 placeholder:text-on-surface-variant/50 resize-none"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short summary used in cards and dashboards."
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
                  {editId ? "Save Changes" : "Create Division"}
                </AdminButton>
              </div>
            </form>
          </aside>
        </div>
      ) : null}
    </AdminLayout>
  );
}

export default AdminDivisions;
