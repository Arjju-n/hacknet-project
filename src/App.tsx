import React, { useState } from 'react';
import { Users, Shield, GraduationCap, ArrowRight, Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AuthPage from './components/AuthPage';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';

export type UserRole = 'student' | 'admin' | 'faculty' | null;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleBackToHome = () => {
    setCurrentRole(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentRole(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {!isAuthenticated && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
      
      {isAuthenticated && currentRole === null && (
        <LandingPage onRoleSelect={handleRoleSelect} />
      )}
      
      {isAuthenticated && currentRole === 'student' && (
        <StudentDashboard onBack={handleBackToHome} />
      )}
      
      {isAuthenticated && currentRole === 'admin' && (
        <AdminDashboard onBack={handleBackToHome} />
      )}
      
      {isAuthenticated && currentRole === 'faculty' && (
        <FacultyDashboard onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;