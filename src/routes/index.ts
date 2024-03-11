import { Express} from 'express';

import userController from "../controllers/user.controller"
import eventController from "../controllers/event.controller"
import ticketController from "../controllers/ticket.controller"

import auth from "../middlewares/auth"
import userSchema from "../schemas/user.schemas"
import eventSchema from "../schemas/event.schemas" 
import ticketSchema from "../schemas/ticket.schemas" 

import validateSchema from "../middlewares/validateSchema"
import { authorize } from '../middlewares/auth';


const routes = ( app: Express ) => {
    // user
    app.get("/", userController.getLandingPage)
    app.get("/users", auth, authorize(["admin"]), userController.getUsers)
    app.post('/login', userController.login)
    app.post("/users", validateSchema(userSchema), userController.createUser)

    // event
    app.get("/events/:user", auth, authorize(["organizador"]), eventController.getEventsByOrganizer)
    app.post("/events", auth, authorize(["organizador"]), validateSchema(eventSchema), eventController.createEvent)
    app.get("/events/date/:date", auth, eventController.getEventByDate)
    app.get("/events/location/:location", auth, eventController.getEventByLocation)
    app.delete("/events/:title", auth, authorize(["organizador"]), eventController.deleteEvent)
    app.put("/events/:title", auth, authorize(["organizador"]), eventController.update)

    // ticket
    app.post("/tickets", auth, validateSchema(ticketSchema),ticketController.createTicket)
    app.get("/tickets/:user", auth, ticketController.findTicketsByUser)
    // :user es el email del organizer
    app.get("/tickets/assistants/:user", auth, authorize(["organizador"]), ticketController.findAssistants)
};

export default routes;