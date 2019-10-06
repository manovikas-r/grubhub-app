const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../pool.js');

const userstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/users',
    filename: (req, file, cb) => {
        cb(null, 'user' + req.params.user_id + "-" + Date.now() + path.extname(file.originalname));
    }
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 500000 },
}).single("image");

router.post("/user/:user_id", (req, res) => {
    useruploads(req, res, function (err) {
        if (!err) {
            let imageSql = `UPDATE users SET user_image = '${req.file.filename}' WHERE user_id = ${req.params.user_id}`;
            pool.query(imageSql, (err, result) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end("Database Error");
                }
            });
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log('Error!');
        }
    })
});

const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
    filename: (req, file, cb) => {
        cb(null, 'restaurant' + req.params.res_id + "-" + Date.now() + path.extname(file.originalname));
    }
});

const resuploads = multer({
    storage: resstorage,
    limits: { fileSize: 500000 },
}).single("resimage");

router.post("/restaurant/:res_id", (req, res) => {
    resuploads(req, res, function (err) {
        if (!err) {
            let imageSql = `UPDATE restaurants SET res_image = '${req.file.filename}' WHERE res_id = ${req.params.res_id}`;
            pool.query(imageSql, (err, result) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end("Database Error");
                }
            });
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log('Error!');
        }
    })
});

const itemstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/items',
    filename: (req, file, cb) => {
        cb(null, "item-" + Date.now() + path.extname(file.originalname));
    }
});

const itemuploads = multer({
    storage: itemstorage,
    limits: { fileSize: 500000 },
}).single("itemimage");

router.post("/item/:item_id", (req, res) => {
    itemuploads(req, res, function (err) {
        if (!err) {
            if (req.params.item_id !== "undefined") {
                let imageSql = `UPDATE menu_items SET item_image = '${req.file.filename}' WHERE item_id = ${req.params.item_id}`;

                pool.query(imageSql, (err, result) => {
                    if (err) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        res.end("Database Error");
                    }
                });
            }
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log(err);
        }
    })
});


module.exports = router;