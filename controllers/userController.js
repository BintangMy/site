let { User } = require("../models")
const bcrypt = require('bcryptjs');
let {jwtToken} = require('../helpers/jwt')

class userController {
    static async register(req, res, next){
        
        try {
            let {username, email, password, phoneNumber, address} = req.body
            await User.create({username, email, password, role: "Admin",phoneNumber, address})
            res.status(201).json({
                message:`succsess create account ${username}`
            })
        } catch (error) {
           
            next(error)
        }
    }

    static async login(req, res, next) {
        console.log(req.body, '<<<<<<<');

        try {
            let {email, password} = req.body

            if(!email || !password){
                throw {name: "EmailOrPasswordRequired"}
            }

            let user = await User.findOne({
                where:{email}
            })

            let comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword){
                throw {name: "PasswordInValid"}
            }

            let payLoad = {
                id: user.id
            }

            console.log(payLoad, 'PAYLOAD <<<<<<<<<<<<<<<<<<<<<<')

            let access_token = jwtToken(payLoad)

            console.log(access_token, 'acesssss ====================')

            res.status(200).json({access_token, user:user.username,email:user.email})
            
        } catch (error) {
            console.log(error, '<<<<<<<');
            next(error)
        }
    }
}

module.exports = {userController}