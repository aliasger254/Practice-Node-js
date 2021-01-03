const mongoose = require("mongoose");

let clientSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  client_name: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  technology: String,
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("client", clientSchema);
