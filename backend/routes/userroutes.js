const express = require("express");
const { uploadImage, test, getAllImages } = require("../controllers/userController.js");

const router = express.Router();

router.get('/', test);
router.post('/upload', uploadImage);
router.get('/image', getAllImages);

module.exports = router;