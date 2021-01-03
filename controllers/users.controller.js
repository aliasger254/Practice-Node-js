const Users = require("../models/users.model.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");

// Login User
exports.loginUser = (req, res) => {
  Users.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (user === null) {
        res.status(400).send(err);
      } else {
        if (user.validPassword(req.body.password)) {
          return res.status(201).send({
            token: jwt.sign(
              {
                email: user.email,
                name: user.name,
                _id: user._id,
              },
              config.jwtSecret
            ),
            message: "User logged In",
            data: user,
          });
        } else {
          return res.status(401).send({
            message: "Authentication failed. Invalid user email or password.",
            user: user,
          });
        }
      }
    }
  );
};

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "User can not be empty",
      body: req.body,
    });
  }

  const user = new Users({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  });

  user.setPassword(req.body.password);

  Users.findOne({ email: req.body.email }).then((singleUser) => {
    if (singleUser) {
      res.status(400).send({
        message: req.body.email + " email already register",
      });
    } else {
      user
        .save()
        .then((data) => {
          res.status(200).send({
            message: "User added successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Users.",
          });
        });
    }
  });
};

exports.findAll = (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).send({
        data: users,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.findOne = (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
      body: req.body,
    });
  }

  Users.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

exports.delete = (req, res) => {
  Users.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.status(200).send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
