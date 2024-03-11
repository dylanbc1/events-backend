import {object, string, number, TypeOf, z} from "zod";
import UserSchema from "./user.schemas";
import EventSchema from "./event.schemas";

// ticket hace referencia a un User y Event asociados
const TicketSchema = object({
    user: string({required_error: "Email is required"}).email({message: "Invalid email"}),
    event: string({required_error: "Title is required"}),
    quantity: number({required_error: "Quantity is required"})
});

export default TicketSchema;