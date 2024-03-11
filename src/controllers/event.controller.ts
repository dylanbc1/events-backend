import { Response, Request } from 'express';
import userService from '../services/user.service';
import {EventDocument, EventInput} from '../models/event.models';
import eventService from '../services/event.service';

class EventController {
    // .../events/:user -> GET
    public async getEventsByOrganizer(req: Request, res: Response) {
        try {
            const events: EventDocument[] = await eventService.getEventsByOrganizer(req.params.user)
            
            return res.status(200).json(events)
        } catch (error) {
            throw error
        }
    }

    // .../events/ -> POST
    public async createEvent(req: Request, res: Response) {
        try {
            if (!(req.body.loggedUser.email == req.body.organizer)) {
                return res.status(400).json({message: "Inconsistency in emails"})
            }

            // verificamos si ya hay un event
            const eventExists: EventDocument | null = await eventService.getEvent(req.body.loggedUser.email);

            // si ya existe y el evento es el mismo, devuelvo error
            if (eventExists) {
                return res.status(400).json( {message: "Event already created"} );
            }
        
            // añadimos el organizador al body
            req.body.organizer = req.body.loggedUser.email;

            // creamos el event y req.body le hacemos 'casting' para que sea
            // un EventInput que es un contrato de los objetos tipo Ticket
            const event: EventDocument = await eventService.createEvent(req.body as EventInput);
        
            // retornamos 201 (creado) y el objeto
            return res.status(201).json(event);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // .../events/date/{date} -> GET
    // filtrar eventos por fecha (body)
    public async getEventByDate(req: Request, res: Response) {
        try {
            try {
                // Convertir el string de fecha en un objeto Date
                const castedDate = new Date(req.params.date);

                const events: EventDocument[] | null = await eventService.getEventsByDate(castedDate);
            
                if (events) {
                    return res.status(200).json(events)
                } else {
                    return res.status(204)
                }
            } catch (error) {
                return res.status(400).json({message: "Bad Date input"})
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // .../events/location/{location} -> GET
    // filtrar eventos por ubicacion
    public async getEventByLocation(req: Request, res: Response) {
        try {
            const events: EventDocument[] | null = await eventService.getEventsByLocation(req.params.location);
            
            if (events) {
                return res.status(200).json(events)
            } else {
                return res.status(204)
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // .../events/{event} -> DELETE
    public async deleteEvent(req: Request, res: Response) {
        try {
            // buscamos el evento, si le pertenece al organizador actual, se elimina, si no, no
            const event: EventDocument | null = await eventService.getEvent(req.params.title)

            if (event) {
                if (event.organizer == req.body.loggedUser.email) {
                    const deletedEvent: EventDocument | null = await eventService.deleteEvent(req.params.title)

                    if (deletedEvent) {
                        return res.status(200).json({message: "Event deleted", deletedEvent}, );
                    } else {
                        return res.status(404).json( {message: "Event doesn't exist"} );
                    }
                } else {
                    return res.status(400).json({message: "You aren't the organizer of this event"})
                }
            } else {
                return res.status(404).json( {message: "Event doesn't exist"} );
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // .../events/{event} -> PUT
    public async update(req: Request, res: Response) {
        try {
            if (!(req.body.loggedUser.email == req.body.organizer)) {
                return res.status(400).json({message: "Inconsistency in emails"})
            }

            // buscamos el evento, si le pertenece al organizador actual, se elimina, si no, no
            const event: EventDocument | null = await eventService.getEvent(req.params.title)

            if (event) {
                console.log(event.organizer)
                console.log(req.body.loggedUser.email)
                if (event.organizer == req.body.loggedUser.email) {
                    // llama al update de service, puede devolver un document o null (ya que hace una consulta)
                    // le pasamos el ID y el UserInput -> el objeto ya editado por JSON
                    // OBTENEMOS EL ID DEL PARAMETRO DE LA URL !!!
                    const eventUpdated: EventDocument | null = await eventService.updateEvent(req.params.title, req.body as EventInput);

                    // verificamos si el usuario existe -> o es de tipo document
                    // o de tipo null. Lo buscamos, si está es de document, si no
                    // es nulo y podemos seguir con la creación
                    if (eventUpdated) {
                        return res.status(200).json(eventUpdated);
                    } else {
                        return res.status(404).json( {message: "Event doesn't exist"} );
                    }
                } else {
                    return res.status(400).json({message: "You aren't the organizer of this event"})
                }
            } else {
                return res.status(404).json( {message: "Event doesn't exist"} );
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new EventController();