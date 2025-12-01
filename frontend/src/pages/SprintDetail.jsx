import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Target, Users, TrendingUp } from 'lucide-react';
import { sprintsAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import StatsCard from '../components/StatsCard';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

export default function SprintDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSprintData();
  }, [id]);

  const loadSprintData = async () => {
    try {
      const { data: sprintData } = await sprintsAPI.getTasks(id);
      setData(sprintData);
    } catch (error) {
      toast.error('Error al cargar sprint');
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

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Sprint no encontrado</p>
      </div>
    );
  }

  const { sprint, tasks, total, completed, inProgress, todo, totalHours } = data;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/sprints" className="btn btn-secondary">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{sprint.name}</h1>
          <p className="text-gray-500 mt-1">{sprint.description}</p>
        </div>
      </div>

      {/* Sprint Info */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Calendar size={24} />
            <div>
              <p className="text-sm text-primary-100">Periodo</p>
              <p className="font-semibold">
                {format(new Date(sprint.startDate), 'dd MMM', { locale: es })} - 
                {format(new Date(sprint.endDate), 'dd MMM', { locale: es })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Target size={24} />
            <div>
              <p className="text-sm text-primary-100">Objetivo</p>
              <p className="font-semibold truncate">{sprint.goal}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users size={24} />
            <div>
              <p className="text-sm text-primary-100">Equipo</p>
              <p className="font-semibold">{sprint.teamMembers?.length || 0} miembros</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TrendingUp size={24} />
            <div>
              <p className="text-sm text-primary-100">Velocidad</p>
              <p className="font-semibold">{sprint.velocity} puntos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Tareas" value={total} color="primary" />
        <StatsCard title="Por Hacer" value={todo} color="danger" />
        <StatsCard title="En Progreso" value={inProgress} color="warning" />
        <StatsCard 
          title="Completadas" 
          value={completed} 
          color="success"
          trend={`${completionRate}%`}
        />
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Progreso del Sprint</h3>
          <span className="text-sm text-gray-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{completed} completadas</span>
          <span>{total - completed} restantes</span>
        </div>
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tareas del Sprint</h2>
        {tasks.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No hay tareas en este sprint</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
