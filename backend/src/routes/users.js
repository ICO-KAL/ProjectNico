import express from 'express';
import db from '../database.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await db.getUsers();
    
    // Remove password from response
    const safeUsers = users.map(({ password, ...user }) => user);
    
    res.json({ users: safeUsers, total: safeUsers.length });
  } catch (error) {
    next(error);
  }
});

// GET user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove password from response
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    next(error);
  }
});

// GET user tasks
router.get('/:id/tasks', async (req, res, next) => {
  try {
    const tasks = await db.getTasks();
    const userTasks = tasks.filter(task => task.assignedTo === req.params.id);
    
    res.json({ tasks: userTasks, total: userTasks.length });
  } catch (error) {
    next(error);
  }
});

export default router;
