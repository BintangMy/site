let { Post, Image, Category } = require("../models")


class categoryController {
    static async read(req, res, next){
        try {
            let dataCategory = await Category.findAll()
            console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            res.status(200).json(dataCategory)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            let { name } = req.body

            console.log(name, "::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")

            let dataCategory = await Category.create({ name })

            if (!dataCategory) {
                throw { name: "NotFound" };
            }

           
            res.status(201).json({ message: `create category ${dataCategory.id} success` });
        } catch (error) {
           next(error)
        }
    }

   
    static async edit(req, res, next) {
        try {
            let { categoryId } = req.params
            let { name } = req.body
            console.log(name, ":::::::::::::::::::::::::::::::::::")
            // Menunggu hasil pencarian post
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

            await Image.destroy({ where: { postId } });
            await Post.destroy({ where: { id: postId } });
    
            res.status(200).json({ message: 'Success delete' });
        } catch (error) {
            console.error('Error in delete:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
}

module.exports = { categoryController };
