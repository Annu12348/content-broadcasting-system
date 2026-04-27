import express from "express";
const app = express();
import userRoutes from "../src/routes/user.routes.js"
import contentRoutes from "../src/routes/content.routes.js"
import cookieParser from "cookie-parser"

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRoutes)
app.use("/api/teacher/content", contentRoutes)

export default app;