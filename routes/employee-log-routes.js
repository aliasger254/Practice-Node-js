module.exports = (app) => {
  const worklogs = require("../controllers/employee-log.controller");
  const Auth = require("../middilware/auth.middilware");

  app.get(
    "/worklogs/:employeeId",
    Auth.ensureAuthenticated,
    worklogs.getEmployeeWorkLog
  );

  app.post("/add-worklog", Auth.ensureAuthenticated, worklogs.addWorkLog);

  app.get(
    "/worklogs/worklog/:employeeLogId",
    Auth.ensureAuthenticated,
    worklogs.findOneWorkLog
  );

  app.post(
    "/worklogs/:employeeLogId",
    Auth.ensureAuthenticated,
    worklogs.updateWorkLog
  );

  app.delete(
    "/worklogs/:employeeLogId",
    Auth.ensureAuthenticated,
    worklogs.deleteWorkLog
  );
};
