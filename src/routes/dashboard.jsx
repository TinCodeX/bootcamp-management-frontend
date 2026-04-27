import StudentDashboard from "../features/student/studentdashboard";
import InstructorDashboard from "../features/instructor/instructordashboard";
import AdminDashboard from "../features/admin/admindashboard";

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