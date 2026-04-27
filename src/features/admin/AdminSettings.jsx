import React, { useState } from "react";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput } from "../../shared/components/admin/AdminUI";

function AdminSettings() {
  const [siteName, setSiteName] = useState("Bootcamp Management System");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [message, setMessage] = useState("");

  const onSave = (event) => {
    event.preventDefault();
    setMessage("Settings saved locally. Connect this page to backend settings endpoint when available.");
  };

  return (
    <AdminLayout title="Admin Settings" subtitle="Configure admin-level platform defaults.">
      <div className="space-y-8 max-w-5xl">
        <section className="rounded-2xl border border-outline-variant/30 bg-gradient-to-r from-surface-container-low to-surface p-6">
          <h2 className="text-3xl font-black">Platform Settings</h2>
          <p className="text-sm text-on-surface-variant mt-2">
            Central configuration for branding, support, and admin operations.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Environment</p>
              <p className="font-semibold mt-1">Production-ready UI</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Auth Model</p>
              <p className="font-semibold mt-1">Role based</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">Scope</p>
              <p className="font-semibold mt-1">Admin console</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
          <form className="space-y-4" onSubmit={onSave}>
            <div>
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Platform Name</label>
              <AdminInput onChange={(e) => setSiteName(e.target.value)} placeholder="Platform name" value={siteName} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Support Email</label>
              <AdminInput onChange={(e) => setSupportEmail(e.target.value)} placeholder="Support email" type="email" value={supportEmail} />
            </div>
            <div className="flex gap-2 pt-2">
              <AdminButton className="rounded-full px-5" type="submit">
                Save Settings
              </AdminButton>
              <AdminButton className="rounded-full px-5" type="button" variant="ghost">
                Preview Changes
              </AdminButton>
            </div>
            {message ? <p className="text-sm text-primary">{message}</p> : null}
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminSettings;
