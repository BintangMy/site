const express = require("express")
const router = express.Router()
const user = require("./user")
const upload = require("./upload")
// const category = require("./category")

console.log("tessssssssss")
router.use('/user', user)
router.use('/upload', upload)
// router.use('/category', category)

module.exports = router