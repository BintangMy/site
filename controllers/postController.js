const multer = require('multer');
const path = require('path');
let { User, Post, Image, Category, Log } = require("../models")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Menggunakan path.join untuk membuat path yang sesuai
        cb(null, path.join(__dirname, '..', 'public/data/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

class uploadImageController {
    static async upload(req, res, next) {
        try {
            let {title, description, historyDate, categoryId} = req.body
            let {filename} = req.file
            let authorId = req.user.id

            let postData = await Post.create({ title, description, historyDate, categoryId:1, authorId })
            let imageData = await Image.create({url:filename, postId:postData.id, isVideo:true})

            console.log(postData.id, "USERRRRRRRRRRRRRRR", imageData, '}}}}}}}}}}}}}}}}}}')

            if (!postData || !imageData) {
                throw { name: "NotFound" };
            }
            
            console.log(req.file, "filesssssssssssssssssssss")
            res.status(201).json({message:`create post ${postData.title} success`})
        } catch (error) {
            // console.error('Error in uploadImageController:', error, "????????????????????????????????????????????????");
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async read(req, res, next){
        try {
            let postData = await Post.findAll({include: [
                {
                    model: Category,
                    required: true
                },
                {
                    model: Image,
                    required: true
                }
            ],})
            console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            res.status(200).json(postData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { uploadImageController, upload };
