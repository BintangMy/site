const multer = require('multer');
const path = require('path');
const fs = require('fs');

let { Post, Image, Category } = require("../models")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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
            let { title, description, historyDate, categoryId,  rasio } = req.body
            let authorId = req.user.id

            let postData = await Post.create({ title, description, historyDate, categoryId, authorId })

            if (!postData) {
                throw { name: "NotFound" };
            }

            let imageDatas = await Promise.all(req.files.map(async (file) => {
                let imageData = await Image.create({ url: file.filename, postId: postData.id, rasio , isVideo: true });
                return imageData;
            }));

            if (!imageDatas) {
                throw { name: "NotFound" };
            }
            res.status(201).json({ message: `create post ${postData.id} success` });
        } catch (error) {
            console.error('Error in uploadImageController:', error);
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
    
    static async detail(req, res, next){
        try {
            let { postId } = req.params
            let postData = await Post.findByPk(postId,{include: [
                {
                    model: Category,
                    required: true
                },
                {
                    model: Image,
                    required: true
                }
            ],})
            res.status(200).json(postData)
        } catch (error) {
            next(error)
        }
    }

    static async edit(req, res, next) {
        try {
            let { postId } = req.params
            let { title, description, historyDate, categoryId, rasio } = req.body
            console.log(title, description, historyDate, categoryId, rasio,)
            
            // Menunggu hasil pencarian post
            let data = await Post.findOne({
                where: {
                    id: postId
                },
            })
    
            console.log(data)
    
            if (!data) {
                throw { name: "NotFound" }
            }
    
            await Post.update(
                { title, description, historyDate, categoryId, rasio }, // Nilai baru yang ingin diperbarui
                { where: { id: postId } } // Kriteria untuk record yang ingin diperbarui
            )
    
            let updatedData = await Post.findOne({
                where: {
                    id: postId
                },
            })
    
            res.status(200).json(updatedData) // Mengembalikan data yang diperbarui
        } catch (error) {
            console.log(error, ":::::::::::::::::::::::::::::")
            next(error)
        }
    }
    

    static async delete(req, res, next){
        try {
            const { postId } = req.params;
    
            const post = await Post.findByPk(postId);
            if (!post) {
                throw { name: 'NotFound', message: 'Post not found' };
            }

            const images = await Image.findAll({ where: { postId } });
            if (!images || images.length === 0) {
                throw { name: 'NotFound', message: 'Images not found' };
            }

            // Hapus file gambar terkait
            images.forEach(image => {
                const imagePath = path.join(__dirname, '..', 'public', 'data', 'images', image.url);
                fs.unlink(imagePath, err => {
                    if (err) {
                        console.error('Error deleting image:', err);
                    }
                });
            });

            // Hapus entri gambar dari database
            await Image.destroy({ where: { postId } });

            // Hapus postingan
            await Post.destroy({ where: { id: postId } });
    
            res.status(200).json({ message: 'Success delete' });
        } catch (error) {
            console.error('Error in delete:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
}

module.exports = { uploadImageController, upload };
