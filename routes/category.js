const express = require("express")
const router = express.Router()
const {categoryController} = require("../controllers/categoryController")
let { authentication} = require("../middlewares/auth")

router.use(authentication)
router.get('/', categoryController.read)
router.post('/', categoryController.create)
router.patch('/:categoryId', categoryController.edit)

module.exports = router