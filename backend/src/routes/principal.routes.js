import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import principalController from "../controller/principal.controller.js";

const router = express.Router();

const principalControllers = new principalController();

router.patch(
    "/:id/reject",
    authUser,
    authorizeRoles("principal"),
    principalControllers.rejectContent.bind(principalControllers)
);

router.patch(
    "/:id/approve",
    authUser,
    authorizeRoles("principal"),
    principalControllers.approveContent.bind(principalControllers)
);

router.get(
    "/pending",
    authUser,
    authorizeRoles("principal"),
    principalControllers.getPendingContent.bind(principalControllers)
)

router.get(
    "/all",
    authUser,
    authorizeRoles("principal"),
    principalControllers.principalUploadContentRead.bind(principalControllers)
)

export default router;