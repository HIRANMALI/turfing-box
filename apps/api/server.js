import './src/config/env.js'
import express from 'express'
import { connectDB } from './db/config/db.js'
import cors from 'cors'

import authRouter from './src/routes/auth.js'
import sportRouter from './src/routes/sports.js'
import turfRouter from './src/routes/turf.js'
import userRouter from './src/routes/user.js'
import clubRouter from './src/routes/club.js'
import mediaRouter from './src/routes/media.js'
import adminRouter from './src/routes/admin.js'


const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/sports', sportRouter)
app.use('/api/v1/turf', turfRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/club', clubRouter)
app.use('/api/v1/media', mediaRouter)
app.use('/api/v1/admin', adminRouter)




app.get("/", (req, res) => {
    res.json({ message: "Welcome to Turfing Box API" })
})

const PORT = process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
})