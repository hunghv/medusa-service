let router = require('express').Router();
let FileController = require('../controllers/file.controller');
const multer = require('multer');
const upload = multer();

router.post('/upload', upload.single('file'), FileController.upload);

module.exports = router;