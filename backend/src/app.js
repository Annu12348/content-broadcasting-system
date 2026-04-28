import express from "express";
const app = express();

app.set('trust proxy', 1);

import userRoutes from "../src/routes/user.routes.js"
import teacherRoutes from "../src/routes/teacher.routes.js"
import principalRoutes from "../src/routes/principal.routes.js"
import contentsRoutes from "../src/routes/contents.routes.js"
import cookieParser from "cookie-parser"

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRoutes)
app.use("/api/teacher/content", teacherRoutes)
app.use("/api/principal/content", principalRoutes)
app.use("/api/content", contentsRoutes)

export default app;