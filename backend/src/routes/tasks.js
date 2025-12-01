import express from 'express';
import { body, validationResult } from 'express-validator';
import db from '../database.js';

const router = express.Router();

// Validation middleware
const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('status').isIn(['todo', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('assignedTo').optional().trim(),
  body('sprintId').optional().trim(),
  body('estimatedHours').optional().isNumeric(),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await db.getTasks();
    
    // Filter by query parameters
    let filtered = tasks;
    
    if (req.query.status) {
      filtered = filtered.filter(task => task.status === req.query.status);
    }
    
    if (req.query.sprintId) {
      filtered = filtered.filter(task => task.sprintId === req.query.sprintId);
    }
    
    if (req.query.assignedTo) {
      filtered = filtered.filter(task => task.assignedTo === req.query.assignedTo);
    }
    
    if (req.query.priority) {
      filtered = filtered.filter(task => task.priority === req.query.priority);
    }
    
    res.json({ tasks: filtered, total: filtered.length });
  } catch (error) {
    next(error);
  }
});

// GET task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const task = await db.getTaskById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// POST create new task
router.post('/', validateTask, handleValidationErrors, async (req, res, next) => {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'todo',
      priority: req.body.priority || 'medium',
      assignedTo: req.body.assignedTo || null,
      sprintId: req.body.sprintId || null,
      estimatedHours: req.body.estimatedHours || 0,
      tags: req.body.tags || []
    };
    
    const newTask = await db.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

// PUT update task
router.put('/:id', validateTask, handleValidationErrors, async (req, res, next) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      assignedTo: req.body.assignedTo,
      sprintId: req.body.sprintId,
      estimatedHours: req.body.estimatedHours,
      tags: req.body.tags
    };
    
    const updatedTask = await db.updateTask(req.params.id, updates);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

// PATCH update task status (for drag & drop)
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['todo', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const updatedTask = await db.updateTask(req.params.id, { status });
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

// DELETE task
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await db.deleteTask(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// GET task statistics
router.get('/stats/overview', async (req, res, next) => {
  try {
    const tasks = await db.getTasks();
    
    const stats = {
      total: tasks.length,
      byStatus: {
        todo: tasks.filter(t => t.status === 'todo').length,
        'in-progress': tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
      },
      byPriority: {
        low: tasks.filter(t => t.priority === 'low').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        high: tasks.filter(t => t.priority === 'high').length
      },
      totalEstimatedHours: tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0)
    };
    
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;
