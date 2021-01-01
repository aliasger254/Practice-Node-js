const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Employees = require("../models/employees.modal");
const config = require("../config/keys");

// Login Employee
exports.loginEmployee = (req, res) => {
  Employees.findOne(
    {
      email: req.body.email,
    },
    (err, employee) => {
      if (employee === null) {
        res.status(400).send(err);
      } else {
        if (employee.validPassword(req.body.password)) {
          return res.status(201).send({
            token: jwt.sign(
              {
                email: employee.email,
                first_name: employee.first_name,
                _id: employee._id,
              },
              config.jwtSecret
            ),
            message: "Employee logged In",
          });
        } else {
          return res.status(401).send({
            message: "Authentication failed. Invalid employee or password.",
            employee: employee,
            password: employee.validPassword(req.body.password),
          });
        }
      }
    }
  );
};

// Get All Employee
exports.findAllEmployees = (req, res) => {
  Employees.find()
    .then((employees) => {
      res.status(200).send(employees);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while retrieving employees.",
      });
    });
};

// AddEmployee
exports.addEmployee = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Employee can not be empty",
      body: req.body,
    });
  }

  const employee = new Employees({
    _id: new mongoose.Types.ObjectId(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    designation: req.body.designation,
    password: req.body.password,
  });

  employee.setPassword(req.body.password);

  Employees.findOne({ email: req.body.email }).then((emp) => {
    if (emp) {
      res.status(400).send({
        message: req.body.email + " email already register",
      });
    } else {
      employee.save().then((data) => {
        res
          .status(201)
          .send({
            message: "Employee added successfully",
            data: data,
          })
          .catch((err) => {
            res.status(400).send({
              message:
                err.message ||
                "Some error occurred while creating the employee.",
            });
          });
      });
    }
  });
};

// Update Employee
exports.updateEmployee = (req, res) => {
  var id = req.params.employeeId;
  if (!id) {
    res.status(400).send({
      message: "Employee Id is required",
    });
  }

  if (!req.body) {
    res.status(400).send({
      message: "Employee content can not be empty",
    });
  }

  Employees.findByIdAndUpdate(
    id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      designation: req.body.designation,
      email: req.body.email,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Employee not found with id " + id,
        });
      }
      res.status(200).send({
        message: "Employee update successfully",
        data: result,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + id,
        });
      }
      return res.status(500).send({
        message: "Error updating employee with id " + id,
      });
    });
};

// Delete Employee
exports.deleteEmployee = (req, res) => {
  Employees.findByIdAndRemove(req.params.employeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      res.status(200).send({ message: "Employee deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete employee with id " + req.params.employeeId,
      });
    });
};
