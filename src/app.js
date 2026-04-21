const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// In-memory task store (no DB needed for demo)
let tasks = [];
let nextId = 1;
let credits = 10;

const TASK_CREATION_COST = 1;
const TASK_COMPLETION_REWARD = 3;
const DEFAULT_CREDITS = 10;

// Demo authentication endpoint. A production app should use hashed
// passwords, persistent users, sessions/JWTs, and HTTPS-only cookies.
app.post('/api/auth/login', (req, res) => {
  const { name, email } = req.body;
  const displayName = (name || '').trim();
  const userEmail = (email || '').trim();

  if (!displayName || !userEmail) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }

  res.json({
    success: true,
    user: {
      name: displayName,
      email: userEmail
    },
    credits
  });
});

app.get('/api/credits', (req, res) => {
  res.json({
    success: true,
    credits,
    rules: {
      taskCreationCost: TASK_CREATION_COST,
      taskCompletionReward: TASK_COMPLETION_REWARD
    }
  });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json({ success: true, tasks, credits });
});

// POST create task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  if (credits < TASK_CREATION_COST) {
    return res.status(402).json({
      success: false,
      message: 'Not enough credits to add a new task'
    });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    creditsAwarded: false
  };
  tasks.push(task);
  credits -= TASK_CREATION_COST;
  res.status(201).json({ success: true, task, credits });
});

// PATCH toggle complete
app.patch('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }
  task.completed = !task.completed;
  let creditsEarned = 0;
  if (task.completed && !task.creditsAwarded) {
    credits += TASK_COMPLETION_REWARD;
    task.creditsAwarded = true;
    creditsEarned = TASK_COMPLETION_REWARD;
  }
  res.json({ success: true, task, credits, creditsEarned });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.json({ success: true, message: 'Task deleted', credits });
});

// Reset tasks (used in tests)
app.post('/api/tasks/reset', (req, res) => {
  tasks = [];
  nextId = 1;
  credits = DEFAULT_CREDITS;
  res.json({ success: true, credits });
});

module.exports = app;
