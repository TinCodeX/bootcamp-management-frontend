import StudentDashboard from "../features/student/StudentDashboard";
import InstructorDashboard from "../features/instructor/InstructorDashboard";
import AdminDashboard from "../features/admin/AdminDashboard";

const user = {
  role: "student", // later comes from backend
};

function Dashboard() {
  switch (user.role) {
    case "student":
      return <StudentDashboard />;
    case "instructor":
      return <InstructorDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
}

export default Dashboard;