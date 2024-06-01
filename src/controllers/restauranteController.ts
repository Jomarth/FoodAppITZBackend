import {Request, Response} from "express";
import Restaurante from "../models/restauranteMode";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";

//funcion para actualizar un restaurante
const updateRestaurante = async (req: Request, res: Response) => {
    try{

        const restaurante = await Restaurante.findOne({ user: req.userId});

        if (!restaurante){
            return res.status(404)
                .json({message:"Restaurante no encontrado"});
        }

        restaurante.restauranteName = req.body.restauranteName;
        restaurante.city = req.body.city;
        restaurante.country = req.body.country;
        restaurante.deliveryPrice = req.body.deliveryPrice;
        restaurante.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurante.cuisines = req.body.cuisines;
        restaurante.menuItems = req.body.menuItems;
        restaurante.lastUpdate = new Date();

        if (req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurante.imageUrl = imageUrl;
        }
        console.log('restaurante' + restaurante)
        await restaurante.save();
        res.status(200).send(restaurante);


    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error al actualizar el restaurante'})
    }
}// fin updateRestaurante

//funcion para obtener los datos de restaurante
const getRestaurant = async (req: Request, res: Response) => {

    try {
        const restaurante = await Restaurante.findOne({ user: req.userId});
        if (!restaurante){
            return res.status(404)
                .json({message:"Restaurante no encontrado"});
        }
        res.json(restaurante)
    } catch (error){
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los datos del restaurante' })
    }
}// fin del getRestaurante

const createRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurante.findOne({user: req.userId})

        if (existingRestaurant) {
            return res.status(409).json({
                message: 'El restaurante para este usuario ya existe'
            })
        }
        const imageUrl = await uploadImage(req.file as Express.Multer.File);
        const restaurante = new Restaurante(req.body);

        restaurante.imageUrl = imageUrl;
        restaurante.user = new mongoose.Types.ObjectId(req.userId);
        restaurante.lastUpdate = new Date();

        console.log(restaurante)
        await restaurante.save();
        res.status(201).send(restaurante)

    } catch (error) {
        res.status(500).json({
            message: "Error al crear el restaurante"
        })
    }
}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataUri = "data:" + image.mimetype + ";base64," + base64Image;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataUri);

    return uploadResponse.url;
}

export default {
    getRestaurant,
    createRestaurant,
    updateRestaurante
}