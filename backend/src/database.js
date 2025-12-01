import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../../database');

class Database {
  async readFile(filename) {
    try {
      const filePath = path.join(DB_PATH, filename);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      throw new Error(`Database read error: ${filename}`);
    }
  }

  async writeFile(filename, data) {
    try {
      const filePath = path.join(DB_PATH, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
      throw new Error(`Database write error: ${filename}`);
    }
  }

  // Tasks operations
  async getTasks() {
    const data = await this.readFile('tasks.json');
    return data.tasks;
  }

  async getTaskById(id) {
    const tasks = await this.getTasks();
    return tasks.find(task => task.id === id);
  }

  async createTask(task) {
    const data = await this.readFile('tasks.json');
    const newTask = {
      id: `task-${Date.now()}`,
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.tasks.push(newTask);
    await this.writeFile('tasks.json', data);
    return newTask;
  }

  async updateTask(id, updates) {
    const data = await this.readFile('tasks.json');
    const index = data.tasks.findIndex(task => task.id === id);
    if (index === -1) return null;
    
    data.tasks[index] = {
      ...data.tasks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await this.writeFile('tasks.json', data);
    return data.tasks[index];
  }

  async deleteTask(id) {
    const data = await this.readFile('tasks.json');
    const index = data.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    
    data.tasks.splice(index, 1);
    await this.writeFile('tasks.json', data);
    return true;
  }

  // Users operations
  async getUsers() {
    const data = await this.readFile('users.json');
    return data.users;
  }

  async getUserById(id) {
    const users = await this.getUsers();
    return users.find(user => user.id === id);
  }

  async getUserByUsername(username) {
    const users = await this.getUsers();
    return users.find(user => user.username === username);
  }

  async createUser(user) {
    const data = await this.readFile('users.json');
    const newUser = {
      id: `user-${Date.now()}`,
      ...user,
      createdAt: new Date().toISOString()
    };
    data.users.push(newUser);
    await this.writeFile('users.json', data);
    return newUser;
  }

  // Sprints operations
  async getSprints() {
    const data = await this.readFile('sprints.json');
    return data.sprints;
  }

  async getSprintById(id) {
    const sprints = await this.getSprints();
    return sprints.find(sprint => sprint.id === id);
  }

  async createSprint(sprint) {
    const data = await this.readFile('sprints.json');
    const newSprint = {
      id: `sprint-${Date.now()}`,
      ...sprint,
      velocity: 0,
      status: 'planned'
    };
    data.sprints.push(newSprint);
    await this.writeFile('sprints.json', data);
    return newSprint;
  }

  async updateSprint(id, updates) {
    const data = await this.readFile('sprints.json');
    const index = data.sprints.findIndex(sprint => sprint.id === id);
    if (index === -1) return null;
    
    data.sprints[index] = {
      ...data.sprints[index],
      ...updates
    };
    await this.writeFile('sprints.json', data);
    return data.sprints[index];
  }
}

export default new Database();
