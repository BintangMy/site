const express = require("express")
const router = express.Router()
const {imageController} = require("../controllers/imageController")
let { authentication} = require("../middlewares/auth")

router.use(authentication)
router.delete('/', imageController.delete)
// router.get('/', imageController.read)
// router.patch('/:categoryId', imageController.edit)

module.exports = router