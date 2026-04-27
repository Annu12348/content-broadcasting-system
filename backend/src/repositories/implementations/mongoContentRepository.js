import contentModel from "../../models/content.model.js";
import AppError from "../../utils/error.js";
import IContentRepository from "../contracts/IContentRepository.js";

class MongoContentRepository extends IContentRepository {
    async uploadContent(contentData) {
        try {
            const upload = await contentModel.create(contentData);

            return upload;
        } catch (error) {
            throw new AppError(
                error.message || "Failed to upload content",
                500
            );
        }
    }

    async uploadedContentRead(uploadedBy) {
        try {
            const uploads = await contentModel.find({ uploadedBy });
            return uploads;
       
        } catch (error) {
            throw new AppError(
                error.message || "Failed to read uploaded content",
                500
            );
        }
    }
}

export default MongoContentRepository;


//🟡 OPTIONAL (abhi nahi done but assignment mein future scope)
//Update content (before approval)
//Delete draft/pending content