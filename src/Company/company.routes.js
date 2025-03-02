import { Router } from "express";
import { add, listByCategory, listByYear, listFromAZ, listFromZA, update } from "./company.controller.js";
import { validateJwt } from "../../middleware/validate.jwt.js";
import { registerValidator, updateValidator } from "../../middleware/validator.js";

const api=Router()

api.post('/add',[validateJwt,registerValidator],add)
api.put('/update/:id',[validateJwt,updateValidator],update)
api.get('/byCategory/:categoryName',validateJwt,listByCategory)
api.get('/byTrajectory/:experience',validateJwt,listByYear)
api.get('/FromAToZ',validateJwt,listFromAZ)
api.get('/FromZToA',validateJwt,listFromZA)
export default api