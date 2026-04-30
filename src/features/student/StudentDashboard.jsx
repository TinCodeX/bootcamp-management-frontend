import React, { useEffect, useMemo, useState } from 'react';
import StudentLayout from '../../shared/components/StudentLayout';
import { studentService } from '../../api/studentService';
import { Link } from 'react-router-dom';

function safeList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bootcamps, setBootcamps] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    let active = true;
    async function loadStudentData() {
      setLoading(true);
      setError("");
      try {
        const [bootcampsRes, tasksRes, feedbackRes] = await Promise.all([
          studentService.getBootcamps(),
          studentService.getTasks(),
          studentService.getPendingFeedback(),
        ]);
        if (!active) return;
        setBootcamps(safeList(bootcampsRes.bootcamps));
        setTasks(safeList(tasksRes?.tasks || tasksRes));
        setFeedback(safeList(feedbackRes));
        // Optionally fetch divisions if available for students
        // setDivisions(safeList(divisionsRes));
      } catch (err) {
        if (!active) return;
        setError(err?.response?.data?.message || err?.message || "Failed to load dashboard data.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadStudentData();
    return () => { active = false; };
  }, []);

  const cards = useMemo(() => [
    { label: "My Bootcamps", value: bootcamps.length },
    { label: "Active Tasks", value: tasks.length },
    { label: "Pending Feedback", value: feedback.length },
  ], [bootcamps, tasks, feedback]);

  return (
    <StudentLayout>
      <div className="space-y-8 p-8 pb-20 max-w-7xl mx-auto">
        <section className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-gradient-to-br from-surface-container-low/80 to-surface/40 backdrop-blur-2xl p-8 shadow-xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Student Hub</p>
          <h2 className="text-4xl font-black mt-2 tracking-tight">Student Dashboard</h2>
          <p className="text-base text-on-surface-variant mt-2 max-w-2xl">
            Welcome! Track your bootcamps, assignments, and feedback in one place.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((item) => (
              <div key={item.label} className="group relative overflow-hidden bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">{item.label}</div>
                  <div className="text-3xl font-black mt-2 bg-linear-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-2">
          <section className="group relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-6 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <h3 className="text-xl font-bold tracking-tight">Recent Bootcamps</h3>
            <p className="text-sm text-on-surface-variant mt-1">Your latest bootcamps and learning tracks.</p>
            {bootcamps.length === 0 ? (
              <p className="text-sm text-on-surface-variant mt-4">No bootcamps found.</p>
            ) : (
              <ul className="space-y-3 text-sm mt-5">
                {bootcamps.slice(0, 6).map((bootcamp) => (
                  <li key={bootcamp?._id || bootcamp?.id} className="rounded-xl border border-outline-variant/20 bg-surface/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20">
                    <strong className="text-base">{bootcamp?.name || "Unnamed Bootcamp"}</strong>
                    {bootcamp?.description ? <p className="text-on-surface-variant mt-1 text-xs line-clamp-1">{bootcamp.description}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="group relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-6 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-bl from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <h3 className="text-xl font-bold tracking-tight">Pending Tasks</h3>
            <p className="text-sm text-on-surface-variant mt-1">Assignments and feedback requiring your attention.</p>
            {(tasks.length === 0 && feedback.length === 0) ? (
              <p className="text-sm text-on-surface-variant mt-4">No pending tasks. You're all caught up!</p>
            ) : (
              <ul className="space-y-3 text-sm mt-5">
                {tasks.slice(0, 6).map((task) => (
                  <li key={task?._id || task?.id} className="rounded-xl border border-outline-variant/20 bg-surface/60 p-4 flex justify-between items-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-secondary/20">
                    <span className="font-bold">{task?.title || "Untitled Task"}</span>
                    <Link to={`/student/assignments/brief/${task?.id || task?._id}`} className="text-primary text-xs font-bold underline">View</Link>
                  </li>
                ))}
                {feedback.slice(0, 6).map((fb) => (
                  <li key={fb?._id || fb?.id} className="rounded-xl border border-outline-variant/20 bg-surface/60 p-4 flex justify-between items-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-error/20">
                    <span className="font-bold">Feedback: {fb?.title || fb?.sessionTitle || "Session"}</span>
                    <Link to="/student/feedback" className="text-error text-xs font-bold underline">Give Feedback</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentDashboard;
