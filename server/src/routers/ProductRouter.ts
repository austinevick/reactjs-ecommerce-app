import express from 'express'
import { ProductModel } from '../models/ProductModel'

export const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(400).json(error)
    }
})

productRouter.get('/slug/:slug', async (req, res) => {
    try {
        const product = await ProductModel.findOne({ slug: req.params.slug })
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json(error)
    }
})