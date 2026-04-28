import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { studentAuthService } from "../../../services/studentAuthService";
import { Toaster } from "react-hot-toast";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: "dashboard" },
  { label: "Divisions", to: "/admin/divisions", icon: "apartment" },
  { label: "Bootcamps", to: "/admin/bootcamps", icon: "school" },
  { label: "Users", to: "/admin/users", icon: "group" },
  { label: "Profile", to: "/admin/profile", icon: "person" },
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
    <div className="bg-surface text-on-surface flex fixed inset-0 overflow-hidden selection:bg-primary/20 selection:text-primary">
      <Toaster position="top-right" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '12px' } }} />
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[100px] pointer-events-none z-0" />

      <aside className="flex-shrink-0 h-full w-72 bg-surface-container-low/60 backdrop-blur-2xl flex flex-col py-8 pl-4 gap-8 z-40 border-r border-outline-variant/20 shadow-2xl relative">
        <div className="mb-6 px-6">
          <h1 className="font-headline text-2xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent uppercase tracking-tight">CSEC ASTU</h1>
          <p className="font-label text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mt-1.5 opacity-80">
            Admin Portal
          </p>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto pr-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                className={`group flex items-center space-x-4 px-6 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "text-primary font-bold shadow-md shadow-primary/10 border border-primary/20"
                    : "text-on-surface/70 hover:translate-x-1.5 hover:text-primary hover:bg-surface-container-high/50"
                } font-label text-sm uppercase tracking-wider`}
                to={item.to}
              >
                {isActive && <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent -z-10" />}
                <span
                  className="material-symbols-outlined transition-transform duration-300 group-hover:scale-110"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-4 relative z-10 pb-4">
          <button
            className="w-full flex items-center gap-3 text-on-surface/60 hover:text-error hover:bg-error/10 my-1 p-3.5 transition-all duration-300 rounded-xl font-label text-sm font-bold uppercase tracking-wider group hover:shadow-sm"
            onClick={handleLogout}
            type="button"
          >
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-x-1">logout</span>
            <span className="font-headline tracking-tight">Logout</span>
          </button>
        </div>
      </aside>
      
      <main className="flex-grow flex flex-col min-w-0 h-full relative z-10 overflow-hidden">
        <header className="flex-shrink-0 z-30 bg-surface/70 backdrop-blur-2xl border-b border-outline-variant/10 shadow-sm w-full px-10 py-6 transition-all flex items-center justify-between">
          <div className="flex flex-col gap-1 max-w-7xl w-full">
            <h2 className="text-2xl font-black tracking-tight">{title}</h2>
            {subtitle ? <p className="text-sm text-on-surface-variant/80 font-medium">{subtitle}</p> : null}
          </div>
          <Link to="/admin/profile" className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 hover:scale-105 transition-all shrink-0 border border-primary/20 shadow-sm" title="Admin Profile">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </Link>
        </header>
        <section className="flex-1 overflow-y-auto p-10 w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;
