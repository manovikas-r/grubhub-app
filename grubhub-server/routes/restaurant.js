const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../pool.js');
const path = require('path');
const fs = require('fs');

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
  
  router.get('/restaurantsearch/:search_input', (req, res) => {
  
    let sql = `CALL Search_Result_get('${req.params.search_input}');`;
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

  router.get('/images/:res_image', (req, res) => {
    var image = path.join(__dirname, '..') + '/public/uploads/restaurants/' + req.params.res_image;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    }
    else {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/resplaceholder.jpg')
    }
});

module.exports = router;