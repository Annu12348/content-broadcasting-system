import { body } from "express-validator"

export const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z\s.']+$/)
        .withMessage("Name should only contain letters, spaces, apostrophes, or periods"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isLength({ max: 100 })
        .withMessage("Email must not exceed 100 characters")
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail({ gmail_remove_dots: false })
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .withMessage("Email does not match required format"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be 8 to 128 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one digit")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character"),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required")
        .isString()
        .withMessage("Role must be a string")
        .isIn(["teacher", "principal"])
        .withMessage("Role must be either 'teacher' or 'principal'")
]

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
];