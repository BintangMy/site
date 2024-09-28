let { Post, Image, Category } = require("../models")

const multer = require('multer');
const path = require('path');
const fs = require('fs');

class imageController {

    static async edit(req, res, next) {
        try {
            let { categoryId } = req.params
            let { name } = req.body
            console.log(name, ":::::::::::::::::::::::::::::::::::")
          
            let data = await Category.findOne({
                where: {
                    id: categoryId
                },
            })

            if (!data) {
                throw { name: "NotFound" }
            }

            await Category.update(
                { name },
                { where: { id: categoryId } }
            )

            let updatedData = await Category.findOne({
                where: {
                    id: categoryId
                },
            })

            res.status(200).json(updatedData)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { imagesUrl } = req.body

            imagesUrl.forEach(async (url) => {
                console.log(url, '<====================')
                const image = await Image.findOne({ where: { url } });


                if (!image) {
                    throw { name: 'NotFound', message: 'Post not found' };
                }

                console.log(image, '<================== GET ONE DATA')
                let dataDeleteImage = await Image.destroy({ where: { url } });
                console.log(dataDeleteImage, "<=========== DATA DELETE ")
                if (dataDeleteImage > 0) {
                    const imagePath = path.join(__dirname, '..', 'public', 'data', 'images', url);
                    fs.unlink(imagePath, err => {
                        if (err) {
                            console.error('Error deleting image:', err);
                        }
                    });
                }

            })



            res.status(200).json({ message: 'Success delete' });

        } catch (error) {
            console.error('Error in delete:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = { imageController };
