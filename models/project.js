const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String, enum: ["active", "completed"], default: "active" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("project", ProjectSchema);
