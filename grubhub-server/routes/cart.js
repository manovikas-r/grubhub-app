const express = require("express");
const router = express.Router();
const pool = require('../pool.js');

router.get('/items/:item_ids', (req, res) => {

  let sql = `CALL Cart_Items_get(${req.params.item_ids});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
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