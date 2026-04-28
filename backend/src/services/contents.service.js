import MongoContentRepository from "../repositories/implementations/mongoContentRepository.js";
import AppError from "../utils/error.js";

class contentsServices {
    constructor() {
        this.MongoContentRepository = new MongoContentRepository();
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

export default contentsServices;