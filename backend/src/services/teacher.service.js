import MongoContentRepository from "../repositories/implementations/mongoContentRepository.js";
import AppError from "../utils/error.js";

class teacherServices {
    constructor() {
        this.MongoContentRepository = new MongoContentRepository();
    }

    async uploadContent(contentData) {
        try {
            const upload = await this.MongoContentRepository.uploadContent({
                ...contentData,
                status: "pending", 
            });

            if (!upload) {
                throw new AppError("Failed to upload content", 500);
            }

            return upload;
        } catch (error) {
            throw error;
        }
    }

    async teacherUploadContentRead(uploadedBy, query) {
        try {
            if (!uploadedBy) {
                throw new AppError("uploadedBy is required", 400);
            }

            const uploads = await this.MongoContentRepository.teacherUploadedContentRead(uploadedBy, query)

            return uploads;
        } catch (error) {
            throw new AppError(
                error.message || "Service error in teacher uploads",
                error.statusCode || 500
            );
        }
    }
}

export default teacherServices;