module.exports = (app) => {
  const employees = require("../controllers/employees.controller");
  const Auth = require("../middilware/auth.middilware");

  app.post("/login-employee", employees.loginEmployee);

  app.get("/employees", Auth.ensureAuthenticated, employees.findAllEmployees);

  app.post("/add-employee", Auth.ensureAuthenticated, employees.addEmployee);

  app.put(
    "/employee/:employeeId",
    Auth.ensureAuthenticated,
    employees.updateEmployee
  );

  app.delete(
    "/employee/:employeeId",
    Auth.ensureAuthenticated,
    employees.deleteEmployee
  );
};
