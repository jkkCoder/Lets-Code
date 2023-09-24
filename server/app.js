import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
const app = express()

const PORT = 5000

app.use(express.json())
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

    app.get('/', (req, res) => {
        res.status(200).send('Hello, World!');
    });

        
    app.listen(PORT, () => {
        console.log('app running at port ', PORT)
    })
});