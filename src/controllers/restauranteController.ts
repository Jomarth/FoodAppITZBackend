import {Request, Response} from "express";
import Restaurante from "../models/restauranteMode";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";

const createRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurante.findOne({user: req.userId})

        if (existingRestaurant) {
            return res.status(409).json({
                message: 'El restaurante para este usuario ya existe'
            })
        }

        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataUri = "data:" + image.mimetype + ";base64," + base64Image;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataUri);

        const restaurante = new Restaurante(req.body);

        restaurante.imageUrl = uploadResponse.url;
        restaurante.user = new mongoose.Types.ObjectId(req.userId);
        restaurante.lastUpdate = new Date();


        await restaurante.save();
        res.status(201).send(restaurante)

    } catch (error) {
        res.status(500).json({
            message: "Error al crear el restaurante"
        })
    }
}

export default {
    createRestaurant
}