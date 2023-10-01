import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import authRouter from "./routes/userRoute.js"
import questionRouter from "./routes/questionRoute.js"
import categoryRouter from "./routes/categoryRoute.js"
import cors from "cors"
const app = express()

const PORT = 5000

app.use(express.json())
app.use(cors())

const dbURL = `mongodb+srv://jayeshk118:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.qgq3dkm.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  app.use((req, res, next) => {
    res.status(500).send('Internal Server Error');
  })
})

db.once('open', () => {
    console.log('Connected to MongoDB');    
});

app.use('/user',authRouter)
app.use('/question', questionRouter)
app.use('/category', categoryRouter)

    
app.listen(PORT, () => {
    console.log('app running at port ', PORT)
})