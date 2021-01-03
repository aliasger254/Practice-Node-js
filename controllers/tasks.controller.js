const mongoose = require("mongoose");
const Tasks = require("../models/tasks.model.js");
const Clients = require("../models/client.model.js");
const Employees = require("../models/employees.model");

exports.update = async (req, res) => {
  var task_id = req.params.taskId;
  var client_id = req.body.client_id;
  var employee_id = req.body.employee_id;
  if (!req.body) {
    return res.status(400).send({
      message: "task content can not be empty",
      body: req.body,
    });
  }

  if (!client_id) {
    return res.status(400).send({
      message: "Client id is required",
      body: req.body,
    });
  }

  if (!employee_id) {
    return res.status(400).send({
      message: "Employee id is required",
      body: req.body,
    });
  }
  var client = await getSingleClient(client_id);
  var employee = await getSingleEmployee(employee_id);
  if (client === 500 || employee === 500) {
    return res.status(400).send({
      message: "Something went wrong",
    });
  }

  Tasks.findByIdAndUpdate(
    task_id,
    {
      task_name: req.body.task_name,
      client: {
        _id: client_id,
        client_name: client[0].client_name,
        project_name: client[0].project_name,
      },
      assign_to: {
        _id: employee_id,
        employee_name: employee[0].first_name,
      },
      status: req.body.status,
      submit_date: req.body.submit_date,
      description: req.body.description,
    },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "task not found with id " + task_id,
        });
      }
      res.status(200).send(task);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "task not found with id " + task_id,
        });
      }
      return res.status(500).send({
        message: "Error updating task with id " + task_id,
      });
    });
};

exports.deleteTask = (req, res) => {
  var task_id = req.params.taskId;

  Tasks.findByIdAndRemove(task_id)
    .then((Tasks) => {
      if (!Tasks) {
        return res.status(404).send({
          message: "Tasks not found with id " + task_id,
        });
      }
      res.status(200).send({ message: "Tasks deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Tasks not found with id " + task_id,
        });
      }
      return res.status(500).send({
        message: "Could not delete Tasks with id " + task_id,
      });
    });
};

exports.findOne = (req, res) => {
  var task_id = req.params.taskId;
  Tasks.findById(task_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + task_id,
        });
      }
      res.status(200).send(task);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Task not found with id " + task_id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving task with id " + task_id,
      });
    });
};

exports.addTasks = async (req, res) => {
  var client_id = req.body.client_id;
  var employee_id = req.body.employee_id;

  if (!req.body) {
    return res.status(400).send({
      message: "task can not be empty",
      body: req.body,
    });
  }
  if (!client_id) {
    return res.status(400).send({
      message: "Client id is required",
      body: req.body,
    });
  }

  if (!employee_id) {
    return res.status(400).send({
      message: "Employee id is required",
      body: req.body,
    });
  }
  var client = await getSingleClient(client_id);
  var employee = await getSingleEmployee(employee_id);
  if (client === 500 || employee === 500) {
    return res.status(400).send({
      message: "Something went wrong",
    });
  }

  const task = new Tasks({
    _id: new mongoose.Types.ObjectId(),
    task_name: req.body.task_name,
    client: {
      _id: client_id,
      client_name: client[0].client_name,
      project_name: client[0].project_name,
    },
    assign_to: {
      _id: employee_id,
      employee_name: employee[0].first_name,
    },
    status: req.body.status,
    submit_date: req.body.submit_date,
    description: req.body.description,
  });

  task
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Task added successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the task.",
      });
    });
};

const getSingleEmployee = async (id) => {
  try {
    const employees = await Employees.find({ _id: id }).exec();
    console.log("employees", employees);
    return employees;
  } catch (err) {
    return "500";
  }
};

const getSingleClient = async (id) => {
  try {
    const client = await Clients.find({ _id: id }).exec();
    console.log("client", client);
    return client;
  } catch (err) {
    return "500";
  }
};

exports.getAllTasks = (req, res) => {
  Tasks.find()
    .then((task) => {
      if (task) {
        res.status(200).send({
          data: task,
        });
      } else {
        res.status(400).send({
          message: err.message || "Some error occurred while retrieving tasks.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};
