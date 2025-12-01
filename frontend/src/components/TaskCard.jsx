import { Clock, User, Calendar, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TaskCard({ task, users, onEdit, onDelete, draggable = false }) {
  const assignedUser = users?.find(u => u.id === task.assignedTo);

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(task);
  };
  
  const priorityColors = {
    low: 'badge-low',
    medium: 'badge-medium',
    high: 'badge-high'
  };
  
  const statusColors = {
    todo: 'badge-todo',
    'in-progress': 'badge-in-progress',
    completed: 'badge-completed'
  };

  return (
    <div className="card hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
          {task.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`badge ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100"
              title="Editar tarea"
            >
              <Edit2 size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
              title="Eliminar tarea"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags?.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {assignedUser && (
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{assignedUser.name?.split(' ')[0]}</span>
            </div>
          )}
          {task.estimatedHours > 0 && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{task.estimatedHours}h</span>
            </div>
          )}
        </div>
        <span className={`badge ${statusColors[task.status]} text-xs`}>
          {task.status === 'in-progress' ? 'En Progreso' : 
           task.status === 'completed' ? 'Completada' : 'Por Hacer'}
        </span>
      </div>
    </div>
  );
}
