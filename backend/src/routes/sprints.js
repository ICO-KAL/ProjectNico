import express from 'express';
import { body, validationResult } from 'express-validator';
import db from '../database.js';

const router = express.Router();

// GET all sprints
router.get('/', async (req, res, next) => {
  try {
    const sprints = await db.getSprints();
    
    // Filter by status if provided
    let filtered = sprints;
    if (req.query.status) {
      filtered = sprints.filter(s => s.status === req.query.status);
    }
    
    res.json({ sprints: filtered, total: filtered.length });
  } catch (error) {
    next(error);
  }
});

// GET sprint by ID
router.get('/:id', async (req, res, next) => {
  try {
    const sprint = await db.getSprintById(req.params.id);
    
    if (!sprint) {
      return res.status(404).json({ error: 'Sprint not found' });
    }
    
    res.json(sprint);
  } catch (error) {
    next(error);
  }
});

// GET sprint tasks
router.get('/:id/tasks', async (req, res, next) => {
  try {
    const sprint = await db.getSprintById(req.params.id);
    
    if (!sprint) {
      return res.status(404).json({ error: 'Sprint not found' });
    }
    
    const tasks = await db.getTasks();
    const sprintTasks = tasks.filter(task => task.sprintId === req.params.id);
    
    const stats = {
      sprint: sprint,
      tasks: sprintTasks,
      total: sprintTasks.length,
      completed: sprintTasks.filter(t => t.status === 'completed').length,
      inProgress: sprintTasks.filter(t => t.status === 'in-progress').length,
      todo: sprintTasks.filter(t => t.status === 'todo').length,
      totalHours: sprintTasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0)
    };
    
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// POST create new sprint
router.post('/', [
  body('name').trim().notEmpty().withMessage('Sprint name is required'),
  body('description').optional().trim(),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('goal').optional().trim(),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const sprintData = {
      name: req.body.name,
      description: req.body.description || '',
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      goal: req.body.goal || '',
      teamMembers: req.body.teamMembers || []
    };
    
    const newSprint = await db.createSprint(sprintData);
    res.status(201).json(newSprint);
  } catch (error) {
    next(error);
  }
});

// PUT update sprint
router.put('/:id', async (req, res, next) => {
  try {
    const updates = {
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: req.body.status,
      goal: req.body.goal,
      velocity: req.body.velocity,
      teamMembers: req.body.teamMembers
    };
    
    const updatedSprint = await db.updateSprint(req.params.id, updates);
    
    if (!updatedSprint) {
      return res.status(404).json({ error: 'Sprint not found' });
    }
    
    res.json(updatedSprint);
  } catch (error) {
    next(error);
  }
});

export default router;
