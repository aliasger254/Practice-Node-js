module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller");
  const Auth = require("../middilware/auth.middilware");

  app.get("/tasks", tasks.getAllTasks);

  app.post("/add-task", tasks.addTasks);

  app.get("/tasks/:taskId", tasks.findOne);

  app.put("/tasks/:taskId", tasks.update);

  app.delete("/tasks/:taskId", tasks.deleteTask);
};
