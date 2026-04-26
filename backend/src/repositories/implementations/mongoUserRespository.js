import userModel from "../../models/user.model.js"
import AppError from "../../utils/error.js";
import IUserRespository from "../contracts/IUserRepository.js";

class MongoUserRespository extends IUserRespository {
    async createdUser(userData) {
        try {
            const user = await userModel.create(userData);
            return user;
        } catch (error) {
            throw new AppError("Failed to create user. Please try again later.");
        }
    }

    async findEmail(email) {
        try {
            const user = await userModel.findOne({email});
            return user;
        } catch (error) {
            throw new AppError("Failed to find user");
        }
    }

    async findById(userId) {
        try {
            const user = await userModel.findOne({userId});
            return user;
        } catch (error) {
            throw new AppError("Failed to find user");
        }
    }
}

export default MongoUserRespository;