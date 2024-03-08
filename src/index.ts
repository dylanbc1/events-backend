import express, {Express, Request, Response} from 'express'
import dotenv from "dotenv"

import { db } from "./config/db"

import routes from "./routes"

import userController from "./controllers/user.controller"


const app: Express = express()

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    console.log("hi")


}
)
routes(app);

db.then(() => {
app.listen(port, () => {
            console.log("server is running on port ")
            }
);
        }).catch((err) => console.error("Error connecting to MongoDB", err));