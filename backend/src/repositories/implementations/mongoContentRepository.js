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

    async findById(id) {
        try {
            const find = await contentModel.findById(id);
            return find;
        } catch (error) {
            throw new AppError(
                error.message || "Failed to find content by id",
                500
            );
        }
    }

    async teacherUploadedContentRead(uploadedBy, { page = 1, limit = 10, sort = "desc" }) {
        try {
            const skip = (page - 1) * limit;
            const uploads = await contentModel.find({ uploadedBy })
                .select("-__v")
                .sort({ createdAt: sort === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean();

            const total = await contentModel.countDocuments({ uploadedBy });

            return {
                data: uploads,
                total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new AppError(
                error.message || "Failed to read uploaded content",
                500
            );
        }
    }

    async principalUploadedContentAllRead({ page = 1, limit = 10, sort = "desc" }) {
        try {
            const skip = (page - 1) * limit;

            const uploads = await contentModel
                .find()
                .select("-__v")
                .sort({ createdAt: sort === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean();

            const total = await contentModel.countDocuments();

            return {
                data: uploads,
                total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new AppError(
                error.message || "Failed to read uploaded content",
                500
            );
        }
    }

    async findPending({ page = 1, limit = 10, sort = "desc" }) {
        try {
            const skip = (page - 1) * limit;

            const uploads = await contentModel
                .find({
                    status: "pending",
                    isDeleted: false,
                })
                .select("-__v -rejectionReason -approvedBy")
                .populate("uploadedBy", "name email")
                .sort({ createdAt: sort === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean();

            const total = await contentModel.countDocuments({
                status: "pending",
                isDeleted: false,
            });

            return {
                data: uploads,
                total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new AppError(
                error.message || "Failed to read pending uploaded content",
                500
            );
        }
    }

    async approve(contentId, principalId) {
        try {
            const upload = await contentModel.findByIdAndUpdate(
                contentId,
                {
                    status: "approved",
                    approvedBy: principalId,
                    approvedAt: new Date(),
                    rejectionReason: null,
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).lean();

            return upload;
        } catch (error) {
            throw new AppError(
                error.message || "Failed to approve uploaded content",
                500
            );
        }
    }

    async reject({ contentId, principalId, rejectionReason }) {
        try {
            return await contentModel.findByIdAndUpdate(
                contentId,
                {
                    status: "rejected",
                    rejectionReason,
                    rejectedAt: new Date(),
                    approvedBy: null,   // cleanup
                    approvedAt: null,   // cleanup
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).lean();
        } catch (error) {
            throw new AppError(
                error.message || "Failed to reject uploaded content",
                500
            );
        }
    }

    async findLiveEligible({ teacherId, now }) {
        try {
            return await contentModel
                .find({
                    uploadedBy: teacherId,
                    status: "approved",
                    isDeleted: false,
                    "schedule.startTime": { $lte: now },
                    "schedule.endTime": { $gte: now },
                    "schedule.isActive": true,
                })
                .sort({ createdAt: 1 })
                .lean();
        } catch (error) {
            throw new AppError(
                error.message || "Failed to fetch live eligible content",
                500
            );
        }
    }
}

export default MongoContentRepository;


//🟡 OPTIONAL (abhi nahi done but assignment mein future scope)
//Update content (before approval)
//Delete draft/pending content