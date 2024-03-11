import { timeStamp } from "console";
import mongoose from "mongoose";
import UserSchema from "../schemas/user.schemas";
import EventSchema from "../schemas/event.schemas";

export interface TicketInput{
    user: string; // ingresa el email
    event: string;
    quantity: number;
}

export interface TicketDocument extends TicketInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const TicketSchema = new mongoose.Schema({
    user: { type: String, required: true },
    event: { type: String, required: true },
    quantity: {type: Number, required: true },
}, {timestamps : true, collection: "tickets"});

// creamos el modelo de Ticket usando el documento y el schema
const ticket = mongoose.model<TicketDocument>("Ticket", TicketSchema);

export default ticket;