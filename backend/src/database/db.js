import { config } from "../config/config.js";
import mongoose from "mongoose";

function databaseConnection() {
    mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });
}

export default databaseConnection;