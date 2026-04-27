import MongoContentRepository from "../repositories/implementations/mongoContentRepository.js";
import AppError from "../utils/error.js";

class ContentServices {
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

    async uploadContentRead(uploadedBy) {
        try {
            const uploads = await this.MongoContentRepository.uploadedContentRead(uploadedBy)

            return uploads;
        } catch (error) {
            throw error;
        }
    }
}

export default ContentServices;