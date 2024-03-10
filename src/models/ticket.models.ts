import { timeStamp } from "console";
import mongoose from "mongoose";
import UserSchema from "../schemas/user.schemas";
import EventSchema from "../schemas/event.schemas";

export interface TicketInput{
    user: string; // ingresa el email
    event: string;
    quantity: number;
}

export interface TicketDocument extends mongoose.Document, TicketInput {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const TicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true},
    quantity: {type: Number, required: true },
}, {timestamps : true, collection: "tickets"});

// creamos el modelo de Ticket usando el documento y el schema
const ticket = mongoose.model<TicketDocument>("Ticket", TicketSchema);

export default ticket;