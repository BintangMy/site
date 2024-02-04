const express = require("express")
const router = express.Router()
const user = require("./user")
// const post = require("./post")
// const category = require("./category")

console.log("tessssssssss")
router.use('/user', user)
// router.use('/posts', post)
// router.use('/category', category)

module.exports = router