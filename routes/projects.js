const jwt = require("jsonwebtoken");
const express = require("express");
const project = require("../models/project");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  const projects = await project.find({ user: req.user.userId });
  res.json(projects);
});

router.post("/", async (req, res) => {
  const project = await project.save({ ...req.body, user: req.user.userId });
  await project.save();
  res.json(project);
});

router.put("/:id", async (req, res) => {
  const update = await project.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.userId,
    },
    req.body,
    { new: true }
  );
  res.json(update);
});

router.delete("/:id", async (req, res) => {
  await project.deleteOne({ _id: req.params.id, user: req.user.userId });
  res.json({ message: "Deleted" });
});

module.exports = router;
