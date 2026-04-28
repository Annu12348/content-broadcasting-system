import principalServices from "../services/principal.service.js";

class principalController {
    constructor() {
        this.principalServices = new principalServices();
    }

    async principalUploadContentRead(req, res) {
        try {
            const result = await this.principalServices.principalUploadContentRead(req.query)

            res.status(200).json({
                success: true,
                message: "All uploads fetched successfully",
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

    async getPendingContent(req, res) {
        try {
            const result = await this.principalServices.getPendingContent(req.query);

            return res.status(200).json({
                success: true,
                message:
                    result.data.length > 0
                        ? "Pending content fetched successfully"
                        : "No pending content available",
                data: result.data,
                pagination: {
                    total: result.total,
                    page: result.page,
                    limit: req.query.limit || 10,
                    totalPages: result.totalPages,
                },
            });
        } catch (error) {
            console.error(error)
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    }

    async approveContent(req, res) {
        try {
            const contentId = req.params.id;
            const principalId = req.user.id;

            const result = await this.principalServices.approveContent({
                contentId,
                principalId,
            });

            return res.status(200).json({
                success: true,
                message: "Content approved successfully",
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

    async rejectContent(req, res) {
        try {
            const contentId = req.params.id;
            const principalId = req.user.id;
            const { rejectionReason } = req.body;

            const result = await this.principalServices.rejectContent({
                contentId,
                principalId,
                rejectionReason,
            });

            return res.status(200).json({
                success: true,
                message: "Content rejected successfully",
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

    async getLiveContent(req, res) {
        try {
            const { teacherId } = req.params;

            const result = await this.principalServices.getLiveContent(teacherId);

            return res.status(200).json({
                success: true,
                message: result ? "Live content fetched" : "No content available",
                data: result || null,
            });
        } catch (error) {
            console.error(error)
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    }
}

export default principalController;