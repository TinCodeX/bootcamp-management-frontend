import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./features/student/StudentLogin";
import StudentDashboard from "./features/student/StudentDashboard";
import StudentBootcamps from "./features/student/StudentBootcamps";
import StudentSessions from "./features/student/StudentSessions";
import StudentAssignments from "./features/student/StudentAssignments";
import StudentResources from "./features/student/StudentResources";
import StudentAttendance from "./features/student/StudentAttendance";
import StudentFeedback from "./features/student/StudentFeedback";
import FullSchedulePage from "./shared/components/FullSchedulePage";
import FullPastSessionsPage from "./shared/components/FullPastSessionsPage";
import FullAttendanceHistoryPage from "./shared/components/FullAttendanceHistoryPage";
import FullAssignmentsHistoryPage from "./shared/components/FullAssignmentsHistoryPage";
import FullUpcomingAssignmentsPage from "./shared/components/FullUpcomingAssignmentsPage";
import FullResourcesListPage from "./shared/components/FullResourcesListPage";
import StudentNotificationsPage from "./shared/components/StudentNotificationsPage";
import StudentProfilePage from "./shared/components/StudentProfilePage";
import AssignmentSubmitPage from "./shared/components/AssignmentSubmitPage";
import AssignmentBriefPage from "./shared/components/AssignmentBriefPage";
import AssignmentResultPage from "./shared/components/AssignmentResultPage";
import SubmissionSuccessPage from "./shared/components/SubmissionSuccessPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/my-bootcamps" element={<StudentBootcamps />} />
        <Route path="/student/sessions" element={<StudentSessions />} />
        <Route path="/student/sessions/schedule" element={<FullSchedulePage />} />
        <Route path="/student/sessions/history" element={<FullPastSessionsPage />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/assignments/history" element={<FullAssignmentsHistoryPage />} />
        <Route path="/student/assignments/upcoming" element={<FullUpcomingAssignmentsPage />} />
        <Route path="/student/resources" element={<StudentResources />} />
        <Route path="/student/resources/:type" element={<FullResourcesListPage />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/attendance/history" element={<FullAttendanceHistoryPage />} />
        <Route path="/student/notifications" element={<StudentNotificationsPage />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/student/feedback" element={<StudentFeedback />} />
        <Route path="/student/assignments/submit/:id" element={<AssignmentSubmitPage />} />
        <Route path="/student/assignments/brief/:id" element={<AssignmentBriefPage />} />
        <Route path="/student/assignments/result/:id" element={<AssignmentResultPage />} />
        <Route path="/student/success" element={<SubmissionSuccessPage />} />

        {/* Legacy Redirects */}
        <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/sessions" element={<Navigate to="/student/sessions" replace />} />
        <Route path="/assignments" element={<Navigate to="/student/assignments" replace />} />
        <Route path="/resources" element={<Navigate to="/student/resources" replace />} />
        <Route path="/attendance" element={<Navigate to="/student/attendance" replace />} />
      </Routes>
    </Router>
  );
}

export default App;