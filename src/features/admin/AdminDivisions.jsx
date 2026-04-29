import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput } from "../../shared/components/admin/AdminUI";
import { adminService } from "../../services/adminService";

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
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header and summary cards */}
        <section className="rounded-3xl border border-vanguard-gray-100 bg-vanguard-gray-50 p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Admin Hub</p>
              <h2 className="text-4xl font-black mt-2 tracking-tight">Divisions</h2>
              <p className="text-base text-vanguard-gray-400 mt-2 max-w-2xl">
                Organize your academy into focused learning pillars, track active programs, and keep category structure clean.
              </p>
            </div>
            <AdminButton className="rounded-full shadow hover:-translate-y-1" onClick={openCreate}>
              + New Division
            </AdminButton>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-vanguard-gray-100 bg-white p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-vanguard-gray-400 font-bold">Total Divisions</p>
              <p className="text-3xl font-black mt-2 text-vanguard-gray-800">{items.length}</p>
            </div>
            
          </div>
        </section>

        {/* Table List */}
        <section className="rounded-3xl border border-vanguard-gray-100 bg-white p-8">
          {loading && <p className="text-sm animate-pulse">Loading divisions...</p>}
          {!loading && error && <p className="text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20">{error}</p>}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-vanguard-gray-100">
                <thead>
                  <tr className="bg-vanguard-gray-50">
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-vanguard-gray-400">#</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-vanguard-gray-400">Name</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-vanguard-gray-400">Description</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-vanguard-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vanguard-gray-100">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-vanguard-gray-400">No divisions available.</td>
                    </tr>
                  ) : (
                    items.map((division, index) => (
                      <tr key={division?._id || division?.id} className="hover:bg-vanguard-gray-50 transition">
                        <td className="px-4 py-3 text-vanguard-gray-400 font-mono w-12">{String(index + 1).padStart(2, "0")}</td>
                        <td className="px-4 py-3 font-bold text-primary hover:underline cursor-pointer" onClick={() => navigate(`/admin/divisions/${division?._id || division?.id}`)}>
                          {division?.name || "Unnamed Division"}
                        </td>
                        <td className="px-4 py-3 text-vanguard-gray-400">{division?.description || <span className="italic">No description yet.</span>}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            
                            <AdminButton className="rounded-full px-4 py-2 text-xs border border-vanguard-gray-200 bg-white text-vanguard-gray-500 hover:bg-vanguard-gray-50" onClick={() => openEdit(division)} variant="ghost">
                              Edit
                            </AdminButton>
                            <AdminButton className="rounded-full px-4 py-2 text-xs border border-vanguard-gray-200 bg-white text-error hover:bg-error/10" onClick={() => onDelete(division?._id || division?.id)} variant="ghost">
                              Delete
                            </AdminButton>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
