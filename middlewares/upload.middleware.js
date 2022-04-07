const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "middlewares/upload.middleware.js");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimeType === 'image/png' ||
        file.mimeType === 'image/jpg' ||
        file.mimeType === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let uploadFile = multer({
    storage: storage,
    fileFilter : fileFilter
}).single("file");


module.exports = uploadFile;