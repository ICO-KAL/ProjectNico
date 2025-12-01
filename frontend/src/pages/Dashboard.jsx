import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Users, Calendar, Plus } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { tasksAPI, usersAPI, sprintsAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, tasksRes, usersRes, sprintsRes] = await Promise.all([
        tasksAPI.getStats(),
        tasksAPI.getAll(),
        usersAPI.getAll(),
        sprintsAPI.getAll({ status: 'active' })
      ]);
      
      setStats(statsRes.data);
      setTasks(tasksRes.data.tasks);
      setUsers(usersRes.data.users);
      setSprints(sprintsRes.data.sprints);
    } catch (error) {
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleTaskSuccess = () => {
    loadData();
  };

  const handleDeleteTask = async (task) => {
    if (window.confirm(`¿Estás seguro de eliminar la tarea "${task.title}"?`)) {
      try {
        await tasksAPI.delete(task.id);
        toast.success('Tarea eliminada correctamente');
        loadData();
      } catch (error) {
        toast.error('Error al eliminar la tarea');
      }
    }
  };

  const recentTasks = tasks.slice(0, 6);
  const activeSprint = sprints[0];
  const completionRate = stats ? 
    Math.round((stats.byStatus.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">Vista general de tu proyecto</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Tareas"
          value={stats?.total || 0}
          icon={AlertCircle}
          color="primary"
        />
        <StatsCard
          title="En Progreso"
          value={stats?.byStatus['in-progress'] || 0}
          icon={Clock}
          color="warning"
        />
        <StatsCard
          title="Completadas"
          value={stats?.byStatus.completed || 0}
          icon={CheckCircle2}
          color="success"
          trend={`${completionRate}%`}
        />
        <StatsCard
          title="Por Hacer"
          value={stats?.byStatus.todo || 0}
          icon={TrendingUp}
          color="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Sprint */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Sprint Activo</h2>
              <Calendar className="text-primary-600" size={24} />
            </div>
            
            {activeSprint ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{activeSprint.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activeSprint.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Objetivo</p>
                    <p className="text-sm text-blue-900 mt-1">{activeSprint.goal}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Velocidad</p>
                    <p className="text-2xl font-bold text-green-900">{activeSprint.velocity}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {activeSprint.teamMembers?.length || 0} miembros
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No hay sprints activos</p>
            )}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Prioridades</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-red-600">Alta</span>
                <span className="text-sm text-gray-600">{stats?.byPriority.high || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${((stats?.byPriority.high || 0) / (stats?.total || 1)) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-yellow-600">Media</span>
                <span className="text-sm text-gray-600">{stats?.byPriority.medium || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all"
                  style={{ width: `${((stats?.byPriority.medium || 0) / (stats?.total || 1)) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-green-600">Baja</span>
                <span className="text-sm text-gray-600">{stats?.byPriority.low || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${((stats?.byPriority.low || 0) / (stats?.total || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Tareas Recientes</h2>
          <button 
            onClick={() => handleOpenModal()}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Nueva Tarea
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              users={users}
              onEdit={handleOpenModal}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        onSuccess={handleTaskSuccess}
      />
    </div>
  );
}
