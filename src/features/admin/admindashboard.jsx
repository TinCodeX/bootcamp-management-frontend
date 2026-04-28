import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
        <div className="space-y-8">
          <section className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-gradient-to-br from-surface-container-low/80 to-surface/40 backdrop-blur-2xl p-8 shadow-xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Control Center</p>
            <h2 className="text-4xl font-black mt-2 tracking-tight">Admin Analytics</h2>
            <p className="text-base text-on-surface-variant mt-2 max-w-2xl">
              Monitor platform health, enrollment distribution, and learning pillar activity from one hub.
            </p>
            <div className="mt-8">
              <StatGrid items={cards} />
            </div>
          </section>

          <div className="grid gap-8 xl:grid-cols-2">
            <section className="group relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <h3 className="text-xl font-bold tracking-tight">Recent Divisions</h3>
              <p className="text-sm text-on-surface-variant mt-1">Quick view of available divisions.</p>
              {divisions.length === 0 ? (
                <p className="text-sm text-on-surface-variant mt-4">No divisions found.</p>
              ) : (
                <ul className="space-y-3 text-sm mt-5">
                  {divisions.slice(0, 6).map((division) => (
                    <li
                      key={division?._id || division?.id}
                      className="rounded-xl border border-outline-variant/20 bg-surface/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20 cursor-pointer"
                      onClick={() => navigate(`/admin/divisions/${division?._id || division?.id}`)}
                    >
                      <strong className="text-base">{division?.name || "Unnamed Division"}</strong>
                      {division?.description ? <p className="text-on-surface-variant mt-1 text-xs line-clamp-1">{division.description}</p> : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="group relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <h3 className="text-xl font-bold tracking-tight">Recent Bootcamps</h3>
              <p className="text-sm text-on-surface-variant mt-1">Latest bootcamps and division mapping.</p>
              {bootcamps.length === 0 ? (
                <p className="text-sm text-on-surface-variant mt-4">No bootcamps found.</p>
              ) : (
                <ul className="space-y-3 text-sm mt-5">
                  {bootcamps.slice(0, 6).map((bootcamp) => (
                    <li key={bootcamp?._id} className="rounded-xl border border-outline-variant/20 bg-surface/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-secondary/20">
                      <strong className="text-base">{bootcamp?.name || "Unnamed Bootcamp"}</strong>
                      <p className="text-on-surface-variant mt-1 text-xs">Division ID: {getDivisionId(bootcamp) || "N/A"}</p>
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