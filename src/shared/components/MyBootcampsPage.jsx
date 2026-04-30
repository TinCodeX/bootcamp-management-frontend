import { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import { studentService } from "../../api/studentService";
import { useBootcampPermissions } from "../../features/student/hooks/useBootcampPermissions";
import { Link } from "react-router-dom";


const getDivisionName = (bootcamp) => {
  if (!bootcamp?.division) return 'N/A';
  if (typeof bootcamp.division === 'object') return bootcamp.division.name || 'Unnamed Division';
  return bootcamp.division;
};

function BootcampRow({ bootcamp }) {
  const id = bootcamp?._id || bootcamp?.id;
  const { isLeadInstructor, loading: permLoading } = useBootcampPermissions(id);

  let badge;
  if (permLoading) {
    badge = (
      <span className="ml-2 px-2 py-1 rounded-lg bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border border-gray-200 animate-pulse">
        Checking...
      </span>
    );
  } else if (isLeadInstructor) {
    badge = (
      <span className="ml-2 px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
        Lead Instructor
      </span>
    );
  } else {
    badge = (
      <span className="ml-2 px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] border border-gray-200">
        Student
      </span>
    );
  }

  return (
    <tr
      className={`transition-colors hover:bg-surface-container-low/30 ${isLeadInstructor ? 'border-l-4 border-primary/60' : ''}`}
      key={id}
    >
      <td className="p-4 pl-6 align-middle">
        <span className="font-bold text-base text-primary">{bootcamp?.name || 'Unnamed Bootcamp'}</span>
        {badge}
        <p className="text-xs text-on-surface-variant mt-1 line-clamp-1 max-w-sm">{bootcamp?.description || 'No description'}</p>
      </td>
      <td className="p-4 align-middle text-on-surface-variant font-medium">
        <span className="bg-surface-container px-3 py-1 rounded-lg text-xs border border-outline-variant/20">{bootcamp.division_id?.name || getDivisionName(bootcamp)}</span>
      </td>
      <td className="p-4 align-middle">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${bootcamp?.isActive === false ? 'bg-error/10 text-error border border-error/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${bootcamp?.isActive === false ? 'bg-error' : 'bg-primary animate-pulse'}`} />
          {bootcamp?.isActive === false ? 'Archived' : 'Active'}
        </span>
      </td>
      <td className="p-4 pr-6 align-middle text-right">
        <Link
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all text-xs font-semibold"
          to={`/portal/bootcamps/${id}`}
        >
          View
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </td>
    </tr>
  );
}

const MyBootcampsPage = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBootcamps = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await studentService.getBootcamps();
        setBootcamps(Array.isArray(data) ? data : data?.bootcamps || []);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || 'Failed to load bootcamps.');
      } finally {
        setLoading(false);
      }
    };
    fetchBootcamps();
  }, []);

  // Sort: Instructor bootcamps first (using static fields only)
  const sortedBootcamps = [...bootcamps].sort((a, b) => {
    const aIsInstructor = a.userRole === 'leadInstructor' || a.relationship === 'leadInstructor' || a.isLeadInstructor;
    const bIsInstructor = b.userRole === 'leadInstructor' || b.relationship === 'leadInstructor' || b.isLeadInstructor;
    return bIsInstructor - aIsInstructor;
  });

  return (
    <StudentLayout>
      <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
        {/* Hero Title */}
        <div className="mb-12 mt-4">
          <h3 className="font-headline font-bold text-on-surface tracking-tight text-4xl md:text-5xl mb-4 leading-tight">My Bootcamps</h3>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            View and manage your active learning tracks and instructional responsibilities for the current academic session.
          </p>
        </div>

        {/* Bootcamp Stats */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
          <div className="group relative overflow-hidden bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-5">
            <div className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Total Bootcamps</div>
            <div className="text-3xl font-black mt-2 bg-linear-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent">{bootcamps.length}</div>
          </div>
          <div className="group relative overflow-hidden bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-5">
            <div className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Active</div>
            <div className="text-3xl font-black mt-2 bg-linear-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent">{bootcamps.filter(b => b.isActive !== false).length}</div>
          </div>
          <div className="group relative overflow-hidden bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-5">
            <div className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Archived</div>
            <div className="text-3xl font-black mt-2 bg-linear-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent">{bootcamps.filter(b => b.isActive === false).length}</div>
          </div>
        </div>

        {/* Bootcamp List */}
        <section className="rounded-3xl border border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md p-8 shadow-sm">
          {loading && <p className="text-sm animate-pulse">Loading bootcamps...</p>}
          {!loading && error && <p className="text-sm text-error bg-error/10 p-4 rounded-xl border border-error/20">{error}</p>}
          {!loading && !error && (
            <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface/60 backdrop-blur-sm shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-surface-container/50 text-left text-[11px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-outline-variant/20">
                  <tr>
                    <th className="p-4 pl-6">Name</th>
                    <th className="p-4">Division</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {sortedBootcamps.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-on-surface-variant font-medium">No bootcamps found.</td>
                    </tr>
                  ) : (
                    sortedBootcamps.map((item) => (
                      <BootcampRow key={item?._id || item?.id} bootcamp={item} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer Meta */}
        <footer className="mt-24 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-on-secondary-container rounded-full animate-pulse"></span>
            <p className="font-label text-xs tracking-wide text-on-surface-variant uppercase">Current Status: Academic Session Active</p>
          </div>
          <div className="flex gap-8">
            <a className="font-label text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity" href="#">Academy Policy</a>
            <a className="font-label text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity" href="#">Technical Support</a>
          </div>
        </footer>
      </main>
    </StudentLayout>
  );
};

export default MyBootcampsPage;
