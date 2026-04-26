import express from "express";
const app = express();
import userRoutes from "../src/routes/user.routes.js"
import cookieParser from "cookie-parser"

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRoutes)

export default app;