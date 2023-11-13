import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import { productRouter } from './routers/ProductRouter';
import { seedRouter } from './routers/seedRouter';

dotenv.config()

const app = express()
app.use(cors())

app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)



app.listen(3000, async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log('connected to db')
    } catch (error) {
        console.log(error);
    }
    console.log(`server started at http://localhost:3000`);
});