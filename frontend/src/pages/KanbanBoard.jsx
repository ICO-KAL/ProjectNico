import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { tasksAPI, usersAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    { id: 'todo', title: 'Por Hacer', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'En Progreso', color: 'bg-blue-100' },
    { id: 'completed', title: 'Completadas', color: 'bg-green-100' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksRes, usersRes] = await Promise.all([
        tasksAPI.getAll(),
        usersAPI.getAll()
      ]);
      setTasks(tasksRes.data.tasks);
      setUsers(usersRes.data.users);
    } catch (error) {
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    if (columns.find(col => col.id === newStatus)) {
      try {
        await tasksAPI.updateStatus(taskId, newStatus);
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        ));
        toast.success('Tarea actualizada');
      } catch (error) {
        toast.error('Error al actualizar tarea');
      }
    }

    setActiveId(null);
  };

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

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tablero Kanban</h1>
          <p className="text-gray-500">Gestiona tus tareas con drag & drop</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva Tarea
        </button>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            
            return (
              <div key={column.id} className="flex flex-col">
                <div className={`${column.color} rounded-t-xl p-4 border-b-4 border-${column.id === 'todo' ? 'gray' : column.id === 'in-progress' ? 'blue' : 'green'}-400`}>
                  <h3 className="font-bold text-gray-900 flex items-center justify-between">
                    {column.title}
                    <span className="bg-white px-2 py-1 rounded-full text-sm">
                      {columnTasks.length}
                    </span>
                  </h3>
                </div>
                
                <SortableContext
                  id={column.id}
                  items={columnTasks.map(t => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="bg-gray-50 rounded-b-xl p-4 min-h-[500px] space-y-4">
                    {columnTasks.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        No hay tareas
                      </div>
                    ) : (
                      columnTasks.map(task => (
                        <div
                          key={task.id}
                          id={task.id}
                          className="cursor-move"
                        >
                          <TaskCard 
                            task={task} 
                            users={users} 
                            draggable
                            onEdit={handleOpenModal}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>
        
        <DragOverlay>
          {activeId ? (
            <div className="opacity-50">
              <TaskCard 
                task={tasks.find(t => t.id === activeId)} 
                users={users}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        onSuccess={handleTaskSuccess}
      />
    </div>
  );
}
