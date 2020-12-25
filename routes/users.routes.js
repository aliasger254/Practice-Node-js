module.exports = (app) => {
  const user = require("../controllers/users.controller.js");

  app.get("/users", user.findAll);

  app.post("/user", user.create);

  app.get("/users/:userId", user.findOne);

  app.put("/users/:userId", user.update);

  app.delete("/users/:userId", user.delete);
};
