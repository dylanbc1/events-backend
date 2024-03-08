import { Express} from 'express';

import userController from "../controllers/user.controller"
import auth from "../middlewares/auth"
import userSchema from "../schemas/user.schemas" 

import validateSchema from "../middlewares/validateSchema"
import { authorize } from '../middlewares/auth';


const routes = ( app: Express ) => {
    app.get("/users", auth, authorize(["admin"]), userController.getUsers)
    app.post('/login', userController.login)
    app.post("/users", auth, validateSchema(userSchema), userController.createUser)
};

export default routes;