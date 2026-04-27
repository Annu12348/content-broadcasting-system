import ContentServices from "../services/content.service.js";
import AppError from "../utils/error.js";

class ContentController {
    constructor() {
        this.ContentServices = new ContentServices();
    }

    async uploadContent(req, res) {
        try {
            const file = req.file;

            if (!req.file) {
                throw new AppError("File is required", 400);
            }

            const payload = {
                ...req.body,
                fileUrl: file.location,
                fileSize: file.size,
                fileType: file.mimetype.split("/")[1],
                uploadedBy: req.user.id,
            };

            const result = await this.ContentServices.uploadContent(payload);

            res.status(201).json({
                success: true,
                message: "Content uploaded successfully",
                data: result,
            });
        } catch (error) {
            console.error(error)
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    }

    async uploadContentRead(req, res) {
    try { 
        const uploadedBy = req.user.id;

        const uploads = await this.ContentServices.uploadContentRead(uploadedBy)

        res.status(200).json({
            message: "Successfully read uploaded content",
            data: uploads,
            total: uploads.length,
        })
     } catch (error) {
        console.error(error)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
}

export default ContentController;