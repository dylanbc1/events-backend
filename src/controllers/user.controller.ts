import { Response, Request } from 'express';
import userService from '../services/user.service';
import {UserDocument, UserInput} from '../models/user.models';
import bcrypt from 'bcrypt';


class UserController {

  public async createUser(req: Request, res: Response) {
    try{
      //const UserExist: UserDocument = await userService.findUserByEmail(req.body.email);
      const user: UserInput = req.body;
      user.password = await bcrypt.hash(user.password, 10);
      const newUser: UserDocument = await userService.createUser(user);
      return res.status(201).json(newUser);
    }catch(err){
      return res.status(500).json(err);
    }
  }

  public async getUsers(req: Request, res: Response){

    try{

      const users = await userService.findAll();

      return res.json(users)
    }catch(err){
      return res.status(500).json(err)
    }
  }

  public async login (req: Request, res: Response){
    try{
      const userExist: UserDocument | null = await userService.
      findByEmail(req.body.email)

      if(!userExist){
        return res.status(401).json({message: "User not authorized"})
      }

      const isMatch = await bcrypt.compare(req.body.password, userExist.password)

      if(isMatch){
        return res.status(200).json(userService.generateToken(userExist))
      } else {
        return res.status(400).json({message: "Incorrect password"})
      }
    }catch(error){
      return res.status(500).json(error)
    }
  }


  public async getLandingPage(req: Request, res: Response) {
    return res.json({message: 'Please LogIn'})
  }
}

export default new UserController();