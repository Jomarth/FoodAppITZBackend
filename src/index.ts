import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import userRoute from "./routes/userRoute";
import {jwtCheck} from "./middleware/auth";
import morgan from "morgan";

mongoose.connect(process.env.DB_CONNECTION_STRING as string)
.then(() => {
    console.log("Base de datos conectada")
})

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.get('/health', async (req: Request, res: Response) => {
    res.send({ message: 'servidor OK' })
})

app.use('/api/users', jwtCheck, userRoute);

app.listen(port, () =>{
    console.log("App corriendo en el puerto 3000");
})