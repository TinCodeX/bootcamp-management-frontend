import React, { useState } from 'react';
import StudentLayout from './StudentLayout';
import { studentAuthService } from '../../services/studentAuthService';

const ChangePasswordPage = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await studentAuthService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update password. Please check your current password.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-2xl mx-auto w-full space-y-12 pb-20">
        <header className="space-y-2">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">Change Password</h2>
          <p className="text-on-surface-variant font-medium opacity-70">Update your security credentials to keep your account safe.</p>
        </header>

        {message.text && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${message.type === 'success' ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'}`}>
            <span className="material-symbols-outlined">{message.type === 'success' ? 'check_circle' : 'error'}</span>
            {message.text}
          </div>
        )}

        <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
          <form className="space-y-6" onSubmit={handleChangePassword}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-error/10 transition-all"
                required
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all"
                required
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all"
                required
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4">
              <button 
                disabled={isLoading}
                className={`w-full bg-primary text-on-primary font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] flex justify-center items-center gap-2 ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading && <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>}
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ChangePasswordPage;
