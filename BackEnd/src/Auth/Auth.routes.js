import { Router } from "express"
import { registerUser, loginUser } from "./Auth.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import {addUserValidator} from "../../helpers/validators.js"
const api = Router()

api.post('/users',[validateJwt, addUserValidator] ,registerUser)
api.post('/login', loginUser);

export default api;