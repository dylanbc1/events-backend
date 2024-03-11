import { Response, Request } from 'express';
import eventService from '../services/event.service';
import ticketService from '../services/ticket.service';
import { TicketDocument, TicketInput } from '../models/ticket.models';
import { EventDocument } from '../models/event.models';


class TicketController {
    // .../tickets/ -> POST
  public async createTicket(req: Request, res: Response) {
    try {
        if (!(req.body.loggedUser.email == req.body.user)) {
            return res.status(400).json({message: "Inconsistency in users (logged and requested)"})
        }

        // verificamos si el usuario ya tiene un ticket 
        const ticketExists: TicketDocument[] | null = await ticketService.findByUserEmail(req.body.user);
        var ticketi: any

        // si ya existe y el evento es el mismo, devuelvo error
        if (ticketExists) {
            // teniendo todos los tickets del usuario verificamos si al menos uno es para el mismo event
            for (ticketi in ticketExists) {

                if (ticketi.event == req.body.event) {
                    return res.status(400).json( {message: "User already has a ticket for this event"} );
                }
                break;
            }
        }
        
        const eventExist: EventDocument | null = await eventService.getEvent(req.body.event);

        if (!eventExist) {
            return res.status(404).json({message: `This event doesn't exist ${req.body.event}`})
        }

        // creamos el ticket y req.body le hacemos 'casting' para que sea
        // un TicketInput que es un contrato de los objetos tipo Ticket
        const ticket: TicketDocument = await ticketService.createTicket(req.body as TicketInput);
        
        // retornamos 201 (creado) y el objeto
        return res.status(201).json(ticket);
    } catch (error) {
        return res.status(500).json(error);
    }
  }

  // .../tickets/{user} -> GET
  // hallo los tickets de un usuario especifico
  public async findTicketsByUser(req: Request, res: Response) {
    try{
        const tickets: TicketDocument[] | null = await ticketService.findByUserEmail(req.params.user);

        if (tickets) {
            return res.status(200).json(tickets);
        } else {
            return res.status(204)
        }
    } catch (error) {
        return res.status(500).json(error);
    }
  }

  // .../events/assistants/{user} -> GET
  // hallo los asistentes a los eventos de un organizador
  public async findAssistants(req: Request, res: Response) {
    const eventsOfOrganizer: EventDocument[] | null = await eventService.getEventsByOrganizer(req.params.user);
    console.log(eventsOfOrganizer)
    const ticketsFromEachEvent : TicketDocument[] = []

    try {
        if (eventsOfOrganizer) {
            // recorremos los eventos de un organizador, para asi buscar en los tiquetes todos
            // aquellos cuyo evento sea ese. Almacenamos cada ticket para saber la cantidad
            // de tickes y de quienes son
            for (let i = 0; i < eventsOfOrganizer.length; i++) {
                const tickets : TicketDocument[] | null= await ticketService.findTicketsByEvent(eventsOfOrganizer[i].title)
                console.log(tickets)

                if (tickets) {
                    ticketsFromEachEvent.push(...tickets);
                }
            }

            return res.status(200).json(ticketsFromEachEvent)
        } else {
            return res.status(204).json({message: `The organizer ${req.params.user} doesn't have any event`})
        }    
    } catch (error) {
        return res.status(500).json(error);
    }
  }
}

export default new TicketController();