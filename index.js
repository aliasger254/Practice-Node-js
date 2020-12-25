const express = require("express");
const app = express();
const port = 786;
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = `mongodb+srv://Aliasger:ZxUrrh32cQsCj9GG@cluster0.cmiu6.mongodb.net/worklog?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose
  .connect(url, connectionParams)
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

// users routes
require("./routes/users.routes.js")(app);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Worklog application.",
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
