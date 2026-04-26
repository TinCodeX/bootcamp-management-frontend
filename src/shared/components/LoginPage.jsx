import React from 'react';

const LoginPage = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  isLoading,
  error,
  forgotPasswordLink = "#"
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-fixed selection:text-on-primary-fixed-variant">
      {/* Brand Shell Header */}
      <header className="w-full max-w-7xl mx-auto px-6 flex justify-center items-center pb-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-indigo-900 tracking-tighter font-headline">CSEC ASTU</span>
        </div>
      </header>

      <main className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_40px_rgba(13,28,46,0.06)] overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Authentication Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-on-surface tracking-tight leading-tight mb-3 font-headline">
                Welcome back
              </h1>
              <p className="text-on-surface-variant leading-relaxed">
                Login to continue to your bootcamp
              </p>
              {error && (
                <div className="mt-4 p-3 bg-error/10 text-error rounded-lg text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}
            </div>

            {/* Form Section */}
            <form className="space-y-6" onSubmit={handleLogin}>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label" htmlFor="username">Username</label>
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                    id="username"
                    placeholder="Enter your username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />

                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label" htmlFor="password">
                    Password
                  </label>
                  <a className="text-xs font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors underline-offset-4 hover:underline" href={forgotPasswordLink}>
                    Forgot Password?
                  </a>
                </div>
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-xl py-3.5 px-4 pr-12 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  className={`w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-gradient-to-r hover:from-primary hover:to-primary-container transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>


            </form>

            {/* Footer Access Note */}
            <div className="mt-10 pt-8 border-t border-outline-variant/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-outline text-lg shrink-0">info</span>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Access is provided by your bootcamp administrator. If you are a new student, check your email for activation instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Subtle Background Element */}
        <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-primary-fixed opacity-10 rounded-full blur-3xl -z-10"></div>
        <div className="fixed -top-24 -left-24 w-96 h-96 bg-secondary-fixed opacity-10 rounded-full blur-3xl -z-10"></div>
      </main>
    </div>
  );
};

export default LoginPage;
