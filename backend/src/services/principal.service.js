import MongoContentRepository from "../repositories/implementations/mongoContentRepository.js";
import AppError from "../utils/error.js";

class principalServices {
    constructor() {
        this.MongoContentRepository = new MongoContentRepository();
    }

    async principalUploadContentRead(query) {
        try {
            const uploads = await this.MongoContentRepository.principalUploadedContentAllRead(query)

            return uploads;
        } catch (error) {
            throw new AppError(
                error.message || "Service error in principal uploads",
                error.statusCode || 500
            );
        }
    }

    async getPendingContent(query) {
        try {
            const uploads = await this.MongoContentRepository.findPending(query)

            return uploads;
        } catch (error) {
            throw new AppError(
                error.message || "Failed to fetch pending content",
                error.statusCode || 500
            );
        }
    }

    async approveContent({ contentId, principalId }) {
        try {
            const content = await this.MongoContentRepository.findById(contentId);

            if (!content || content.isDeleted) {
                throw new AppError("Content not found", 404);
            }

            if (content.status === "approved") {
                throw new AppError("Content already approved", 400);
            }

            if (content.status === "rejected") {
                throw new AppError("Rejected content cannot be approved", 400);
            }

            const updated = await this.MongoContentRepository.approve(contentId, principalId);

            return updated;
        } catch (error) {
            throw new AppError(
                error.message || "Failed to approve content",
                error.statusCode || 500
            );
        }
    }

    async rejectContent({ contentId, principalId, rejectionReason }) {
        try {
            if (!rejectionReason || rejectionReason.trim().length < 3) {
                throw new AppError("Rejection reason is required", 400);
            }

            const content = await this.MongoContentRepository.findById(contentId);

            if (!content || content.isDeleted) {
                throw new AppError("Content not found", 404);
            }

            if (content.status === "rejected") {
                throw new AppError("Content already rejected", 400);
            }

            if (content.status === "approved") {
                throw new AppError("Approved content cannot be rejected", 400);
            }

            const updated = await this.MongoContentRepository.reject({
                contentId,
                principalId,
                rejectionReason,
            });

            return updated;
        } catch (error) {
            throw new AppError(
                error.message || "Service error in rejecting content",
                error.statusCode || 500
            );
        }
    }

    async getLiveContent(teacherId) {
        try {
            const now = new Date();

            const contents = await this.MongoContentRepository.findLiveEligible({
                teacherId,
                now,
            });

            if (!contents.length) return null;

            const grouped = contents.reduce((acc, item) => {
                if (!acc[item.subject]) acc[item.subject] = [];
                acc[item.subject].push(item);
                return acc;
            }, {});

            const result = [];

            for (const subject in grouped) {
                const items = grouped[subject];

                const totalDuration = items.reduce(
                    (sum, item) => sum + item.schedule.rotationDuration,
                    0
                );

                const timePassed = Math.floor((now - new Date(items[0].createdAt)) / 60000);

                const cycleTime = timePassed % totalDuration;

                let cumulative = 0;
                let active = null;

                for (const item of items) {
                    cumulative += item.schedule.rotationDuration;
                    if (cycleTime < cumulative) {
                        active = item;
                        break;
                    }
                }

                if (active) result.push(active);
            }

            return result;
        } catch (error) {
            throw new AppError(
                error.message || "Service error in fetching live content",
                error.statusCode || 500
            );
        }
    }
}

export default principalServices;