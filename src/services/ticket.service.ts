import TicketModel, { TicketInput, TicketDocument } from '../models/ticket.models';

class TicketService {
    // creamos el ticket recibiendo TicketInput
  public async createTicket(ticket: TicketInput): Promise<TicketDocument> {
    try{
        const newTicket = await TicketModel.create(ticket);
        return newTicket;
    }catch(err){
      throw err;
    }
  }

  // hallar todos los ticketes de un evento especifico
  public async findTicketsByEvent(eventTitle: string): Promise<TicketDocument[] | null> {
    try {
      const tickets = await TicketModel.find({event: eventTitle})
      return tickets;
    } catch(err) {
      throw err;
    }
  }

  // encontramos todos los tickets
  public async findAll(): Promise<TicketDocument[]>{
    try{
      const tickets = await TicketModel.find();
      return tickets;
    }catch(err){
        throw  err;
    }
  }

  // encontrar tickets por email de usuario
  public async findByUserEmail(userEmail: string): Promise<TicketDocument[] | null>{
    try{
      const ticket = await TicketModel.find({user: userEmail})
      return ticket
    }catch(error){
      throw error
    }
  }
}

export default new TicketService();
