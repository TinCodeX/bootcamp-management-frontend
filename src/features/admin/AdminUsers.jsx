import React, { useEffect, useState } from "react";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput, AdminSelect } from "../../shared/components/admin/AdminUI";
import { adminService } from "../../services/adminService";

function asList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: "student",
    password: "",
  });

  const load = async () => {
    setError("");
    try {
      const response = await adminService.getUsers({ limit: 300 });
      setUsers(asList(response));
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load users.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onCreate = async (event) => {
    event.preventDefault();
    try {
      await adminService.createUser(form);
      setForm({ firstName: "", lastName: "", email: "", username: "", role: "student", password: "" });
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to create user.");
    }
  };

  const onToggle = async (user) => {
    const id = user?._id || user?.id;
    if (!id) return;
    try {
      await adminService.toggleUserStatus(id, user?.isActive === false);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update user status.");
    }
  };

  return (
    <AdminLayout title="User Management" subtitle="Create users, manage roles, and control account status.">
      <div className="space-y-8">
        <section className="rounded-2xl border border-outline-variant/30 bg-gradient-to-r from-surface-container-low to-surface p-6">
          <h2 className="text-3xl font-black">Member Directory</h2>
          <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
            Create and manage user accounts across student, instructor, and admin roles.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-6">
            <AdminInput className="md:col-span-1" onChange={(e) => setField("firstName", e.target.value)} placeholder="First" value={form.firstName} />
            <AdminInput className="md:col-span-1" onChange={(e) => setField("lastName", e.target.value)} placeholder="Last" value={form.lastName} />
            <AdminInput className="md:col-span-1" onChange={(e) => setField("username", e.target.value)} placeholder="Username" value={form.username} />
            <AdminInput className="md:col-span-1" onChange={(e) => setField("email", e.target.value)} placeholder="Email" type="email" value={form.email} />
            <AdminSelect className="md:col-span-1" onChange={(e) => setField("role", e.target.value)} value={form.role}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </AdminSelect>
            <AdminInput className="md:col-span-1" onChange={(e) => setField("password", e.target.value)} placeholder="Temp password" type="password" value={form.password} />
          </div>
          <div className="mt-3">
            <AdminButton className="rounded-full px-5" onClick={onCreate}>
              + Create User
            </AdminButton>
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <AdminInput onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, username, or email" value={query} />
            <AdminSelect onChange={(e) => setRoleFilter(e.target.value)} value={roleFilter}>
              <option value="all">All roles</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </AdminSelect>
          </div>
          {error ? <p className="text-sm text-error mt-3">{error}</p> : null}
          <div className="mt-4 space-y-2">
            {users
              .filter((user) => {
                const q = query.trim().toLowerCase();
                const hay = `${user?.firstName || ""} ${user?.lastName || ""} ${user?.username || ""} ${user?.email || ""}`.toLowerCase();
                const roleMatches = roleFilter === "all" || String(user?.role || "").toLowerCase() === roleFilter;
                return (!q || hay.includes(q)) && roleMatches;
              })
              .map((user) => (
                <article className="flex items-center justify-between rounded-lg border border-outline-variant/30 bg-surface p-3" key={user?._id || user?.id}>
                  <div>
                    <p className="font-medium">
                      {user?.firstName || ""} {user?.lastName || ""} ({user?.username || "no-username"})
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {user?.email || "no-email"} | Role: {user?.role || "unknown"} | Status: {user?.isActive === false ? "Inactive" : "Active"}
                    </p>
                  </div>
                  <AdminButton className="rounded-full px-4" onClick={() => onToggle(user)} variant="ghost">
                    {user?.isActive === false ? "Activate" : "Deactivate"}
                  </AdminButton>
                </article>
              ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;
