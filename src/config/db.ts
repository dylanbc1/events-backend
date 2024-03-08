import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/nodejs";

export const db = mongoose.connect(connectionString)
                                .then(()=> console.log("connected to mongodb"))
                                .catch((err) => console.error("Error connecting to mongoDB", err))
