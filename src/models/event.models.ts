import { timeStamp } from "console";
import mongoose from "mongoose";
import UserSchema from "../schemas/user.schemas";

export interface EventInput {
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string
    organizer: string;
}

export interface EventDocument extends mongoose.Document, EventInput {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true , index: true },
    description: { type: String, required: true},
    date: { type: Date, required: true },
    time: {type: String, required: true},
    location: {type: String, required: true},
    organizer: { type: String, required: true },
}, {timestamps : true, collection: "events"});

// creamos el modelo de Event usando el documento y el schema
const event = mongoose.model<EventDocument>("Event", EventSchema);

export default event;