import express from "express";
const app = express();

app.get("/d", (req, res) => {
    res.status(200).json({
        message: "gmrjij"
    })
})

export default app;