import teacherServices from "../services/teacher.service.js";
import AppError from "../utils/error.js";

class teacherController {
    constructor() {
        this.teacherServices = new teacherServices();
    }

    async uploadContent(req, res) {
        try {
            const file = req.file;

            if (!req.file) {
                throw new AppError("File is required", 400);
            }

            const payload = {
                title: req.body.title,
                description: req.body.description,
                subject: req.body.subject,

                fileUrl: file.location,
                fileSize: file.size,
                fileType: file.mimetype.split("/")[1],
                uploadedBy: req.user.id,

                schedule: {
                    startTime: req.body.startTime || null,
                    endTime: req.body.endTime || null,
                    rotationDuration: req.body.rotationDuration || 5,
                },
            };

            const result = await this.teacherServices.uploadContent(payload);

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

    async teacherUploadContentRead(req, res) {
        try {
            const uploadedBy = req.user.id;

            const result = await this.teacherServices.teacherUploadContentRead(uploadedBy, req.query)

            res.status(200).json({
                success: true,
                message: "Teacher uploads fetched successfully",
                data: result.data,
                pagination: {
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages,
                },
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

export default teacherController;