const mongoose = require("mongoose");
const EmployeeLog = require("../models/employee-log.model");

// Update Worklog
exports.updateWorkLog = (req, res) => {
  var logId = req.params.employeeLogId;
  if (!req.body) {
    return res.status(400).send({
      message: "Log content can not be empty",
      body: req.body,
    });
  }

  EmployeeLog.findByIdAndUpdate(
    logId,
    {
      task_id: req.body.task_id,
      employee_id: req.body.employee_id,
      date_time_from: req.body.date_time_from,
      date_time_to: req.body.date_time_to,
      description: req.body.description,
    },
    { new: true }
  )
    .then((log) => {
      if (!log) {
        return res.status(404).send({
          message: "Log not found with id " + logId,
        });
      }
      res.status(200).send({
        data: log,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Log not found with id " + logId,
        });
      }
      return res.status(500).send({
        message: "Error updating log with id " + logId,
      });
    });
};

// Delete Worklog
exports.deleteWorkLog = (req, res) => {
  var employee_log_id = req.params.employeeLogId;

  EmployeeLog.findByIdAndRemove(employee_log_id)
    .then((log) => {
      if (!log) {
        return res.status(404).send({
          message: "Log not found with id " + employee_log_id,
        });
      }
      res.status(200).send({ message: "Log deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Log not found with id " + employee_log_id,
        });
      }
      return res.status(500).send({
        message: "Could not delete log with id " + employee_log_id,
      });
    });
};

// Get Single Work Log
exports.findOneWorkLog = (req, res) => {
  var employee_log_id = req.params.employeeLogId;
  EmployeeLog.findById(employee_log_id)
    .then((log) => {
      if (!log) {
        return res.status(404).send({
          message: "Log not found with id " + employee_log_id,
        });
      }
      res.status(200).send(log);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "log not found with id " + employee_log_id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving log with id " + employee_log_id,
      });
    });
};

// Add Work Log
exports.addWorkLog = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "log can not be empty",
      body: req.body,
    });
  }
  const log = new EmployeeLog({
    _id: new mongoose.Types.ObjectId(),
    task_id: req.body.task_id,
    employee_id: req.body.employee_id,
    date_time_from: req.body.date_time_from,
    date_time_to: req.body.date_time_to,
    description: req.body.description,
  });

  log
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Log added successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the log.",
      });
    });
};

// Get Emplolyee worklog
exports.getEmployeeWorkLog = (req, res) => {
  var employee_id = req.params.employeeId;
  EmployeeLog.find({ employee_id: employee_id })
    .then((logs) => {
      if (logs) {
        res.status(200).send({
          data: logs,
        });
      } else {
        res.status(400).send({
          message:
            err.message ||
            "Some error occurred while retrieving employee logs.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employee logs.",
      });
    });
};
