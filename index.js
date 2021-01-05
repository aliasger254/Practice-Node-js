const express = require("express");
const app = express();
var config = require("./config/keys");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose
  .connect(config.mongoURI, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// Cors
app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Users routes
require("./routes/users.routes")(app);

// Employees routes
require("./routes/employees.routes")(app);

// Clients routes
require("./routes/client.routes")(app);

// Tasks routes
require("./routes/tasks.routes")(app);

// WorkLogs routes
require("./routes/employee-log-routes")(app);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Worklog application.",
  });
});

app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${config.port}`);
});
