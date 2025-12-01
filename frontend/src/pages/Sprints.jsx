import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Target, TrendingUp, ChevronRight } from 'lucide-react';
import { sprintsAPI } from '../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

export default function Sprints() {
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSprints();
  }, []);

  const loadSprints = async () => {
    try {
      const { data } = await sprintsAPI.getAll();
      setSprints(data.sprints);
    } catch (error) {
      toast.error('Error al cargar sprints');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      default: return 'Planificado';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sprints</h1>
        <p className="text-gray-500">Gestiona tus sprints ágiles</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sprints.map((sprint) => (
          <Link
            key={sprint.id}
            to={`/sprints/${sprint.id}`}
            className="card hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {sprint.name}
                  </h3>
                  <span className={`badge ${getStatusColor(sprint.status)}`}>
                    {getStatusText(sprint.status)}
                  </span>
                </div>
                <p className="text-gray-600">{sprint.description}</p>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} className="text-primary-600" />
                <span>
                  {format(new Date(sprint.startDate), 'dd MMM', { locale: es })} - 
                  {format(new Date(sprint.endDate), 'dd MMM yyyy', { locale: es })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} className="text-primary-600" />
                <span>{sprint.teamMembers?.length || 0} miembros</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp size={16} className="text-primary-600" />
                <span>Velocidad: {sprint.velocity}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target size={16} className="text-primary-600" />
                <span className="truncate">{sprint.goal}</span>
              </div>
            </div>

            {sprint.goal && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Objetivo:</strong> {sprint.goal}
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
