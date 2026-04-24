import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StudentLayout from './StudentLayout';

const StudentNotificationsPage = () => {
  const location = useLocation();
  const isGlobal = location.state?.fromGlobal ?? true;

  const initialNotifications = [
    { id: 1, type: 'Student', title: 'New Assignment Posted', message: 'React Hooks & State Management is now available.', time: '2 hours ago', icon: 'assignment', color: 'bg-primary/10 text-primary', unread: true },
    { id: 2, type: 'Instructor', title: 'Session Rescheduled', message: 'The masterclass with Lelo Mohammed has been moved to 3 PM.', time: '5 hours ago', icon: 'schedule', color: 'bg-secondary/10 text-secondary', unread: true },
    { id: 3, type: 'Helper', title: 'Resource Update', message: 'New docs added to the "Backend Mastery" module.', time: 'Yesterday', icon: 'library_books', color: 'bg-tertiary/10 text-tertiary', unread: false },
    { id: 4, type: 'Student', title: 'Grade Published', message: 'Your "UI Design Principles" submission has been graded.', time: '2 days ago', icon: 'grade', color: 'bg-primary/10 text-primary', unread: true },
    { id: 5, type: 'System', title: 'Maintenance Notice', message: 'The portal will be down for maintenance on Sunday.', time: '3 days ago', icon: 'settings', color: 'bg-on-surface-variant/10 text-on-surface-variant', unread: false },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = isGlobal ? notifications : notifications.filter(n => n.type === 'Student');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-10 pb-20">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">Notifications</h2>
            <p className="text-on-surface-variant font-medium opacity-70">
              {isGlobal ? 'Showing all alerts for Student, Instructor, and Helper roles.' : 'Showing relevant updates for your current bootcamp.'}
            </p>
          </div>
          {filteredNotifications.some(n => n.unread) && (
            <button
              onClick={markAllAsRead}
              className="px-6 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all active:scale-95"
            >
              Mark all as read
            </button>
          )}
        </header>

        <div className="space-y-4">
          {filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`relative bg-surface-container-lowest p-6 rounded-2xl border ${n.unread ? 'border-primary/20 shadow-md' : 'border-outline-variant/10 shadow-sm'} flex items-start gap-6 group hover:bg-surface-bright transition-all duration-300`}
            >
              {n.unread && <div className="absolute top-6 left-2 w-1.5 h-1.5 bg-primary rounded-full"></div>}
              <div className={`w-12 h-12 rounded-xl ${n.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${n.unread ? 'text-primary' : 'opacity-40'}`}>{n.type}</span>
                  <span className="text-[10px] font-bold text-on-surface-variant opacity-40">{n.time}</span>
                </div>
                <h4 className={`font-bold text-on-surface text-lg mb-1 ${n.unread ? '' : 'opacity-70'}`}>{n.title}</h4>
                <p className={`text-on-surface-variant text-sm font-medium leading-relaxed ${n.unread ? 'opacity-90' : 'opacity-60'}`}>{n.message}</p>
              </div>
              <button
                onClick={() => dismissNotification(n.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-on-surface-variant hover:text-error transition-all"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="py-24 text-center space-y-6 bg-surface-container-low/30 rounded-[3rem] border-2 border-dashed border-outline-variant/20">
              <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mx-auto text-outline-variant/40">
                <span className="material-symbols-outlined text-5xl">notifications_off</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">No Notifications</h3>
                <p className="text-on-surface-variant font-medium opacity-60 max-w-xs mx-auto">You're all caught up! There are no new alerts at the moment.</p>
              </div>
              <button
                onClick={() => setNotifications(initialNotifications)}
                className="text-primary font-bold text-sm hover:underline"
              >
                Reset Demo Data
              </button>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentNotificationsPage;
