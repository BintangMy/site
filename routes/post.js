const express = require("express")
const router = express.Router()
const {uploadImageController, upload} = require("../controllers/postController")
let { authentication} = require("../middlewares/auth")

router.get('/', uploadImageController.read)
router.use(authentication)
console.log("errrrrrrrrrre")
router.get('/:postId', uploadImageController.detail)
router.patch('/:postId', uploadImageController.edit)
router.delete('/:postId', uploadImageController.delete)
router.post('/', upload.array('image', 10), uploadImageController.upload) // Assuming maxCount is 10, adjust as needed

module.exports = router