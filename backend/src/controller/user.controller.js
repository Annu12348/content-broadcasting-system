import userServices from "../services/user.service.js";

class UserController {
    constructor() {
        this.userServices = new userServices()
    }

    async register(req, res) {
        try {
            const user = await this.userServices.createUser(req.body)

            res.cookie("token", user.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });

            const { password, ...safeUser } = user.user._doc;

            res.status(201).json({
                message: "success fully register",
                success: true,
                data: safeUser,
                token: user.token
            })
        } catch (error) {
            console.error(error)
            res.status(error.statusCode || 500).json({
                message: error.message || "Internal Server Error",
                success: false
            })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await this.userServices.login(email, password)

            res.cookie("token", user.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000,
            })

            const { password: _, ...safeUser } = user.user._doc;

            res.status(200).json({
                success: true,
                message: "login successfully",
                data: safeUser,
                token: user.token
            })
        } catch (error) {
            res.status(error.statusCode || 500).json({
                message: error.message || "Internanal server Error",
                success: false
            })
        }
    }
}

export default UserController;