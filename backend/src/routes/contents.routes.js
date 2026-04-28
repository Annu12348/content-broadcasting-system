import express from "express";
import contentsController from "../controller/contents.controller.js";
import { liveApiLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

const contentsControllers = new contentsController();

router.get(
    "/live/:teacherId",
    liveApiLimiter,
    contentsControllers.getLiveContent.bind(contentsControllers)
  );

export default router;