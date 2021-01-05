const mongoose = require("mongoose");

let employeeLogSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  task_id: String,
  employee_id: String,
  date_time_from: Date,
  date_time_to: Date,
  description: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("employeeLog", employeeLogSchema);
