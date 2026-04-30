import React, { useEffect, useState } from "react";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput, AdminSelect } from "../../shared/components/admin/AdminUI";
import { adminService } from "../../services/adminService";
import toast from "react-hot-toast";

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
    role: "Student",
    divisions: [],
    status: "Active",
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
      setForm({ firstName: "", lastName: "", email: "", username: "", role: "Student", divisions: [], status: "Active" });
      toast.success("User created successfully!");
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
      const action = user?.isActive === false ? "activated" : "deactivated";
      toast.success(`User successfully ${action}!`);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update user status.");
    }
  };

  // Handler to change user role
  const onChangeRole = async (user, newRole) => {
    const id = user?._id || user?.id;
    if (!id || !["Admin", "Student"].includes(newRole)) return;
    try {
      await adminService.updateUser(id, { role: newRole });
      toast.success(`Role updated to ${newRole} successfully!`);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update user role.");
    }
  };

  return (
    <AdminLayout title="User Management" subtitle="Create users, manage roles, and control account status.">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-linear-to-br from-surface-container-low/80 to-surface/40 backdrop-blur-2xl p-8 shadow-xl">
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <p className="text-xs uppercase tracking-[0.2em] text-tertiary font-bold">Admin Hub</p>
          <h2 className="text-4xl font-black mt-2 tracking-tight">Member Directory</h2>
          <p className="text-base text-on-surface-variant mt-2 max-w-2xl">
            Create and manage user accounts across student, instructor, and admin roles.
          </p>
          <div className="mt-8 p-6 rounded-2xl bg-surface/50 backdrop-blur-sm border border-outline-variant/20">
            <h3 className="text-sm uppercase tracking-widest text-on-surface-variant font-bold mb-4">Quick Create User</h3>
            <div className="grid gap-4 md:grid-cols-6">
              <AdminInput className="md:col-span-1" onChange={(e) => setField("firstName", e.target.value)} placeholder="First Name" value={form.firstName} />
              <AdminInput className="md:col-span-1" onChange={(e) => setField("lastName", e.target.value)} placeholder="Last Name" value={form.lastName} />
              <AdminInput className="md:col-span-1" onChange={(e) => setField("username", e.target.value)} placeholder="Username" value={form.username} />
              <AdminInput className="md:col-span-2" onChange={(e) => setField("email", e.target.value)} placeholder="Email Address" type="email" value={form.email} />
              <AdminInput className="md:col-span-2" onChange={(e) => setField("division", e.target.value)} placeholder="Division" value={form.divisions} />
              <AdminSelect className="md:col-span-1" onChange={(e) => setField("role", e.target.value)} value={form.role}>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </AdminSelect>
            </div>
            <div className="mt-5 flex justify-end">
              <AdminButton className="rounded-full shadow-lg shadow-primary/20 hover:-translate-y-1 px-8" onClick={onCreate}>
                + Create User
              </AdminButton>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 relative z-10">
            <AdminInput onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, username, or email..." value={query} />
            <AdminSelect onChange={(e) => setRoleFilter(e.target.value)} value={roleFilter}>
              <option value="all">All Roles</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </AdminSelect>
          </div>
          {error ? <p className="text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20 mt-4">{error}</p> : null}
          <div className="mt-6 space-y-3 relative z-10">
            {users
              .filter((user) => {
                const q = query.trim().toLowerCase();
                const hay = `${user?.firstName || ""} ${user?.lastName || ""} ${user?.username || ""} ${user?.email || ""}`.toLowerCase();
                const roleMatches = roleFilter === "all" || String(user?.role || "").toLowerCase() === roleFilter;
                return (!q || hay.includes(q)) && roleMatches;
              })
              .map((user) => (
                <article className="group flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-surface hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 gap-4" key={user?._id || user?.id}>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary/20 to-tertiary/20 flex items-center justify-center text-primary font-bold text-lg">
                      {String(user?.firstName || "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-base flex items-center gap-2">
                        {user?.firstName || ""} {user?.lastName || ""}
                        <span className="text-xs font-normal text-on-surface-variant">@{user?.username || "no-username"}</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-sm text-on-surface-variant font-medium">{user?.email || "no-email"}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant/50" />
                        <span className="text-xs uppercase tracking-wider font-bold text-primary/80">{user?.role || "unknown"}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant/50" />
                        <span className={`text-xs font-bold uppercase tracking-wider ${user?.isActive === false ? "text-error" : "text-primary"}`}>
                          {user?.isActive === false ? "Inactive" : "Active"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
                    <AdminButton className="rounded-full px-6 shadow-sm w-full md:w-auto" onClick={() => onToggle(user)} variant={user?.isActive === false ? "primary" : "ghost"}>
                      {user?.isActive === false ? "Activate Account" : "Deactivate"}
                    </AdminButton>
                    <AdminSelect
                      className="rounded-full px-4 py-2 border border-outline-variant/30 bg-surface/80 text-sm font-semibold w-full md:w-auto"
                      value={user?.role || "Student"}
                      onChange={e => onChangeRole(user, e.target.value)}
                      style={{ minWidth: 120 }}
                    >
                      <option value="Student">Student</option>
                      <option value="Admin">Admin</option>
                    </AdminSelect>
                  </div>
                </article>
              ))}
            {users.length === 0 ? <p className="p-8 text-center text-sm text-on-surface-variant font-medium">No users found.</p> : null}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;
