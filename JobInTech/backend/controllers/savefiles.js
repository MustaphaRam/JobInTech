const multer = require('multer');

// Define storage settings for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where uploaded files will be stored
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Specify the filename for uploaded files
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create Multer instance with specified storage settings
const upload = multer({ storage: storage });

module.exports = upload
