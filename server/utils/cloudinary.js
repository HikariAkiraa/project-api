const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// CLOUDINARY_URL otomatis dipakai oleh SDK cloudinary dari .env
// Format: cloudinary://my_key:my_secret@my_cloud_name

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'items' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(fileBuffer);
    });
};

module.exports = { uploadToCloudinary };
