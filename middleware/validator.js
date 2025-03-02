import { body } from "express-validator";
import { validateErrors, validateErrorsWithoutFile } from "./validate.errors.js";
import { existAddress, existEmail, existName, existPhone } from "../utils/db.validator.js";


export const registerValidator=[
    body('name','Name cannot be empty').notEmpty().toLowerCase().custom(existName),
    body('description','description cannot be empty').notEmpty(),
    body('phone','Phone cannot be empty').notEmpty().toLowerCase().custom(existPhone),
    body('email','Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('address','Address cannot be empty').notEmpty().toLowerCase(),
    body('category','Category cannot be empty').notEmpty().toLowerCase(),
    body('trajectory','Trajectory cannot be empty').notEmpty().toLowerCase(),
    body('impact','Impact cannot be empty').notEmpty().toLowerCase(),
    validateErrors
]

    export const updateValidator=[
        body('name').optional().notEmpty().toLowerCase().custom((name,{req})=>existName(name,{ _id: req.params.id })),
        body('email').optional().notEmpty().toLowerCase().custom((email,{req})=>existEmail(email,{ _id: req.params.id })),
        body('address').optional().notEmpty().toLowerCase().custom((address,{req})=>existAddress(address,{ _id: req.params.id })),
        body('phone').optional().notEmpty().toLowerCase().custom((phone,{req})=>existPhone(phone,{ _id: req.params.id })),
        body('category').optional().notEmpty().toLowerCase(),
        body('trajectory').optional().notEmpty().toLowerCase(),
        body('impact').optional().notEmpty().toLowerCase(),
        validateErrorsWithoutFile
    ]