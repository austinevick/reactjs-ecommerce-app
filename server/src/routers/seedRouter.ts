import express from 'express'
import { ProductModel } from '../models/ProductModel'
import { sampleProducts } from '../data'


export const seedRouter = express.Router()

seedRouter.get('/', async (req, res) => {
    try {
        await ProductModel.deleteMany({})
        const products = await ProductModel.insertMany(sampleProducts)
        return res.status(200).json(products)
    } catch (error) {
        return res.status(400).json(error)
    }
})