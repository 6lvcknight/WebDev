import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/db.js'


import authRoutes from './routes/auth.js'  // <-- This is fine here

dotenv.config()

const app = express()                      // <-- Make sure this comes first
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)          // <-- Now it's safe to use

app.get('/', (req, res) => {
  res.send('BookNest API is running!')
})

console.log("Connecting to:", process.env.MONGO_URI)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
