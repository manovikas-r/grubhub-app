const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../pool.js');

router.get('/restaurantitems', (req, res) => {

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
  
  router.get('/restaurantsearch', (req, res) => {
  
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

module.exports = router;