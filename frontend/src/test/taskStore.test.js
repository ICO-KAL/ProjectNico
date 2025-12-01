import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../store/taskStore';

describe('Task Store', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] });
  });

  it('should initialize with empty tasks', () => {
    const { tasks } = useTaskStore.getState();
    expect(tasks).toEqual([]);
  });

  it('should add a task', () => {
    const newTask = {
      id: 'task-1',
      title: 'New Task',
      status: 'todo',
      priority: 'medium'
    };

    useTaskStore.getState().addTask(newTask);
    
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(newTask);
  });

  it('should update a task', () => {
    const task = {
      id: 'task-1',
      title: 'Original Title',
      status: 'todo'
    };

    useTaskStore.setState({ tasks: [task] });
    useTaskStore.getState().updateTask('task-1', { title: 'Updated Title' });

    const { tasks } = useTaskStore.getState();
    expect(tasks[0].title).toBe('Updated Title');
  });

  it('should delete a task', () => {
    const tasks = [
      { id: 'task-1', title: 'Task 1' },
      { id: 'task-2', title: 'Task 2' }
    ];

    useTaskStore.setState({ tasks });
    useTaskStore.getState().deleteTask('task-1');

    const state = useTaskStore.getState();
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].id).toBe('task-2');
  });

  it('should filter tasks by status', () => {
    const tasks = [
      { id: 'task-1', status: 'todo' },
      { id: 'task-2', status: 'completed' },
      { id: 'task-3', status: 'todo' }
    ];

    useTaskStore.setState({ tasks });
    const todoTasks = useTaskStore.getState().getTasksByStatus('todo');

    expect(todoTasks).toHaveLength(2);
    expect(todoTasks.every(t => t.status === 'todo')).toBe(true);
  });
});
