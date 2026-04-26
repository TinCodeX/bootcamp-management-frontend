import React, { useState, useEffect } from 'react';
import StudentLayout from './StudentLayout';
import { studentAuthService } from '../../services/studentAuthService';

const StudentProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = await studentAuthService.getProfile();
      setFormData({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    } catch (err) {
      console.error('Failed to fetch profile', err);
      setMessage({ type: 'error', text: 'Failed to load profile data.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await studentAuthService.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setIsChangingPassword(true);
    setMessage({ type: '', text: '' });

    try {
      await studentAuthService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to change password. Check your current password.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-8 max-w-5xl mx-auto w-full space-y-12 pb-20">
        <header className="space-y-2">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">My Profile</h2>
          <p className="text-on-surface-variant font-medium opacity-70">Manage your account settings and security.</p>
        </header>

        {message.text && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${message.type === 'success' ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'}`}>
            <span className="material-symbols-outlined">{message.type === 'success' ? 'check_circle' : 'error'}</span>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Avatar Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col items-center text-center space-y-6 sticky top-24">
              <div className="w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center border-4 border-primary/10 relative group overflow-hidden">
                <span className="material-symbols-outlined text-6xl text-primary opacity-40">account_circle</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-on-surface text-xl">{formData.firstName} {formData.lastName}</h3>
                <p className="text-on-surface-variant text-xs opacity-60">@{formData.username}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-10">
            {/* Account Details Form */}
            <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <h3 className="font-headline text-2xl font-extrabold text-on-surface mb-8">Personal Information</h3>
              <form className="space-y-8" onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Username (Permanent)</label>
                    <input
                      type="text"
                      value={formData.username}
                      disabled
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface-variant/50 cursor-not-allowed select-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isSaving}
                    className={`w-full bg-primary text-on-primary font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] flex justify-center items-center gap-2 ${isSaving ? 'opacity-70' : ''}`}
                  >
                    {isSaving && <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Security Section Link */}
            <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-headline text-2xl font-extrabold text-on-surface mb-2">Security</h3>
                <p className="text-on-surface-variant text-sm opacity-60 font-medium">Keep your account secure by updating your password regularly.</p>
              </div>
              <a 
                href="/student/change-password"
                className="bg-surface-variant text-on-surface-variant font-black px-6 py-4 rounded-2xl hover:bg-outline-variant/20 transition-all active:scale-[0.98] no-underline flex items-center gap-2"
              >
                Change Password
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfilePage;
