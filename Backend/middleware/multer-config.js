// Gestion des images postées par les utilisateurs

const multer = require("multer");

const MIME_TYPES = {
    "image/jpg":    "jpg",
    "image/jpeg":   "jpg",
    "image/png":    "png",
    "image/gif":    "gif"
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(".")[0]
        name = name.split(" ").join("_")
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + "." + extension)
    }
})

module.exports = multer({storage: storage}).single("image") 