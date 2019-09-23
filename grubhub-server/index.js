const app = require('./app.js');
const passwordHash = require('password-hash');
const multer = require('multer');
const path = require('path');
const pool = require('./pool.js');
const fs = require('fs');

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post('/login', (req, res) => {

  let sql = `CALL Password_get('${req.body.email_id}');`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.send("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status) {
      if (passwordHash.verify(req.body.password, result[0][0].password)) {
        res.cookie('cookie', result[0][0].user_id, { maxAge: 9000000, httpOnly: false, path: '/' });
        req.session.user = req.body.email_id;
        let userObject = { user_id: result[0][0].user_id, name: result[0][0].name, email_id: result[0][0].email_id, is_owner: result[0][0].is_owner };
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(userObject));
      }
      else {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        });
        res.end("Password Incorrect");
      }
    }
    else {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("No user with this email id");
    }
  });
});

app.post('/signup', (req, res) => {
  var hashedPassword = passwordHash.generate(req.body.password);
  let sql = `CALL Customer_put('${req.body.name}', '${req.body.email_id}', '${hashedPassword}', '${req.body.address}', '${req.body.phone_number}');`;

  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("User added");
    }
    else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("User already exists")
    }
  });
});

app.post('/ownersignup', (req, res) => {
  var hashedPassword = passwordHash.generate(req.body.password);
  let sql = `CALL Restaurant_Owner_put('${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', '${req.body.email_id}', '${hashedPassword}', '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}');`;

  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("User added");
    }
    else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      res.end("User already exists");
    }
  });
});

app.post('/userget', (req, res) => {
  let sql = `CALL User_get('${req.body.user_id}', NULL);`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

app.post('/restaurantget', (req, res) => {
  let sql = `CALL Restaurant_Owner_get('${req.body.user_id}', NULL, NULL);`;

  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

app.post('/customerupdate', (req, res) => {
  if (req.body.password === "") {
    var hashedPassword = "NULL";
  }
  else {
    var hashedPassword = "'" + passwordHash.generate(req.body.password) + "'";
  }
  let sql = `CALL Customer_update('${req.body.user_id}', '${req.body.email_id}', '${req.body.name}', ${hashedPassword}, '${req.body.address}', '${req.body.phone_number}', '${req.body.user_image}' );`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === 'CUSTOMER_UPDATED') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("Customer updated");
    }
    else if (result && result.length > 0 && result[0][0].status === 'NO_RECORD') {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      res.end("No Record Found");
    }
  });
});

app.post('/restaurantupdate', (req, res) => {
  if (req.body.password === "") {
    var hashedPassword = "NULL";
  }
  else {
    var hashedPassword = "'" + passwordHash.generate(req.body.password) + "'";
  }
  let sql = `CALL Restaurant_Owner_update(NULL, '${req.body.email_id}', '${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', ${hashedPassword}, '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}', '${req.body.user_image}' );`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === 'RESTAURANT_UPDATED') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("Restaurant Updated");
    }
    else if (result && result.length > 0 && result[0][0].status === 'NO_RECORD') {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      res.end("No Record Found");
    }
  });
});

app.get('/restaurantitemsget', (req, res) => {

  let sql = `CALL Restaurant_Item_get(NULL, '${req.body.email_id}', NULL, NULL, NULL);`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

app.get('/restaurantsearch', (req, res) => {

  let sql = `CALL Search_Result_get('${req.body.search_input}');`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

//Image Upload
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, 'user' + req.params.user_id + path.extname(file.originalname));
  }
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 500000 },
}).single("image");

app.post("/uploads/:user_id", (req, res) => {
  uploads(req, res, function (err) {
    if (!err) {
      return res.sendStatus(200).end();
    }
    else {
      console.log('Error!');
    }
  })
});

app.get('/userimage/:user_id', (req, res) => {
  var image = __dirname + '/public/uploads/user' + req.params.user_id;
  console.log(image);
  if (fs.existsSync(image + '.jpg')) {
    res.sendFile(image + '.jpg');
  }
  else if (fs.existsSync(image + '.png')) {
    res.sendFile(image + '.png');
  }
  else{
    res.sendFile(__dirname + '/public/uploads/placeholder.png')
  }
});