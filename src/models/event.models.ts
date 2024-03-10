import { timeStamp } from "console";
import mongoose from "mongoose";
import UserSchema from "../schemas/user.schemas";

export interface EventInput {
    
}

export interface EventDocument extends mongoose.Document, EventInput {
    
}

const EventSchema = new mongoose.Schema({
    
}, {timestamps : true, collection: "events"});

// creamos el modelo de Event usando el documento y el schema
const event = mongoose.model<EventDocument>("Event", EventSchema);

export default event;