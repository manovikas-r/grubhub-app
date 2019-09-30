const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../pool.js');

router.get('/customer/:user_id', (req, res) => {
    let sql = `CALL Customer_get('${req.params.user_id}', NULL);`;
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
  
  router.get('/restaurant/:user_id', (req, res) => {
    let sql = `CALL Restaurant_Owner_get('${req.params.user_id}', NULL, NULL);`;
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

  router.post('/customer', (req, res) => {
    if(req.body.password && req.body.password !== "")
    {
      var hashedPassword = "'" + passwordHash.generate(req.body.password) + "'";
    }
    else{
      var hashedPassword = "NULL";
    }
    let sql = `CALL Customer_update('${req.body.user_id}', '${req.body.email_id}', '${req.body.name}', ${hashedPassword}, '${req.body.address}', '${req.body.phone_number}');`;
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
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'NO_RECORD') {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
    });
  });
  
  router.post('/restaurant', (req, res) => {
    if (req.body.password && req.body.password !== "") {
      var hashedPassword = "'" + passwordHash.generate(req.body.password) + "'";
    }
    else {
      var hashedPassword = "NULL";
    }
    let sql = `CALL Restaurant_Owner_update(NULL, '${req.body.email_id}', '${req.body.name}', '${req.body.res_name}', '${req.body.res_cuisine}', ${hashedPassword}, '${req.body.res_zip_code}', '${req.body.address}', '${req.body.phone_number}');`;
    console.log(sql);
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
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'NO_RECORD') {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
    });
  });

  module.exports = router;




