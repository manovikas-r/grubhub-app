const app = require('./app.js');
const passwordHash = require('password-hash');
const pool = require('./pool.js');

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
      if(passwordHash.verify(req.body.password, result[0][0].password)){
        if(result[0][0].is_owner){
          res.cookie('ownercookie', req.body.email_id, { maxAge: 900000, httpOnly: false, path: '/' });
        }
        else{
          res.cookie('customercookie', req.body.email_id, { maxAge: 900000, httpOnly: false, path: '/' });
        }
        req.session.user = req.body.email_id;
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end("Successful Login");
      }
      else {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        });
        res.end("Password Incorrect");
      }
    }
    else{
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
    console.log(result);
    if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("User added");
    }
    else if(result && result.length > 0 && result[0][0].status === 'USER_EXISTS'){
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
    else if(result && result.length > 0 && result[0][0].status === 'USER_EXISTS'){
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      res.end("User already exists");
    }
  });
});

app.get('/userget', (req, res) => {
  let sql = `CALL User_get(NULL, '${req.body.email_id}');`;

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
      res.end(JSON.stringify(result[0][0]));
    }
  });
});

app.get('/restaurantget', (req, res) => {
  let sql = `CALL Restaurant_Owner_get(NULL, '${req.body.email_id}', NULL);`;

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
      res.end(JSON.stringify(result[0][0]));
    }
  });
});

app.post('/customerupdate', (req, res) => {
  var hashedPassword = passwordHash.generate(req.body.password);
  let sql = `CALL Customer_update(NULL, '${req.body.email_id}', '${req.body.name}', '${hashedPassword}', '${req.body.address}', '${req.body.phone_number}', '${req.body.user_image}' );`;

  pool.query(sql, (err, result) => {
    if (err) {
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
    else if(result && result.length > 0 && result[0][0].status === 'NO_RECORD'){
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      res.end("No Record Found");
    }
  });
});

app.post('/restaurantupdate', (req, res) => {
  var hashedPassword = passwordHash.generate(req.body.password);
  let sql = `CALL Restaurant_Owner_update(NULL, '${req.body.email_id}', '${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', '${hashedPassword}', '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}', '${req.body.user_image}' );`;

  pool.query(sql, (err, result) => {
    if (err) {
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
    else if(result && result.length > 0 && result[0][0].status === 'NO_RECORD'){
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      res.end("No Record Found");
    }
  });
});

app.post('/restaurantitemsget', (req, res) => {

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
      res.end(JSON.stringify(result[0][0]));
    }
  });
});