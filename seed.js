const mongoose = require("mongoose");
const auth = require("./middleware/authMiddleware");
const User = require("./models/user");
const Project = require("./models/project");
const Task = require("./models/task");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Project.deleteMany();
  await Task.deleteMany();

  const hashed = await bcrypt.hash("Test@123", 10);
  const user = await User.create({
    email: "test@example.com",
    password: hashed,
  });

  for (let i = 1; i <= 2; i++) {
    const project = await Project.create({
      title: `Project ${i}`,
      description: `Description for Project ${i}`,
      status: "active",
      user: user._id,
    });

    for (let j = 1; j <= 3; j++) {
      await Task.create({
        title: `Task ${j}`,
        description: `Task ${j} description`,
        status: "todo",
        dueDate: new Date(),
        project: project._id,
      });
    }
  }

  console.log("Seed complete");
  process.exit();
}
seed();
