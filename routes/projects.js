const jwt = require("jsonwebtoken");
const express = require("express");
const Project = require("../models/project"); // ✅ capitalized model name
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.use(auth);

// GET all projects
router.get("/", async (req, res) => {
  const projects = await Project.find({ user: req.user.userId });
  res.json(projects);
});

// CREATE new project
router.post("/", async (req, res) => {
  try {
    const project = new Project({ ...req.body, user: req.user.userId });
    await project.save();
    console.log(project, "Projects--------");
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Project creation failed" });
  }
});

// UPDATE project
router.put("/:id", async (req, res) => {
  const update = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    { new: true }
  );
  res.json(update);
});

// DELETE project
router.delete("/:id", async (req, res) => {
  await Project.deleteOne({ _id: req.params.id, user: req.user.userId });
  res.json({ message: "Deleted" });
});

module.exports = router;
