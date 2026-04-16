import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes wrapped in common Layout for dashboard ui */}
        <Route path="/" element={<Layout />}>
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route path="student/*" element={<StudentDashboard />} />
          <Route path="faculty/*" element={<FacultyDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
