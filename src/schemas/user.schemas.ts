import {object, string, TypeOf, z} from "zod";

const UserSchema = object({
    name: string({required_error: "Name is required"}),
    email: string({required_error: "Email is required"}).email({message: "Invalid email"}),
    password: string({required_error: "Password is required"}).min(8, "Password must be at least 6 characters"),
    role: z.enum(["asistente", "organizador", "admin"],{required_error: "Role is required"})
});

export default UserSchema;