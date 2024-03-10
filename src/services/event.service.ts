import EventModel, { EventInput, EventDocument } from '../models/event.models';

class EventService {
    // bucamos los eventos de un organizador por su id
  public async getEventsByOrganizer(userId: string): Promise<EventDocument[] | null> {
    try{
        const events = await EventModel.find({user: userId})
        return events;
    }catch(err){
      throw err;
    }
  }
}