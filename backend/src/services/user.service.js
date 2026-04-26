import { config } from "../config/config.js";
import MongoUserRespository from "../repositories/implementations/mongoUserRespository.js";
import AppError from "../utils/error.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class userServices {
    constructor() {
        this.userRepository = new MongoUserRespository();
    }

    async createUser(userData) {
        try {
            userData.email = userData.email.trim().toLowerCase();

            const existsUser = await this.userRepository.findEmail(userData.email)

            if (existsUser) {
                throw new AppError("email already exists", 400)
            }

            userData.password = await bcrypt.hash(userData.password, 10)

            const user = await this.userRepository.createdUser(userData);

            const token = jwt.sign({
                userId: user._id,
                role: user.role
            },
                config.JWT_SECRET_KEY,
                {
                    expiresIn: "7d"
                }
            )

            return {
                user,
                token
            };
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            email = email.trim().toLowerCase();

            const user = await this.userRepository.findEmail(email)

            if (!user) {
                throw new AppError("Invalid email or password", 401);
            }

            const userPassword = user.password;

            const matchPassword = await bcrypt.compare(password, userPassword)

            if (!matchPassword) {
                throw new AppError("Invalid email or password", 401)
            }

            const token = jwt.sign(
                { userId: user._id, role: user.role },
                config.JWT_SECRET_KEY,
                { expiresIn: '7d' }
            );

            return {
                user,
                token
            }
        } catch (error) {
            throw error;
        }
    }
}

export default userServices;