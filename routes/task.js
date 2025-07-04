const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
router.use(auth);

router.get("/:projectId", async (req, res) => {
  const filter = { project: req.params.projectId };
  if (req.query.status) filter.status = req.query.status;
  const Tasks = await task.find(filter);
  res.json(Tasks);
});

router.post("/:ProjectId", async (req, res) => {
  const task = new Task({ ...req.body, project: req.params.projectId });
  await task.save();
  res.json(task);
});
router.put("/:id", async (req, res) => {
  const update = await task.findByIdUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(update);
});
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
module.exports = router;
