import React, { useState, useEffect } from "react";
import AdminLayout from "../../shared/components/admin/AdminLayout";
import { AdminButton, AdminInput } from "../../shared/components/admin/AdminUI";
import { studentAuthService } from "../../services/studentAuthService";
import toast from "react-hot-toast";

function AdminProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await studentAuthService.getProfile();
        if (active && data) {
          setProfile({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            username: data.username || "",
          });
        }
      } catch (err) {
        if (active) setError(err?.response?.data?.message || err?.message || "Failed to load profile.");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const onUpdateProfile = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await studentAuthService.updateProfile(profile);
      toast.success("Profile information updated successfully");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update profile.");
      toast.error("Failed to update profile.");
    }
  };

  const onChangePassword = async (event) => {
    event.preventDefault();
    setError("");
    
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      const msg = "New passwords do not match.";
      setError(msg);
      toast.error(msg);
      return;
    }
    
    if (!passwords.currentPassword || !passwords.newPassword) {
      const msg = "Please fill in all password fields.";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      await studentAuthService.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to change password.");
      toast.error("Failed to change password.");
    }
  };

  return (
    <AdminLayout title="Admin Profile" subtitle="Manage your personal information and security.">
      <div className="space-y-8 max-w-5xl">
        <section className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-gradient-to-br from-surface-container-low/80 to-surface/40 backdrop-blur-2xl p-8 shadow-xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Security</p>
          <h2 className="text-4xl font-black mt-2 tracking-tight">Account Settings</h2>
          <p className="text-base text-on-surface-variant mt-2">
            Update your personal details and change your password here.
          </p>
        </section>

        {loading && <p className="text-sm animate-pulse mb-4">Loading profile...</p>}
        {error && <p className="text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20 mb-4">{error}</p>}

        {!loading && (
          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Personal Information</h3>
              <form className="space-y-6" onSubmit={onUpdateProfile}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">First Name</label>
                    <div className="mt-2">
                      <AdminInput 
                        value={profile.firstName} 
                        onChange={(e) => setProfile(p => ({ ...p, firstName: e.target.value }))} 
                        placeholder="First Name" 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Last Name</label>
                    <div className="mt-2">
                      <AdminInput 
                        value={profile.lastName} 
                        onChange={(e) => setProfile(p => ({ ...p, lastName: e.target.value }))} 
                        placeholder="Last Name" 
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Username</label>
                  <div className="mt-2">
                    <AdminInput 
                      value={profile.username} 
                      onChange={(e) => setProfile(p => ({ ...p, username: e.target.value }))} 
                      placeholder="Username" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Email Address</label>
                  <div className="mt-2">
                    <AdminInput 
                      value={profile.email} 
                      onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))} 
                      placeholder="Email Address" 
                      type="email" 
                      required 
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant/20">
                  <AdminButton className="w-full rounded-full shadow-lg shadow-primary/20 hover:-translate-y-1" type="submit">
                    Update Profile
                  </AdminButton>
                </div>
              </form>
            </section>

            <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-8 shadow-sm h-fit">
              <h3 className="text-xl font-bold mb-6">Change Password</h3>
              <form className="space-y-6" onSubmit={onChangePassword}>
                <div>
                  <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Current Password</label>
                  <div className="mt-2">
                    <AdminInput 
                      value={passwords.currentPassword} 
                      onChange={(e) => setPasswords(p => ({ ...p, currentPassword: e.target.value }))} 
                      placeholder="Enter current password" 
                      type="password" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">New Password</label>
                  <div className="mt-2">
                    <AdminInput 
                      value={passwords.newPassword} 
                      onChange={(e) => setPasswords(p => ({ ...p, newPassword: e.target.value }))} 
                      placeholder="Enter new password" 
                      type="password" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Confirm New Password</label>
                  <div className="mt-2">
                    <AdminInput 
                      value={passwords.confirmNewPassword} 
                      onChange={(e) => setPasswords(p => ({ ...p, confirmNewPassword: e.target.value }))} 
                      placeholder="Confirm new password" 
                      type="password" 
                      required 
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant/20">
                  <AdminButton className="w-full rounded-full shadow-lg shadow-primary/20 hover:-translate-y-1" type="submit">
                    Update Password
                  </AdminButton>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminProfile;
