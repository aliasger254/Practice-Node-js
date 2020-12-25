var fs = require("fs");

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/all-users', function (req, res) {
      fs.readFile( __dirname + "/data/users.json", 'utf8', function (err, data) {
          res.end( data );
      });
  });
  
  app.get('/add-user', function (req, res) {
       // First read existing users.
      fs.readFile( __dirname + "/data/users.json", 'utf8', function (err, data) {
          data = JSON.parse( data );
          // data["user4"] = user["user4"];
          console.log( data );
          res.end( JSON.stringify(data));
      });
  });
    
  app.get('/all-tasks', function (req, res) {
      res.send('All Tasks')
    })