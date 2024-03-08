import { timeStamp } from "console";
import mongoose from "mongoose";

export interface UserInput{
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserDocument extends mongoose.Document, UserInput{
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true , index: true},
    password: { type: String, required: true },
    role: { type: String, required: true },
}, {timestamps : true, collection: "users"});

const user = mongoose.model<UserDocument>("User", UserSchema);

export default user;