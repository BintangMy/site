const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Menggunakan path.join untuk membuat path yang sesuai
        cb(null, path.join(__dirname, '..', 'public/data/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

class uploadImageController {
    static async upload(req, res, next) {
        try {
            res.json(req.file);
        } catch (error) {
            console.error('Error in uploadImageController:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async readImage(req, res, next){

    }
}

module.exports = { uploadImageController, upload };
