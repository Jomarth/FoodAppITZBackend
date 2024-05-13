import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400)
            .json({ errors: errors.array() });
    }
    next();
} //Fin de handleValidationErrors

export const validateUserRequest = [
    body("name").isString()
        .notEmpty()
        .withMessage("El nombre debe ser solo texto"),
    body("addressLine1").isString()
        .notEmpty()
        .withMessage("La dirección debe ser string"),
    body("city").isString()
        .notEmpty()
        .withMessage("La ciudad debe ser string"),
    body("country").isString()
        .notEmpty()
        .withMessage("El pais debe ser string"),
    handleValidationErrors
];
