import express from "express";
import multer from "multer";
import restauranteController from "../controllers/restauranteController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateRestauranteResponse} from "../middleware/validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1040 * 1024,
    }
});

router.post('/',
    jwtCheck,
    jwtParse,
    upload.single("imageFile"),
    validateRestauranteResponse,
    restauranteController.createRestaurant)

export default router;