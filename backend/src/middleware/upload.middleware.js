import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/s3.config.js";
import { config } from "../config/config.js";

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const uniqueName = `content/${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`;
            cb(null, uniqueName);
        },
    }),

    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/gif"];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only jpg, png, gif allowed"), false);
        }
    },

    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});