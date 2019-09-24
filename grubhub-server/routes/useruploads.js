const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/users',
    filename: (req, file, cb) => {
        cb(null, 'user' + req.params.user_id + path.extname(file.originalname));
    }
});

const uploads = multer({
    storage: storage,
    limits: { fileSize: 500000 },
}).single("image");

router.post("/:user_id", (req, res) => {
    uploads(req, res, function (err) {
        if (!err) {
            return res.sendStatus(200).end();
        }
        else {
            console.log('Error!');
        }
    })
});

router.get('/:user_id', (req, res) => {
    var image = path.join(__dirname, '..') + '/public/uploads/users/user' + req.params.user_id;
    if (fs.existsSync(image + '.jpg')) {
        res.sendFile(image + '.jpg');
    }
    else if (fs.existsSync(image + '.png')) {
        res.sendFile(image + '.png');
    }
    else {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/users/placeholder.jpg')
    }
});

module.exports = router;