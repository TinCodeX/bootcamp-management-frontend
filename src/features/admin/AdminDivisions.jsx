import React, { useEffect, useState } from "react";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput } from "../../shared/components/admin/AdminUI";
import { adminService } from "../../services/adminService";

function asList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function AdminDivisions() {
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
      } else {
        await adminService.createDivision({ name: name.trim(), description: description.trim() });
      }
      setDrawerOpen(false);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to save division.");
    }
  };

  const onDelete = async (id) => {
    try {
      await adminService.deleteDivision(id);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to delete division.");
    }
  };

  return (
    <AdminLayout title="Division Management" subtitle="Create and maintain divisions for bootcamp organization.">
      <div className="space-y-8">
        <section className="rounded-2xl border border-outline-variant/30 bg-gradient-to-r from-surface-container-low to-surface p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">Admin Hub</p>
              <h2 className="text-3xl font-black mt-1">Divisions</h2>
              <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
                Organize your academy into focused learning pillars, track active programs, and keep category structure clean.
              </p>
            </div>
            <AdminButton className="rounded-full px-5" onClick={openCreate}>
              + New Division
            </AdminButton>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Total Divisions</p>
              <p className="text-3xl font-black mt-1">{items.length}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">With Description</p>
              <p className="text-3xl font-black mt-1">{items.filter((item) => item?.description?.trim()).length}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Needs Update</p>
              <p className="text-3xl font-black mt-1">{items.filter((item) => !item?.description?.trim()).length}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
          {loading && <p className="text-sm">Loading divisions...</p>}
          {!loading && error && <p className="text-sm text-error">{error}</p>}
          {!loading && !error && (
            <div className="grid gap-4 md:grid-cols-2">
              {items.length === 0 ? (
                <p className="text-sm text-on-surface-variant">No divisions available.</p>
              ) : (
                items.map((division, index) => (
                  <article
                    className="rounded-xl border border-outline-variant/30 bg-surface p-5 transition hover:-translate-y-0.5"
                    key={division?._id || division?.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                          Division {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-xl font-bold mt-1">{division?.name || "Unnamed Division"}</h3>
                      </div>
                      <span className="material-symbols-outlined text-primary">apartment</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-3 min-h-10">
                      {division?.description || "No description yet."}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <AdminButton className="rounded-full px-4" onClick={() => openEdit(division)} variant="ghost">
                        Edit
                      </AdminButton>
                      <AdminButton className="rounded-full px-4" onClick={() => onDelete(division?._id || division?.id)} variant="danger">
                        Archive
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
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            type="button"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-lg border-l border-outline-variant/30 bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">{editId ? "Edit Division" : "New Division"}</h3>
              <button className="material-symbols-outlined" onClick={() => setDrawerOpen(false)} type="button">
                close
              </button>
            </div>
            <p className="text-sm text-on-surface-variant mt-2">
              {editId ? "Update division details." : "Create a new learning pillar for bootcamps."}
            </p>
            <form className="space-y-4 mt-6" onSubmit={onSubmit}>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Division Name</label>
                <AdminInput onChange={(e) => setName(e.target.value)} placeholder="e.g. Data Science" value={name} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Description</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-outline-variant/40 bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short summary used in cards and dashboards."
                  rows={5}
                  value={description}
                />
              </div>
              <div className="border-t border-outline-variant/30 pt-4 flex gap-2">
                <AdminButton className="flex-1 rounded-full" onClick={() => setDrawerOpen(false)} type="button" variant="ghost">
                  Cancel
                </AdminButton>
                <AdminButton className="flex-1 rounded-full" type="submit">
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
