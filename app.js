// if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
// }
  const express = require('express')
  const app = express()
  const port = process.env.PORT || 3050
  const routes = require("./routes/index")
  const cors = require("cors")
  // const path = require(path);
  
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  let {handleError} = require("./middlewares/handleError")
  
  app.use('/', routes)
  app.use("/photos", express.static('public/data/images'))
  
  app.use(handleError)
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })