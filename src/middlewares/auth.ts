import {Request, Response, NextFunction} from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken"

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token = req.headers.authorization;
        if(!token){
            res.status(401).json({message: "Not authorized"})

        }
        token = token!.replace("Bearer ", "")

        const decode = jwt.verify(token, process.env.JWT_SECRET || "secret");

        req.body.loggedUser = decode;
        req.params.id = (decode as any).user_id

        next()
    }catch(error){
        if (error instanceof TokenExpiredError)
            return res.status(401).json({message: "Not authorized", error})
        else 
            return res.status(401).json({message: "Token invalid", error})
    }
}


export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.body.loggedUser.role)) {
        console.log("your mom")
        return res.status(403).json({ message: "Forbidden" });
      }
      console.log("Authorizaado por ser admin")
      next();
    };
  };


export default auth