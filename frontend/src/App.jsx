import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import Sprints from './pages/Sprints';
import SprintDetail from './pages/SprintDetail';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="sprints" element={<Sprints />} />
          <Route path="sprints/:id" element={<SprintDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
