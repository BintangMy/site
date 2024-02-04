let { User } = require("../models")
let {decoded} = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        // console.log(req.headers,'ini dataaaaaa')
        let access_token = req.headers.access_token
        if(!access_token){
            throw {name: "Unauthenticated"}
        }
        
        let payLoad = decoded(access_token)
        let dataUser = await User.findByPk(payLoad.id) 
      
        if(!access_token){
            throw {name: "Unauthenticated"}
        }

        req.user = {id: dataUser.id, role:dataUser.role, username: dataUser.username} 
        next()
    } catch (error) {
        console.log(error,'ini errr auth')
        next(error)
    }
}

module.exports = { authentication }