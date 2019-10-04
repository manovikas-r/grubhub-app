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

router.post('/placeorder', (req, res) => {
  let sql = `CALL Orders_put(${req.body.user_id}, ${req.body.res_id}, '${req.body.order_status}',${req.body.sub_total}, ${req.body.tax}, ${req.body.delivery}, ${req.body.discount}, ${req.body.total});`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result && result.length > 0 && result[0][0].status === 'ORDER_PLACED') {
      req.body.cart_items.forEach(cart_item => {
        let sqlItem = `CALL Orders_Items_put(${result[0][0].order_id}, ${cart_item.item_id}, ${cart_item.item_quantity});`;
        pool.query(sqlItem, (err, result) => {
          if (err) {
            console.log(err);
            res.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            res.end("Database Error");
          }
        });
      });
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0][0]));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end(result[0][0]);
    }
  });
});

module.exports = router;