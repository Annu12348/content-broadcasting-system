import rateLimit from "express-rate-limit";

export const liveApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 20, 
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});