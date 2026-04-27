import express from "express";
import ContentControllerClass from "../controller/content.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { uploadContentValidator } from "../middleware/validator/upload.validator.js";
import { errorValidator } from "../middleware/errorHandling.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

const contentController = new ContentControllerClass();

router.post(
    "/upload",
    authUser,
    authorizeRoles("teacher"),
    upload.single("file"),
    uploadContentValidator,
    errorValidator,
    contentController.uploadContent.bind(contentController)
);

router.get(
    "/my",
    authUser,
    authorizeRoles("teacher"),
    contentController.uploadContentRead.bind(contentController)
)

export default router;