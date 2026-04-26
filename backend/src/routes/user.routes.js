import express from "express";
import userController from "../controller/user.controller.js";
import { loginValidator, registerValidator } from "../middleware/validator/user.validator.js";
import { errorValidator } from "../middleware/errorHandling.middleware.js";
const router = express.Router();

const controller = new userController();

router.post(
    "/signup",
    registerValidator,
    errorValidator,
    controller.register.bind(controller)
);

router.post(
    "/login",
    loginValidator,
    errorValidator,
    controller.login.bind(controller)
)

export default router;