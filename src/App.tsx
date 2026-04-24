import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentLogin from "./features/student/studentlogin";
import StudentDashboard from "./features/student/studentdashboard";
import StudentBootcamps from "./features/student/studentbootcamps";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/my-bootcamps" element={<StudentBootcamps />} />
      </Routes>
    </Router>
  );
}

export default App;