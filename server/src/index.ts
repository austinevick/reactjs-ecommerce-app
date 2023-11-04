import express, { Request, Response } from 'express'
import { sampleProducts } from './data';
import cors from 'cors'
const app = express()
app.use(cors())

app.get('/api/products', (req: Request, res: Response) => {
    return res.json(sampleProducts)
})



app.listen(3000, () => {
    console.log(`server started at http://localhost:3000`);
});