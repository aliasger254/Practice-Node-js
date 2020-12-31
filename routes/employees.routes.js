module.exports = (app) => {
  const jwt = require("jsonwebtoken");
  const config = require("../config/keys");
  const employees = require("../controllers/employees.controller");

  const ensureAuthenticated = (req, res, next) => {
    console.log("ensureAuthenticated", req.headers);
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "JWT"
    ) {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        config.jwtSecret,
        function (err, decode) {
          if (err) req.user = undefined;
          req.user = decode;
          next();
        }
      );
    } else {
      req.user = undefined;
      next();
    }
  };

  app.post("/login-employee", employees.loginEmployee);

  app.get("/employees", ensureAuthenticated, employees.findAllEmployees);

  app.post("/add-employee", ensureAuthenticated, employees.addEmployee);

  app.delete(
    "/employee/:employeeId",
    ensureAuthenticated,
    employees.deleteEmployee
  );
};
