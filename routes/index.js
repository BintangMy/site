const express = require("express")
const router = express.Router()
const user = require("./user")
const post = require("./post")
// const category = require("./category")
let { authentication} = require("../middlewares/auth")
router.use('/user', user)

console.log("tessssssssss")
router.use('/post', post)
// router.use('/category', category)

module.exports = router