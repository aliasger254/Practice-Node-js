const Clients = require("../models/client.model.js");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Client can not be empty",
      body: req.body,
    });
  }

  const client = new Clients({
    _id: new mongoose.Types.ObjectId(),
    client_name: req.body.client_name,
    project_name: req.body.project_name,
    description: req.body.description,
    technology: req.body.technology,
  });

  client
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Client added successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client.",
      });
    });
};

exports.findAll = (req, res) => {
  Clients.find()
    .then((clients) => {
      res.status(200).send({
        data: clients,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients.",
      });
    });
};

exports.findOne = (req, res) => {
  var client_id = req.params.clientId;
  Clients.findById(client_id)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "client not found with id " + client_id,
        });
      }
      res.status(200).send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Client not found with id " + client_id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving client with id " + client_id,
      });
    });
};

exports.update = (req, res) => {
  var client_id = req.params.clientId;
  if (!req.body) {
    return res.status(400).send({
      message: "client content can not be empty",
      body: req.body,
    });
  }

  Clients.findByIdAndUpdate(
    client_id,
    {
      client_name: req.body.client_name,
      project_name: req.body.project_name,
      description: req.body.description,
      technology: req.body.technology,
    },
    { new: true }
  )
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Client not found with id " + client_id,
        });
      }
      res.status(200).send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Client not found with id " + client_id,
        });
      }
      return res.status(500).send({
        message: "Error updating client with id " + client_id,
      });
    });
};

exports.delete = (req, res) => {
  var client_id = req.params.clientId;

  Clients.findByIdAndRemove(client_id)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "client not found with id " + client_id,
        });
      }
      res.status(200).send({ message: "Client deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "client not found with id " + client_id,
        });
      }
      return res.status(500).send({
        message: "Could not delete client with id " + client_id,
      });
    });
};
