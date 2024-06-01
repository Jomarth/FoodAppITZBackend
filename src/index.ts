import express, { Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import userRoute from "./routes/userRoute";
import {jwtCheck} from "./middleware/auth";
import morgan from "morgan";
import { v2 as cloudinary } from 'cloudinary';
import restauranteRoute from "./routes/restauranteRoute";
import jwt from "jsonwebtoken";

mongoose.connect(process.env.DB_CONNECTION_STRING as string)
.then(() => {
    console.log("Base de datos conectada")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET  
})

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.get('/health', async (req: Request, res: Response) => {
    res.send({ message: 'servidor OK' })
})

app.use('/api/users', jwtCheck, userRoute);
app.use('/api/restaurante', restauranteRoute);

app.listen(port, () =>{
    console.log("App corriendo en el puerto " + port);
})