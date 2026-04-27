import { useEffect, useMemo, useState } from "react";
import { adminService } from "../../services/adminService";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { StatGrid } from "../../shared/components/admin/AdminUI";

function safeList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function getDivisionId(bootcamp) {
  const raw = bootcamp?.division_id;
  if (!raw) return "";
  if (typeof raw === "object") return String(raw._id || "");
  return String(raw);
}

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [bootcamps, setBootcamps] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadAdminData() {
      setLoading(true);
      setError("");
      try {
        const [divisionsRes, bootcampsRes, usersRes] = await Promise.all([
          adminService.getDivisions({ limit: 200 }),
          adminService.getBootcamps(),
          adminService.getUsers({ limit: 200 }),
        ]);

        if (!active) return;

        setDivisions(safeList(divisionsRes));
        setBootcamps(safeList(bootcampsRes));
        setUsers(safeList(usersRes));
      } catch (err) {
        if (!active) return;
        const message =
          err?.response?.data?.message || err?.message || "Failed to load admin data.";
        setError(message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadAdminData();
    return () => {
      active = false;
    };
  }, []);

  const cards = useMemo(() => {
    const activeBootcamps = bootcamps.filter((b) => b?.isActive !== false);
    const inactiveBootcamps = bootcamps.filter((b) => b?.isActive === false);
    const students = users.filter((u) => String(u?.role || "").toLowerCase() === "student");
    const instructors = users.filter((u) => String(u?.role || "").toLowerCase() === "instructor");

    return [
      { label: "Divisions", value: divisions.length },
      { label: "Active Bootcamps", value: activeBootcamps.length },
      { label: "Archived Bootcamps", value: inactiveBootcamps.length },
      { label: "Students", value: students.length },
      { label: "Instructors", value: instructors.length },
      { label: "All Users", value: users.length },
    ];
  }, [divisions, bootcamps, users]);

  return (
    <AdminLayout title="Admin Dashboard" subtitle="Overview of divisions, bootcamps, and users.">
      {loading && <p>Loading admin data...</p>}
      {!loading && error && <p className="text-error">{error}</p>}
      {!loading && !error && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-outline-variant/30 bg-gradient-to-r from-surface-container-low to-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">Control Center</p>
            <h2 className="text-3xl font-black mt-1">Admin Analytics</h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Monitor platform health, enrollment distribution, and learning pillar activity from one hub.
            </p>
            <div className="mt-5">
              <StatGrid items={cards} />
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
              <h3 className="text-lg font-bold">Recent Divisions</h3>
              <p className="text-sm text-on-surface-variant mt-1">Quick view of available divisions.</p>
              {divisions.length === 0 ? (
                <p className="text-sm text-on-surface-variant mt-3">No divisions found.</p>
              ) : (
                <ul className="space-y-2 text-sm mt-3">
                  {divisions.slice(0, 6).map((division) => (
                    <li key={division?._id || division?.id} className="rounded-lg border border-outline-variant/20 bg-surface p-3">
                      <strong>{division?.name || "Unnamed Division"}</strong>
                      {division?.description ? <span className="text-on-surface-variant"> - {division.description}</span> : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
              <h3 className="text-lg font-bold">Recent Bootcamps</h3>
              <p className="text-sm text-on-surface-variant mt-1">Latest bootcamps and division mapping.</p>
              {bootcamps.length === 0 ? (
                <p className="text-sm text-on-surface-variant mt-3">No bootcamps found.</p>
              ) : (
                <ul className="space-y-2 text-sm mt-3">
                  {bootcamps.slice(0, 6).map((bootcamp) => (
                    <li key={bootcamp?._id} className="rounded-lg border border-outline-variant/20 bg-surface p-3">
                      <strong>{bootcamp?.name || "Unnamed Bootcamp"}</strong>
                      <span className="text-on-surface-variant"> - Division ID: {getDivisionId(bootcamp) || "N/A"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;