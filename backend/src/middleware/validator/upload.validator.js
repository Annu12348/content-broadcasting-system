import { body } from "express-validator";

export const uploadContentValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be 3-200 characters"),

  body("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Description too long"),

  body("subject")
    .notEmpty()
    .withMessage("Subject is required")
    .isIn(["maths", "science", "english", "history", "computer", "other"])
    .withMessage("Invalid subject"),

  body("rotationDuration")
    .optional()
    .isInt({ min: 1, max: 60 })
    .withMessage("Rotation must be 1-60 minutes"),

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("Invalid start time format"),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage("Invalid end time format"),
];