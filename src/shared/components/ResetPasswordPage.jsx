import React from 'react';

const ResetPasswordPage = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleReset,
  isLoading,
  error
}) => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-fixed selection:text-on-primary-fixed-variant">
      {/* Brand Shell Header */}
      <header className="w-full max-w-7xl mx-auto px-6 flex justify-center items-center pb-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-indigo-900 tracking-tighter font-headline">CSEC ASTU</span>
        </div>
      </header>

      <main className="w-full max-w-md">
        {/* Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_40px_rgba(13,28,46,0.06)] overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-on-surface tracking-tight leading-tight mb-3 font-headline">
                New Password
              </h1>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Please enter and confirm your new password below.
              </p>

              {error && (
                <div className="mt-4 p-3 bg-error/10 text-error rounded-lg text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}
            </div>

            {/* Form Section */}
            <form className="space-y-6" onSubmit={handleReset}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label" htmlFor="new-password">
                    New Password
                  </label>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                    id="new-password"
                    placeholder="Enter new password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                    id="confirm-password"
                    placeholder="Confirm new password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  className={`w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-gradient-to-r hover:from-primary hover:to-primary-container transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Set New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
