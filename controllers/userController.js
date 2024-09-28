let { User, Log } = require("../models")
const bcrypt = require('bcryptjs');
let {jwtToken} = require('../helpers/jwt')

class userController {
    static async register(req, res, next){
        
        try {
            let {username, email, password, role} = req.body

            await User.create({username, email, password , role})
            await Log.create({description: `${req.user.username} create account for ${username}`, username:req.user.username})
            
            res.status(201).json({
                message:`succsess create account ${username}`
            })
        } catch (error) {
           console.log(error, "ERROR RESGIETER <<<<<<<<<<<<<<")
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

            let access_token = jwtToken(payLoad)

            // console.log(access_token, 'acesssss ====================')

            res.status(200).json({access_token, user:user.userName, email:user.email})
            
        } catch (error) {
            console.log(error, '<<<<<<<');
            next(error)
        }
    }

    static async editProfile (req, res, next){
        try {
            let {id, username} = req.user;
            
            let response = await User.findByPk(id)

            if(!response) throw {name: "data not found"}

            response = await User.update({username}, {whare:{id}})

            res.status(200).json(`success`)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {userController}