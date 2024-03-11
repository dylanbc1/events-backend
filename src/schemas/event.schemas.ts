import {date, object, string, TypeOf, z} from "zod";

const EventSchema = object({
    title: string({required_error: "Title is required"}),
    description: string({required_error: "Description is required"}),
    date: date({required_error: "Date is required"}),
    time: string({required_error: "Time is required"}),
    location: string({required_error: "Location is required"}),
    organizer: string({required_error: "Email is required"}).email({message: "Invalid email"}),
});

export default EventSchema;