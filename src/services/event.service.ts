import event from '../models/event.models';
import EventModel, { EventInput, EventDocument } from '../models/event.models';

class EventService {
    // bucamos los eventos de un organizador por su id
    public async getEventsByOrganizer(organizer: string): Promise<EventDocument[]> {
        try {
            const events = await EventModel.find({organizer: organizer})
            return events
        } catch (err) {
            throw err
        }
    }

    // .../events/ -> POST
    // crear evento
    public async createEvent(event: EventInput): Promise<EventDocument> {
        try{
            const newEvent = await EventModel.create(event);
            return newEvent;
        } catch(err) {
          throw err;
        }
    }

    // .../events/date -> GET
    // filtrar eventos por fecha
    public async getEventsByDate(date: Date): Promise<EventDocument[] | null> {
        try{
            const events = await EventModel.find({ date: { $gte: date } });
            return events;
        } catch(err) {
          throw err;
        }
    }

    // .../events/location -> GET
    // filtrar eventos por ubicacion
    public async getEventsByLocation(location: string): Promise<EventDocument[] | null> {
        try{
            const events = await EventModel.find({location: location});
            return events;
        } catch(err) {
          throw err;
        }
    }

    // .../events/{event} -> DELETE
    public async deleteEvent(title: string): Promise<EventDocument | null> {
        try {
            const deletedUser = await EventModel.findOneAndDelete({title: title});
            return deletedUser;
        } catch (err) {
            throw err;
        }
    }

    // .../events/{event} -> UPDATE
    public async updateEvent(title: string, eventInput: EventInput): Promise<EventDocument | null> {
        try {
            const event: EventDocument | null = await EventModel.findOneAndUpdate({title: title}, eventInput, {
                new: true
            });

            return event;
        } catch (err) {
            throw(err)
        }
    }

    public async getEvent(title: string): Promise<EventDocument | null > {
        try {
            const event = await EventModel.findOne({title: title})
            return event;
        } catch(err) {
            throw err;
        } 
    }

    public async getEvents(title: string): Promise<EventDocument[] | null > {
        try {
            const events = await EventModel.find()
            return events;
        } catch(err) {
            throw err;
        } 
    }
}

export default new EventService()