import React, { useState } from 'react';
import StudentLayout from './StudentLayout';

const StudentProfilePage = () => {
  const storedName = localStorage.getItem('userName') || 'Abenezer Kibret';

  const [formData, setFormData] = useState({
    username: 'abenezer_k', // Mock username
    fullName: storedName,
    email: 'abenezer.k@csec-astu.edu',
    division: 'Engineering Division',
    bio: 'Passionate about building scalable web applications and learning new technologies.',
  });

  const affiliations = [
    { id: 1, bootcamp: 'Fullstack Web Development 2024', role: 'Student', division: 'Engineering', status: 'Active', color: 'bg-primary/10 text-primary' },
    { id: 2, bootcamp: 'UI/UX Design Masterclass', role: 'Helper', division: 'Design', status: 'Active', color: 'bg-tertiary/10 text-tertiary' },
    { id: 3, bootcamp: 'Python for Beginners 2023', role: 'Instructor', division: 'Foundations', status: 'Completed', color: 'bg-secondary/10 text-secondary' },
  ];

  return (
    <StudentLayout>
      <div className="p-8 max-w-5xl mx-auto w-full space-y-12 pb-20">
        <header className="space-y-2">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">My Profile</h2>
          <p className="text-on-surface-variant font-medium opacity-70">Manage your account settings and view your bootcamp affiliations.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Avatar Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col items-center text-center space-y-6 sticky top-24">
              <div className="w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center border-4 border-primary/10 relative group cursor-pointer overflow-hidden">
                <span className="material-symbols-outlined text-6xl text-primary opacity-40">account_circle</span>
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined">photo_camera</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-on-surface text-xl">{formData.fullName}</h3>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-[9px] font-black uppercase tracking-widest">Student</span>
                  <span className="px-3 py-1 bg-secondary text-on-secondary rounded-full text-[9px] font-black uppercase tracking-widest">Instructor</span>
                </div>
              </div>
              <div className="pt-4 w-full space-y-3 border-t border-outline-variant/10">
                <div className="flex items-center justify-between text-xs px-2">
                  <span className="font-bold text-on-surface-variant opacity-40 uppercase">Primary Division</span>
                  <span className="font-black text-on-surface">Engineering</span>
                </div>
                <div className="flex items-center justify-between text-xs px-2">
                  <span className="font-bold text-on-surface-variant opacity-40 uppercase">Member Since</span>
                  <span className="font-black text-on-surface">Jan 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Roles Section */}
          <div className="lg:col-span-2 space-y-10">
            {/* Account Details Form */}
            <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Username - NOT EDITABLE */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Username (Permanent)</label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={formData.username}
                        disabled
                        className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface-variant/50 cursor-not-allowed select-none"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm opacity-20">lock</span>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Academic Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 ml-1">Professional Bio</label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl px-5 py-4 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all min-h-[100px]"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button className="flex-1 bg-primary text-on-primary font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]">
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Roles & Affiliations Table */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-headline text-2xl font-extrabold text-on-surface">Roles & Affiliations</h3>
                <div className="h-[1px] flex-1 bg-outline-variant/20 mx-6"></div>
              </div>
              <div className="bg-surface-container-low/30 rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Bootcamp</th>
                      <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50">Role</th>
                      <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/30">
                    {affiliations.map((item) => (
                      <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-bright transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-on-surface text-sm">{item.bootcamp}</p>
                          <p className="text-[10px] font-medium text-on-surface-variant opacity-60 uppercase tracking-widest">{item.division} Division</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                            {item.role}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className={`w-2 h-2 rounded-full ${item.status === 'Active' ? 'bg-secondary' : 'bg-outline-variant'}`}></span>
                            <span className={`text-sm font-bold ${item.status === 'Active' ? 'text-secondary' : 'text-on-surface-variant/40'}`}>
                              {item.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfilePage;
