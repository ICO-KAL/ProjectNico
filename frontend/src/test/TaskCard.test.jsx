import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TaskCard from '../components/TaskCard';

const mockTask = {
  id: 'task-1',
  title: 'Test Task',
  description: 'This is a test task',
  status: 'todo',
  priority: 'high',
  estimatedHours: 5,
  tags: ['testing', 'frontend']
};

const mockUsers = [
  { id: 'user-1', name: 'Test User' }
];

describe('TaskCard', () => {
  it('renders task title correctly', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TaskCard task={mockTask} users={mockUsers} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('displays task description', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TaskCard task={mockTask} users={mockUsers} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('This is a test task')).toBeInTheDocument();
  });

  it('shows priority badge', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TaskCard task={mockTask} users={mockUsers} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('displays estimated hours', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TaskCard task={mockTask} users={mockUsers} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('5h')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TaskCard task={mockTask} users={mockUsers} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();
  });
});
