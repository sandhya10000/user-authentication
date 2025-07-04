const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// GET tasks for a specific project with optional status filter
router.get("/:projectId", async (req, res) => {
  try {
    const filter = { project: req.params.projectId };
    if (req.query.status) filter.status = req.query.status;

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// POST a new task under a specific project
router.post("/:projectId", async (req, res) => {
  try {
    const task = new Task({ ...req.body, project: req.params.projectId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
});

// PUT update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: err.message });
  }
});

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
});

module.exports = router;
