import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { studentAuthService } from "../../../services/studentAuthService";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: "dashboard" },
  { label: "Divisions", to: "/admin/divisions", icon: "apartment" },
  { label: "Bootcamps", to: "/admin/bootcamps", icon: "school" },
  { label: "Users", to: "/admin/users", icon: "group" },
  { label: "Settings", to: "/admin/settings", icon: "settings" },
];

function AdminLayout({ title, subtitle, children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await studentAuthService.logout();
    } catch {
      // keep logout resilient even if API fails
    } finally {
      localStorage.clear();
      navigate("/student");
    }
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <aside className="h-screen w-64 left-0 top-0 sticky bg-surface-container-low flex flex-col py-8 pl-4 gap-8 z-40 border-r border-outline-variant/10">
        <div className="mb-8 px-6">
          <h1 className="font-headline text-lg font-black text-primary uppercase">CSEC ASTU</h1>
          <p className="font-label text-[10px] font-medium uppercase tracking-widest text-on-surface-variant mt-1 opacity-60">
            admin portal
          </p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-primary bg-surface-container-lowest font-bold shadow-sm"
                    : "text-on-surface/70 hover:translate-x-1 hover:text-primary hover:bg-surface-container-high/50"
                } font-label text-sm font-medium uppercase tracking-wider`}
                to={item.to}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-4">
          <button
            className="w-full flex items-center gap-3 text-on-surface/60 hover:text-error hover:bg-error-container/10 my-1 p-3 transition-colors duration-200 rounded-xl font-label text-sm font-medium uppercase tracking-wider"
            onClick={handleLogout}
            type="button"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-headline tracking-tight">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-grow flex flex-col min-w-0 min-h-screen">
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl shadow-sm w-full px-8 py-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {subtitle ? <p className="text-sm text-on-surface-variant mt-1">{subtitle}</p> : null}
        </header>
        <section className="flex-1 overflow-y-auto p-8">{children}</section>
      </main>
    </div>
  );
}

export default AdminLayout;
