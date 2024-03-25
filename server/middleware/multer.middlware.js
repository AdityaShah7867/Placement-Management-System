import path from 'path';
import multer from 'multer';

// Define storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension); // Define how the file will be named
    }
});

// Define file filter to allow specific file types
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // Allow PDF, Word (.doc, .docx)
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
};

// Initialize multer with defined storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload; // Export the configured multer instance
