const express = require("express")
const router = express.Router()
const {uploadImageController, upload} = require("../controllers/ImageController")

router.post('/image',upload.single('image'), uploadImageController.upload)
router.get('/read', uploadImageController.readImage)


module.exports = router