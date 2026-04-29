import React, { useEffect, useState } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
function BootcampDetailPage() {
  const { id } = useParams();
  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const response = await adminService.getBootcampById(id);
        setBootcamp(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load bootcamp details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  const getInstructorName = () => {
    if (bootcamp?.leadInstructor) {
      const { firstName, lastName } = bootcamp.leadInstructor;
      return `${firstName} ${lastName}`;
    }
    return bootcamp?.leadInstructorId || "Not Assigned";
  };

  const getDivisionName = () => {
    if (typeof bootcamp?.division_id === "object") {
      return bootcamp.division_id?.name;
    }
    return bootcamp?.division_id || "No Division Assigned";
  };

  return (
    <AdminLayout title="Bootcamp Details">
      <div className="max-w-6xl mx-auto w-full py-8 px-4 md:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4" />
            <p className="font-bold uppercase tracking-widest text-xs">Synchronizing Details...</p>
          </div>
        ) : error ? (
          <div className="bg-error/10 text-error p-6 rounded-2xl border border-error/20 text-center">
            {error}
          </div>
        ) : bootcamp ? (
          <>
            {/* Top Header Card */}
            <section className="rounded-3xl border border-outline-variant/20 bg-surface p-8 shadow-sm mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-4xl font-black tracking-tighter text-vanguard-gray-800">
                      {bootcamp.name}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      bootcamp.isActive ? 'bg-primary/10 text-primary' : 'bg-vanguard-gray-100 text-vanguard-gray-400'
                    }`}>
                      {bootcamp.isActive ? "Active" : "Archived"}
                    </span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    {bootcamp.description || "Comprehensive bootcamp program designed for Vanguard excellence."}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 bg-vanguard-gray-50/50 p-6 rounded-2xl border border-vanguard-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Division</span>
                    <span className="font-bold text-sm">{getDivisionName()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Lead Instructor</span>
                    <span className="font-bold text-sm">{getInstructorName()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Timeline</span>
                    <span className="font-bold text-sm">
                      {bootcamp.startDate
                        ? new Date(bootcamp.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })
                        : 'TBD'}
                      {' — '}
                      {bootcamp.endDate
                        ? new Date(bootcamp.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })
                        : 'TBD'}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* Tabbed Navigation */}
            <section className="mb-8">
              <nav className="flex gap-10 border-b border-vanguard-gray-100 w-full relative">
                {[
                  { label: "Sessions", to: "sessions", exact: true },
                  { label: "Resources", to: "resources" },
                  { label: "Group", to: "group" },
                ].map(({ label, to, exact }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={!!exact}
                    className={({ isActive }) =>
                      [
                        "relative pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all",
                        isActive
                          ? "text-primary"
                          : "text-vanguard-gray-400 hover:text-vanguard-gray-500"
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        {isActive && (
                          <div className="absolute left-0 right-0 bottom-0 h-1 rounded-full bg-primary animate-in fade-in slide-in-from-left-2 duration-300" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </section>
            <section>
              <div className="min-h-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Outlet context={{ bootcamp }} />
              </div>
            </section>
          </>
        ) : (
          <div className="text-center py-20 opacity-50">
            <p className="font-black uppercase tracking-widest text-sm">No bootcamp record found.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default BootcampDetailPage;