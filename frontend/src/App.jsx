import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ConfigureSimulation from './pages/ConfigureSimulation';
import SimulationRun from './pages/SimulationRun';
import SavedSimulations from './pages/SavedSimulations';
import ComparePage from './pages/ComparePage';
import Profile from './pages/Profile';
import InstructorStats from './pages/InstructorStats';
import Classroom from './pages/Classroom';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configure/:category"
          element={
            <ProtectedRoute>
              <ConfigureSimulation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simulate"
          element={
            <ProtectedRoute>
              <SimulationRun />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simulate/saved/:id"
          element={
            <ProtectedRoute>
              <SimulationRun />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedSimulations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compare"
          element={
            <ProtectedRoute>
              <ComparePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <InstructorStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom"
          element={
            <ProtectedRoute>
              <Classroom />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
