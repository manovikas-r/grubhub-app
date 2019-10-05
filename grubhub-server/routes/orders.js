const express = require("express");
const router = express.Router();
const pool = require('../pool.js');

router.get('/pendingorders/:user_id', (req, res) => {

  let sql = `CALL Pending_Orders_get(${req.params.user_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result && result.length > 0 && result[0][0] && result[0][0].status !== 'NO_PENDING_ORDERS') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_PENDING_ORDERS");
    }
  });
});

router.get('/completedorders/:user_id', (req, res) => {

  let sql = `CALL Completed_Orders_get(${req.params.user_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result && result.length > 0 && result[0][0] && result[0][0].status !== "NO_COMPLETED_ORDERS") {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_COMPLETED_ORDERS");
    }
  });
});

router.get('/pendingorders/restaurant/:user_id', (req, res) => {

  let sql = `CALL Restaurant_Pending_Orders_get(${req.params.user_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result && result.length > 0 && result[0][0] && result[0][0].status !== "NO_PENDING_ORDERS") {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_PENDING_ORDERS");
    }
  });
});

router.get('/completedorders/restaurant/:user_id', (req, res) => {

  let sql = `CALL Restaurant_Completed_Orders_get(${req.params.user_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result && result.length > 0 && result[0][0] && result[0][0].status !== "NO_COMPLETED_ORDERS") {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(result[0]));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_COMPLETED_ORDERS");
    }
  });
});

router.get('/orderitems/:order_id', (req, res) => {

  let sql = `CALL Order_Items_get(${req.params.order_id});`;
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
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("NO_RECORDS");
    }
  });
});

router.post('/placeorder', (req, res) => {
  let sql = `CALL Orders_put(${req.body.user_id}, ${req.body.res_id}, '${req.body.status}',${req.body.sub_total}, ${req.body.tax}, ${req.body.delivery}, ${req.body.discount}, ${req.body.total});`;
  pool.query(sql, (err, result) => {
    if (err) {
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

router.post('/orderstatus', (req, res) => {
  let sql = `UPDATE customer_orders SET order_status = '${req.body.order_status}' WHERE order_id = ${req.body.order_id};`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("STATUS_UPDATED");
    }
  });
});

router.post('/cancelorder', (req, res) => {
  let sql = `UPDATE customer_orders SET order_status = 'ORDER_CANCELLED' WHERE order_id = ${req.body.order_id};`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end("Database Error");
    }
    if (result) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end("ORDER_CANCELLED");
    }
  });
});

module.exports = router;