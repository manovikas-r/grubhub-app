const express = require("express");
const router = express.Router();
const pool = require('../pool.js');

router.get('/sections/:user_id', (req, res) => {
    let sql = `CALL Menu_Sections_get(NULL, ${req.params.user_id});`;
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

  router.post('/sections', (req, res) => {
    let sql = `CALL Menu_Sections_put(NULL, ${req.body.user_id}, '${req.body.menu_section_name}');`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status === 'SECTION_ADDED') {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result[0][0]));
      }
      else if (result && result.length > 0 && result[0][0].status === 'SECTION_EXISTS') {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
    });
  });

  router.post('/sectiondelete', (req, res) => {
    let sql = `CALL Menu_Sections_del(${req.body.menu_section_id});`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status === 'SECTION_DELETED') {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'NO_RECORD') {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
    });
  });

  router.get('/items/:user_id', (req, res) => {
    let sql = `CALL Menu_Items_get(NULL, ${req.params.user_id});`;
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

  router.post('/items', (req, res) => {
    let sql = `CALL Menu_Items_put(${req.body.user_id}, NULL, '${req.body.item_name}', '${req.body.item_description}', ${req.body.item_price}, '${req.body.item_image}', NULL, '${req.body.menu_section_name}');`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status === 'ITEM_ADDED') {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result[0][0]));
      }
      else if (result && result.length > 0 && result[0][0].status === 'ITEM_EXISTS') {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
    });
  });

  router.post('/itemdelete', (req, res) => {
    let sql = `CALL Menu_Items_del(${req.body.item_id});`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status === 'ITEM_DELETED') {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'NO_RECORD') {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end(result[0][0].status);
      }
    });
  });

module.exports = router;