import {Request, Response, NextFunction} from "express"

import { AnyZodObject } from "zod"

// validamos la estructura de datos que llega por el body
// con un esquema en especifico para validar datos
const validateSchema = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction)=>{
        try{
            await schema.parseAsync(req.body)
            next()
        }catch(error){
            console.error(error)
            res.status(400).json(error)
        }
    }
}

export default validateSchema
