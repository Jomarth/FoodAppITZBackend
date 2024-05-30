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
]; //Fin del validateUserRequest

export const validateRestauranteResponse = [
    body('restauranteName').notEmpty()
        .withMessage('El nombre del restaurante es requerido'),
    body('city').notEmpty()
        .withMessage('La ciudad es requerida'),
    body('country').notEmpty()
        .withMessage('el pais es requerido'),
    body('deliveryPrice').isFloat({min: 0})
        .withMessage('El precio de la entrega debe ser un número positivo'),
    body('estimatedDeliveryTime').isFloat({min: 0})
        .withMessage('El tiempo estimado de la entrega debe ser un número positivo'),
    body('cuisines').isArray()
        .withMessage('Los platillos deben ser un arreglo')
        .not()
        .notEmpty()
        .withMessage('Los platillos no pueden estar vacios'),
    body('menuItems').isArray()
        .withMessage('Los platillos deben ser un arreglo'),
    body('menuItems.*.name').notEmpty()
        .withMessage('El nombre del item del menú es requerio'),
    body('menuItems.*.price').isFloat({min: 0})
        .withMessage('El precio del item del menú es requerio o debe ser positivo'),
    handleValidationErrors

];
