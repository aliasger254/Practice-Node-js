module.exports = (app) => {
  const user = require("../controllers/users.controller.js");
  const Auth = require("../middilware/auth.middilware");

  app.post("/login-user", user.loginUser);

  app.get("/users", Auth.ensureAuthenticated, user.findAll);

  app.post("/user", Auth.ensureAuthenticated, user.create);

  app.get("/users/:userId", Auth.ensureAuthenticated, user.findOne);

  app.put("/users/:userId", Auth.ensureAuthenticated, user.update);

  app.delete("/users/:userId", Auth.ensureAuthenticated, user.delete);
};
