import express from 'express';
import userController from "../controllers/userController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateUserRequest} from "../middleware/validation";

const route = express.Router();

route.get('/', jwtCheck, jwtParse, userController.getUser)
route.post('/', jwtCheck, jwtParse, userController.createUser);
route.put('/', jwtCheck, jwtParse, validateUserRequest, userController.updateUser);


export default route;

