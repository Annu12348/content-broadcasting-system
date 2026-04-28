import express from "express";
import contentsController from "../controller/contents.controller.js";

const router = express.Router();

const contentsControllers = new contentsController();

router.get(
    "/live/:teacherId",
    contentsControllers.getLiveContent.bind(contentsControllers)
  );

export default router;