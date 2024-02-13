import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import connectDB from './config/db.js'
import authRoutes from './routes/authRouter.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors('http://localhost:5000'))

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})