import express from "express";
import multer from "multer";
import restauranteController from "../controllers/restauranteController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateRestauranteResponse} from "../middleware/validation";
import RestauranteController from "../controllers/restauranteController";
import {param} from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1040 * 1024,
    }
});

router.get('/', jwtCheck, jwtParse, RestauranteController.getRestaurant);

router.put('/',
    jwtCheck,
    jwtParse,
    upload.single("imageFile"),
    validateRestauranteResponse,
    RestauranteController.updateRestaurante);

router.post('/',
    jwtCheck,
    jwtParse,
    upload.single("imageFile"),
    validateRestauranteResponse,
    restauranteController.createRestaurant)

router.get("/search/:city",
    param("city").isString()
        .trim()
        .notEmpty()
        .withMessage("El parametro ciudad debe ser un string válido"),
    restauranteController.searchRestaurante

);

export default router;