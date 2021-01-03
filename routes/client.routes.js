module.exports = (app) => {
  const clients = require("../controllers/client.controller");
  const Auth = require("../middilware/auth.middilware");

  app.get("/clients", Auth.ensureAuthenticated, clients.findAll);

  app.post("/add-client", Auth.ensureAuthenticated, clients.create);

  app.get("/client/:clientId", Auth.ensureAuthenticated, clients.findOne);

  app.put("/client/:clientId", Auth.ensureAuthenticated, clients.update);

  app.delete("/client/:clientId", Auth.ensureAuthenticated, clients.delete);
};
