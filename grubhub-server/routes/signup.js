const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../pool.js');

router.post('/customer', (req, res) => {
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
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end(result[0][0].status)
      }
    });
  });
  
  router.post('/restaurant', (req, res) => {
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
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
    });
  });

module.exports = router;