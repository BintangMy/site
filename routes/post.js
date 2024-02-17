const express = require("express")
const router = express.Router()
const {uploadImageController, upload} = require("../controllers/postController")
let { authentication} = require("../middlewares/auth")

router.get('/', uploadImageController.read)
router.use(authentication)
router.post('/', upload.single('image'), uploadImageController.upload)


module.exports = router