const mongoose = require("mongoose");

let tasksSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  task_name: String,
  client: {
    _id: String,
    client_name: String,
    project_name: String,
  },
  assign_to: {
    _id: String,
    employee_name: String,
  },
  status: String,
  submit_date: Date,
  description: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tasks", tasksSchema);
