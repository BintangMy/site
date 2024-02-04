const express = require("express")
const router = express.Router()
const {userController} = require("../controllers/userController")
let { authentication} = require("../middlewares/auth")
router.post('/login', userController.login)
router.use(authentication)
router.post('/register', userController.register)

module.exports = router