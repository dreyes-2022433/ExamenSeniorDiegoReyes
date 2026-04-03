import { Router } from "express";
import { allUsers,DeleteUser,updateUser } from "./user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator, deleteUserValidator } from "../../helpers/validators.js";
const api = Router()

api.get('/users', [validateJwt], allUsers)
api.delete('/users/:id', [validateJwt, deleteUserValidator], DeleteUser)
api.put('/users/:id', [validateJwt, updateUserValidator], updateUser)

export default api;