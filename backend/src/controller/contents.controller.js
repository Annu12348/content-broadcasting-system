import contentsServices from "../services/contents.service.js";

class contentsController {
    constructor() {
        this.contentsServices = new contentsServices();
    }

    async getLiveContent(req, res) {
        try {
            const { teacherId } = req.params;

            const result = await this.contentsServices.getLiveContent(teacherId);

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

export default contentsController;